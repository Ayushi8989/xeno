import Customer from '../../models/customer.model.ts'; 

import { Request, Response } from 'express';

// To get details of a particular customer
export const customerDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;  
        
        const customer = await Customer.findById(id);
        
        if (!customer) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error('Error in customerDetails controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
