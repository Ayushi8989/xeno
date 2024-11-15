import mongoose from 'mongoose';
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
                const audience = JSON.parse(message); 

                for (const customer of audience) {
                    const personalizedMessage = `Hi ${customer.name}, here’s 10% off on your next order!`;

                    const logEntry = new CommunicationLog({
                        customerId: customer._id,
                        message: personalizedMessage
                    });

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
