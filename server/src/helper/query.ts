/* eslint-disable @typescript-eslint/no-explicit-any */
import Order from '../models/order.model.ts';

const operatorMap = {
    ">=": "$gte",
    "<=": "$lte",
    ">": "$gt",
    "<": "$lt",
    "=": "$eq",
    "!=": "$ne",
};
type OperatorKeys = keyof typeof operatorMap;

export const buildQuery = async (
    totalSpending: any,
    totalSpendingOperator: OperatorKeys,
    visits: any,
    visitOperator:
        OperatorKeys,
    logic: string
) => {

    let amountQuery = {};
    let visitsQuery = {};

    // Build the aggregation query for amount
    if (totalSpendingOperator) {
        const aggregateQuery = [
            {
                $group: {
                    _id: "$customerId",
                    totalAmount: { $sum: "$totalAmount" },
                },
            },
            {
                $match: {
                    totalAmount: { [operatorMap[totalSpendingOperator]]: totalSpending },
                },
            },
        ];

        try {
            const aggregatedResults = await Order.aggregate(aggregateQuery).exec();
            const eligibleCustomerIds = aggregatedResults.map((result: { _id: string }) => result._id);

            amountQuery = eligibleCustomerIds.length
                ? { _id: { $in: eligibleCustomerIds } }
                : { _id: { $in: [] } };
        } catch (error) {
            console.error("Error in aggregation for amount:", error);
        }
    }

    // Build the visits query
    if (visits && visitOperator) {

        const visAggregateQuery = [
            {
                $group: {
                    _id: "$customerId",
                    orderCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    orderCount: { [operatorMap[visitOperator]]: visits },
                },

            }
        ]

        try {
            const aggregatedResults = await Order.aggregate(visAggregateQuery).exec();
            const eligibleCustomerIds = aggregatedResults.map((result: { _id: string }) => result._id);

            visitsQuery = eligibleCustomerIds.length
                ? { _id: { $in: eligibleCustomerIds } }
                : { _id: { $in: [] } };
        } catch (error) {
            console.error("Error in aggregation for visits:", error);
        }
    }

    // Combine queries based on logic
    let combinedQuery = {};
    if (logic && logic.toUpperCase() === "OR") {
        combinedQuery = { $or: [amountQuery, visitsQuery] };
    } else {
        // Default to AND logic
        combinedQuery = { ...amountQuery, ...visitsQuery };
    }

    return combinedQuery;
};
