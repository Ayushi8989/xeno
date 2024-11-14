// import Customer from '../../app/models/customer.model.ts';  
import Order from '../../app/models/order.model.ts';

interface SegmentationCriteria {
    totalSpending?: number;
    visits?: number;
    lastVisit?: number;
}

export const buildQuery = async (criteria: SegmentationCriteria) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (criteria.totalSpending) {
        const aggregateQuery = [
            {
                $group: {
                    _id: "$customerId",
                    totalAmount: { $sum: "$totalAmount" }
                }
            },
            {
                $match: {
                    totalAmount: { $gt: criteria.totalSpending }
                }
            }
        ];

        const aggregatedResults = await Order.aggregate(aggregateQuery).exec();
        const eligibleCustomerIds = aggregatedResults.map((result: { _id: string }) => result._id);

        if (eligibleCustomerIds.length > 0) {
            query._id = { $in: eligibleCustomerIds };
        } else {
            query._id = { $in: [] };
        }
    }

    // how the visits are recorded ideally?
    if (criteria.visits) {
        query.visits = { $lte: criteria.visits };
    }

    if (criteria.lastVisit) {
        const lastVisitDate = new Date(Date.now() - criteria.lastVisit * 24 * 60 * 60 * 1000);
        query.lastVisit = { $lt: lastVisitDate };
    }

    return query;
};
