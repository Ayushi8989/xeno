import CommunicationLog from '../../models/communicationlog.model.ts'; 

import { Request, Response } from 'express';

// To get details of communctionLog by id
export const getCommunicationLogbyId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;  
        
        const log = await CommunicationLog.findById(id);
        
        if (!log) {
            res.status(404).json({ message: 'Log not found' });
            return;
        }

        res.status(200).json(log);
    } catch (error) {
        console.error('Error in getCommunicationLogbyId controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getCommunicationLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const log = await CommunicationLog.find();
        
        if (!log) {
            res.status(404).json({ message: 'Log not found' });
            return;
        }

        res.status(200).json(log);
    } catch (error) {
        console.error('Error in getCommunicationLogs controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
