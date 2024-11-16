import { Request, Response } from 'express';

import Segment from '../../models/segment.model.ts';

// get segment audience
export const getSegment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;  

    const segment = await Segment.findById(id);
        
        if (!segment) {
            res.status(404).json({ message: 'segment not found' });
            return;
        }

        res.status(200).json(segment);
    } catch (error) {
        console.error('Error in getSegment controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

