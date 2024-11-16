import { Request, Response } from 'express';
import { publisherClient } from '../../config/redisClient.ts';
import Segment from '../../models/segment.model.ts';

// Create segment
export const createSegment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, totalSpending, totalSpendingOperator, visits, visitOperator, logic} = req.body;

        if (!name || !totalSpending || !totalSpendingOperator || !visits || !visitOperator || !logic) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const newSegment = new Segment({
            name,
            totalSpending,
            totalSpendingOperator,
            visits,
            visitOperator,
            logic
        });

        const savedSegment = await newSegment.save();

        try {
            await publisherClient.publish('segment.added', JSON.stringify({
                ...req.body,
                segmentId: savedSegment._id,  
            }));
            console.log('Published segment.added event');
            
            res.status(201).json({
                message: 'Segment created and published successfully',
                segmentId: savedSegment._id,  
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
