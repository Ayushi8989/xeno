import express from "express";
import { previewSegment } from "../api/segments/previewSegment.ts";
import { createSegment } from "../api/segments/createSegment.ts";

const router = express.Router();

router.post('/segments/create', createSegment);
router.post('/segments/preview', previewSegment);


export default router;
