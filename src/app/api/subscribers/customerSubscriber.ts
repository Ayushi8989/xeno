import redisClient from '../../config/redisClient.ts';

const subscribeToCustomerEvents = async () => {
    try {
        await redisClient.subscribe('customer.added', async (message: string) => {
            const customer = JSON.parse(message);  
            console.log('New customer added:', customer);  

        });
    } catch (error) {
        console.error('Error subscribing to customer events:', error);  
    }
};

subscribeToCustomerEvents();

export default subscribeToCustomerEvents;
