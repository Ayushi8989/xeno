import express from "express";
import { previewSegment } from "../api/segments/previewSegment.ts";
import { createSegment } from "../api/segments/createSegment.ts";

const router = express.Router();

router.post('/segments/preview', previewSegment);
router.post('/segments/create', createSegment);


export default router;
