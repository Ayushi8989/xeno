import { Request, Response } from 'express';
import { publisherClient } from '../../config/redisClient.ts';
import Customer from '../../models/customer.model.ts';

// To add new Orders
export const addOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderNumber, customerId, items, totalAmount } = req.body;

        if (!orderNumber || !customerId || !items || items.length === 0 || !totalAmount) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const customer = await Customer.findById(customerId);
        if (!customer) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }

        const orderData = {
            orderNumber,
            customerId,
            items,
            totalAmount,
            orderDate: new Date(),
            status: 'Pending',
        };

        try {
            await publisherClient.publish('order.added', JSON.stringify(orderData));
            console.log('Published order.added event');
            res.status(201).json({
                message: 'Order published successfully',
                order: orderData,
            });
        } catch (error) {
            console.error('Error publishing to Redis:', error);
            res.status(500).json({ message: 'Error publishing to Redis' });
        }
    } catch (error) {
        console.error('Error in addOrders controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
