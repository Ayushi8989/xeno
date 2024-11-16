import mongoose from 'mongoose';

import Segment from '../../models/segment.model.ts';
import Customer from '../../models/customer.model.ts';
import CommunicationLog from '../../models/communicationlog.model.ts';

import { subscriberClient } from '../../config/redisClient.ts';
import { handleDeliveryReceipt } from '../campaign/deliveryReceipt.ts';

const triggerDeliveryReceipt = async (logId: mongoose.Types.ObjectId) => {
    const isSent = Math.random() < 0.9; // 90% SENT, 10% FAILED
    const status = isSent ? 'SENT' : 'FAILED';

    await handleDeliveryReceipt(logId, status);
};

export const subscribeToMessageEvents = async () => {
    try {
        await subscriberClient.subscribe('message.added', async (message: string) => {
            console.log('Received message.added event');

            try {
                const { segmentId, message: templateMessage } = JSON.parse(message);

                if (!segmentId || !templateMessage) {
                    throw new Error('Invalid message data. Ensure communicationId, customerIds and templateMessage are provided.');
                }

                const segment = await Segment.findById(segmentId);

                const customerIds = segment?.customerIds;

                if (!Array.isArray(customerIds)) {
                    console.error('Invalid customerIds format. Expected an array of strings:', { customerIds });
                    return;
                }

                for (const id of customerIds) {

                    const customer = await Customer.findById(id);
                    const personalizedMessage = templateMessage.replace('[name]', customer!.name);

                    const logEntry = new CommunicationLog(
                        {
                            customerId: id,
                            message: personalizedMessage,
                            segmentId,
                            status: 'PENDING'
                        }
                    );

                    await logEntry.save();

                    await triggerDeliveryReceipt(logEntry._id);
                }

                console.log('Messages processed for audience.');
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });
    } catch (error) {
        console.error('Error subscribing to message events:', error);
    }
};
