import redisClient from '../../config/redisClient.ts';
import Customer from '../../models/customer.model.ts';

import { Request, Response } from 'express';

// To add new Customer
export const addCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, address } = req.body; 

        const newCustomer = new Customer({ name, email, phone, address });
        // TODO: Handle this in consumer
        const savedCustomer = await newCustomer.save();

        redisClient.on('ready', async () => {
            try {
                await redisClient.publish('customer.added', JSON.stringify(savedCustomer));
                console.log('Published customer.added event');
            } catch (error) {
                console.error('Error publishing to Redis:', error);
            }
        });

        res.status(201).json(savedCustomer);
    } catch (error) {
        console.error('Error in addCustomers controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}