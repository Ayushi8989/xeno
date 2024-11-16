import express from "express";
import { getSegment } from "../api/segments/getSegment.ts";
import { createSegment } from "../api/segments/createSegment.ts";
import { sendMessages } from "../api/campaign/message.ts";
import { getCommunicationLogbyId, getCommunicationLogs } from "../api/campaign/getCommunicationLog.ts";

const router = express.Router();

router.post('/segments/create', createSegment);
router.get('/segments/id', getSegment);
router.post('/sendMessage', sendMessages);
router.get('/communicationLog/:id', getCommunicationLogbyId);
router.get('/communicationLogs', getCommunicationLogs);

export default router;
