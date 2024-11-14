import redisClient from '../../config/redisClient.ts';

const subscribeToOrderEvents = async () => {
    try {
        await redisClient.subscribe('order.added', async (message: string) => {
            const order = JSON.parse(message);  
            console.log('New order added:', order);  
    
            // TODO: add functionality
        });
    } catch (error) {
        console.error('Error subscribing to customer events:', error);  
    }
};

subscribeToOrderEvents();

export default subscribeToOrderEvents;
