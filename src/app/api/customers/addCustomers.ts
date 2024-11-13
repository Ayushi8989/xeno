import { Request, Response } from 'express';

// To add new Customer
export const addCustomers = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.error('Error in addCustomers controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}