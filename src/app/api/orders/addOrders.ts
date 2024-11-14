import redisClient from '../../config/redisClient.ts';
import Customer from '../../models/customer.model.ts';
import Order from '../../models/order.model.ts';
import { Request, Response } from 'express';

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

        const newOrder = new Order({
            orderNumber,
            customerId,
            items,
            totalAmount,
            orderDate: new Date(),
            status: 'Pending', 
        });

        const savedOrder = await newOrder.save();

        redisClient.on('ready', async () => {
            try {
                await redisClient.publish('order.added', JSON.stringify(savedOrder));
                console.log('Published order.added event');
            } catch (error) {
                console.error('Error publishing to Redis:', error);
            }
        });

        res.status(201).json({
            message: 'Order created successfully',
            order: savedOrder,
        });

    } catch (error) {
        console.error('Error in addOrders controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
