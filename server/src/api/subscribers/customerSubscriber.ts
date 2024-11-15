import { subscriberClient } from '../../config/redisClient.ts';
import Customer from '../../models/customer.model.ts';

const subscribeToCustomerEvents = async () => {
    try {
        await subscriberClient.subscribe('customer.added', async (message: string) => {
            try {
                const customerData = JSON.parse(message);
                console.log('New customer data received:', customerData);

                const newCustomer = new Customer(customerData);
                await newCustomer.save();
                console.log('Customer saved successfully');
                
            } catch (error) {
                console.error('Error saving customer data:', error);
            }
        });
    } catch (error) {
        console.error('Error subscribing to customer events:', error);
    }
};

subscribeToCustomerEvents();

export default subscribeToCustomerEvents;
