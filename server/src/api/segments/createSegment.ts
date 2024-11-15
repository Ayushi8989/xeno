import { Request, Response } from 'express';
import { publisherClient } from '../../config/redisClient.ts';

// Create segment
export const createSegment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, totalSpending, totalSpendingOperator, visits, visitOperator, logic} = req.body;

        if (!name || !totalSpending || !totalSpendingOperator || !visits || !visitOperator || !logic) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        try {
            await publisherClient.publish('segment.added', JSON.stringify({ name, totalSpending, totalSpendingOperator, visits, visitOperator, logic}));
            console.log('Published segment.added event');
            res.status(201).json({
                message: 'Segment published successfully',
            });
        } catch (error) {
            console.error('Error publishing to Redis:', error);
            res.status(500).json({ message: 'Error publishing to Redis' });
        }
    } catch (error) {
        console.error('Error creating segment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
