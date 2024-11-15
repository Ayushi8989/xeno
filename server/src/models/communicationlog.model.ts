import mongoose, { Schema } from 'mongoose';

const CommunicationLogSchema = new Schema({
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer', 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    segmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Segment',
        required: true
    },
    status: { 
        type: String, 
        enum: ['PENDING', 'SENT', 'FAILED'], default: 'PENDING' 
    },
}, { timestamps: true });

export default mongoose.model('CommunicationLog', CommunicationLogSchema);
