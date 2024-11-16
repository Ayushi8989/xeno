import mongoose, { Schema } from 'mongoose';

const SegmentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    totalSpending: {
        type: Number,
        required: true,
    },
    totalSpendingOperator: {
        type: String,
        required: true,
        enum: ['>=', '<=', '=', '>', '<'], 
    },
    visits: {
        type: Number,
        required: true,
    },
    visitOperator: {
        type: String,
        required: true,
        enum: ['>=', '<=', '=', '>', '<'], 
    },
    customerIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
    ],
    audienceSize: {
        type: Number,
        // required: true,
    },
});

export default mongoose.model('Segment', SegmentSchema);
