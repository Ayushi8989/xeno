import express from "express";
import { addOrders } from "../api/orders/addOrders.ts";
import { orderDetails } from "../api/orders/getOrderDetails.ts";

const router = express.Router();

router.post("/api/orders", addOrders);
router.get("/api/orders/:id", orderDetails);

export default router;
