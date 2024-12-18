import { Request, Response } from 'express';
import { publisherClient } from '../../config/redisClient.ts';

export const sendMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { segmentId, message } = req.body;

        if (!segmentId || !message) {
            res.status(400).json({ message: 'Invalid input data. Provide segmentId and a message template.' });
            return;
        }

        await publisherClient.publish(
            'message.added',
            JSON.stringify({ segmentId, message })
        );

        console.log('Published message.added event to Redis.');

        res.status(201).json({ message: 'Messages are being processed.' });
    } catch (error) {
        console.error('Error in sendMessages API:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
