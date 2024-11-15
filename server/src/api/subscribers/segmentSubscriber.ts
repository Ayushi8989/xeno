import Customer from '../../models/customer.model.ts';
import Segment from '../../models/segment.model.ts';

import { buildQuery } from '../../helper/query.ts';
import { subscriberClient } from '../../config/redisClient.ts';

let isSubscribed = false;

const subscribeToSegmentEvents = async () => {
    if (isSubscribed) {
        console.log("Already subscribed to segment events.");
        return;
    }
    isSubscribed = true;
    try {
        await subscriberClient.subscribe('segment.added', async (message: string) => {
            const segmentData = JSON.parse(message);

            try {
                const { name, totalSpending, totalSpendingOperator, visits, visitOperator, logic } = segmentData;

                const query = await buildQuery(totalSpending, totalSpendingOperator, visits, visitOperator, logic);

                const audienceSize = await Customer.countDocuments(query);

                const customers = await Customer.find(query);
                const customerIds = customers.map(customer => customer._id);

                const newSegment = new Segment({
                    name,
                    totalSpending,
                    totalSpendingOperator,
                    visits,
                    visitOperator,
                    customerIds,
                    audienceSize,
                });

                await newSegment.save();

                console.log('segment saved to database');
            } catch (error) {
                console.error('Error saving segment to database:', error);
            }
        });
    } catch (error) {
        console.error('Error subscribing to segment events:', error);
    }
};

subscribeToSegmentEvents();

export default subscribeToSegmentEvents;
