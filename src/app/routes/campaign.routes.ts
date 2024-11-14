import express from "express";
import { pastCampaign } from "../api/campaign/pastCampaign.ts";

const router = express.Router();

router.get("/pastcampaign/:id", pastCampaign);

export default router;
