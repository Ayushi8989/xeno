import Customer from '../../config/mongoSchemas/customer.model.ts';

import { Request, Response } from 'express';

// To add new Customer
export const addCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, address } = req.body; 

        if (!name || !email || !phone) {
            res.status(400).json({ message: 'Name, email, and phone are required' });
            return;
        }

        const newCustomer = new Customer({
            name,
            email,
            phone,
            address, 
        });

        const savedCustomer = await newCustomer.save();

        res.status(201).json({
            message: 'Customer added successfully',
            customer: savedCustomer,
        });
    } catch (error) {
        console.error('Error in addCustomers controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}; 