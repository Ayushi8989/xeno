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
}, { timestamps: true });

export default mongoose.model('Campaign', CampaignSchema);