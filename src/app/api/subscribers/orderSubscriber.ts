import { subscriberClient } from '../../config/redisClient.ts';
import Order from '../../models/order.model.ts';

const subscribeToOrderEvents = async () => {
    try {
        await subscriberClient.subscribe('order.added', async (message: string) => {
            const orderData = JSON.parse(message);
            console.log('Received new order event:', orderData);

            try {
                // Save order data to database
                const newOrder = new Order(orderData);
                await newOrder.save();
                console.log('Order saved to database');
            } catch (error) {
                console.error('Error saving order to database:', error);
            }
        });
    } catch (error) {
        console.error('Error subscribing to order events:', error);
    }
};

subscribeToOrderEvents();

export default subscribeToOrderEvents;
