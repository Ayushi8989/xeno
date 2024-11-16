import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
    name: {
        type: String,
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
    segmentName:{
        type: String,
    },
    audienceSize: {
        type: Number
    },
    numberSent: {
        type: Number
    },
    numberFailed: {
        type: Number
    }
}, { timestamps: true });

export default mongoose.model('Campaign', CampaignSchema);