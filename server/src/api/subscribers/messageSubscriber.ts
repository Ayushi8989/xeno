import mongoose from 'mongoose';
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
                const { communicationlogId, customerIds, message: templateMessage } = JSON.parse(message);

                if (!communicationlogId || !customerIds || !Array.isArray(customerIds) || !templateMessage) {
                    throw new Error('Invalid message data. Ensure communicationId, customerIds and templateMessage are provided.');
                }

                console.log(21, communicationlogId, customerIds, message)

                const customers = await Customer.find({ _id: { $in: customerIds } });

                for (const customer of customers) {
                    const personalizedMessage = templateMessage.replace('[name]', customer.name);
                    
                    const logEntry = await CommunicationLog.findOneAndUpdate(
                        { _id: communicationlogId},
                        { $set: { message: personalizedMessage, status: 'PENDING' } },
                        { new: true, upsert: false } 
                    );

                    if (!logEntry) {
                        console.warn(`CommunicationLog entry not found for customerId: ${customer._id}`);
                        continue;
                    } 

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
