import mongoose, { Schema } from 'mongoose';

const SegmentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    criteria: {
        type: Object,
        required: true
    },
    customerIds: [
        {
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Customer'
            },
        }
    ],
    audienceSize: {
        type: Number,
        required: true
    },
});

export default mongoose.model('Segment', SegmentSchema);
