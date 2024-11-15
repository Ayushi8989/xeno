import Customer from '../../models/customer.model.ts';
import Segment from '../../models/segment.model.ts';

import { buildQuery } from '../../helper/query.ts';
import { subscriberClient } from '../../config/redisClient.ts';

const subscribeToSegmentEvents = async () => {
    try {
        await subscriberClient.subscribe('segment.added', async (message: string) => {
            const segmentData = JSON.parse(message);
            console.log('Received new segment event:', segmentData);

            try {
                const { name, criteria } = segmentData;

                const query = await buildQuery(criteria);

                const audienceSize = await Customer.countDocuments(query);

                const customers = await Customer.find(query);
                const customerIds = customers.map(customer => customer._id);

                const newSegment = new Segment({
                    name,
                    criteria,
                    customerIds,
                    audienceSize,
                });

                await newSegment.save();

                const newsegment = new Segment(segmentData);
                await newsegment.save();

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
