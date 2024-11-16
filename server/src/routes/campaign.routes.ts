import express from "express";
import { pastCampaign } from "../api/campaign/pastCampaign.ts";
import { sendMessages } from "../api/campaign/message.ts";

const router = express.Router();

router.get("/pastcampaign", pastCampaign);
router.post('/send-messages', sendMessages);

export default router;
