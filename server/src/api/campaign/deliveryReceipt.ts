import mongoose from "mongoose";
import CommunicationLog from '../../models/communicationlog.model.ts';

// for handling delivery receipt and updating status
export const handleDeliveryReceipt = async (logId: mongoose.Types.ObjectId, status: string): Promise<void> => {
    try {
        await CommunicationLog.findByIdAndUpdate(logId, { status });
        console.log(`Message status for log ID ${logId} updated to: ${status}`);
    } catch (error) {
        console.error('Error updating message status:', error);
    }
};
