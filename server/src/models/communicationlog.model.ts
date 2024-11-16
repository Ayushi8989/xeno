import mongoose, { Schema } from 'mongoose';

const CommunicationLogSchema = new Schema({
    customerIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        }
    ],
    message: {
        type: String,
    },
    segmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Segment',
        required: true,
    },
    audienceSize: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'SENT', 'FAILED', 'NOT SENT'],
        default: 'NOT SENT'
    },
}, { timestamps: true });

export default mongoose.model('CommunicationLog', CommunicationLogSchema);
