import { Request, Response } from 'express';
import Campaign from '../../models/campaign.model.ts';

// get all the past campaigns
export const pastCampaign = async (req: Request, res: Response): Promise<void> => {
    try {
        // const currentDate = new Date();

        const campaigns = await Campaign.find({})
            .sort({ createdAt: -1 })  // Order by the most recent creation date
            .exec();

        res.status(200).json({ campaigns });
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};