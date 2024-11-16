import Customer from '../../models/customer.model.ts';
import Segment from '../../models/segment.model.ts';
import CommunicationLog from '../../models/communicationlog.model.ts';

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

                console.log(20, customerIds, audienceSize);

                const newSegment = new Segment({
                    name,
                    totalSpending,
                    totalSpendingOperator,
                    visits,
                    visitOperator,
                    customerIds,
                    audienceSize,
                });

                const savedSegment = await newSegment.save();

                await Promise.all(
                    customers.map(async (customer) => {
                        const log = new CommunicationLog({
                            customerId: customer._id,
                            segmentId: savedSegment._id,
                            audienceSize: audienceSize,
                            status: 'SENT',
                            message: 'You have been added!'
                        });

                        await log.save();
                    })
                );

                console.log('Segment and associated communication log saved to database');
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
