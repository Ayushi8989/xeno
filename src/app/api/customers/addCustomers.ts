import { publisherClient } from '../../config/redisClient.ts';
import { Request, Response } from 'express';

// To add new Customer
export const addCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, address } = req.body;

        if (!name || !email || !phone || !address) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const customerData = { name, email, phone, address };

        await publisherClient.publish('customer.added', JSON.stringify(customerData));
        console.log('Published customer.added event');

        res.status(202).json({ message: 'Customer data published successfully' });
    } catch (error) {
        console.error('Error in addCustomers controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
