import express from "express";
import { previewSegment } from "../api/segments/previewSegment.ts";
import { createSegment } from "../api/segments/createSegment.ts";
import { sendMessages } from "../api/campaign/message.ts";
import { getCommunicationLogbyId } from "../api/campaign/getCommunicationLog.ts";

const router = express.Router();

router.post('/segments/create', createSegment);
router.post('/segments/preview', previewSegment);
router.post('/sendMessage', sendMessages);
router.get('/communicationLog/:id', getCommunicationLogbyId);

export default router;
