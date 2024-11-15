import { Request, Response } from 'express';
import Segment from '../../models/segment.model.ts';
import Campaign from '../../models/campaign.model.ts';

// get all the past campaigns by segment id
export const pastCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const findSegment = await Segment.findById(id);
        if (!findSegment) {
            res.status(404).json({ message: 'Segment not found' });
            return;
        }

        const campaigns = await Campaign.find({ segmentId: id })
            .sort({ createdAt: -1 })  // Order by the most recent
            .exec();

        res.status(200).json({ campaigns });
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};