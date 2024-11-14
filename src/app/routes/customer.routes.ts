import express from "express";
import { addCustomers } from "../api/customers/addCustomers.ts";
import { customerDetails } from "../api/customers/getCustomerDetails.ts";

const router = express.Router();

router.post("/api/customers", addCustomers);
router.get("/api/customers/:id", customerDetails);

export default router;
