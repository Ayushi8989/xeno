import Order from '../../models/order.model.ts';

import { Request, Response } from 'express';

// To get details of a particular customer
export const orderDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;  
        
        const order = await Order.findById(id);
        
        if (!order) {
            res.status(404).json({ message: 'order not found' });
            return;
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error in orderDetails controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
