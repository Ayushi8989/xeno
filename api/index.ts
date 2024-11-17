import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http'; 
import connectDB from '../server/src/config/dbConfig.ts';
import customerRoutes from '../server/src/routes/customer.routes.ts';
import orderRoutes from '../server/src/routes/order.routes.ts';
import subscribeToCustomerEvents from '../server/src/api/subscribers/customerSubscriber.ts';
import subscribeToOrderEvents from '../server/src/api/subscribers/orderSubscriber.ts';
import segmentRoutes from '../server/src/routes/segment.routes.ts';
import campaignRoutes from '../server/src/routes/campaign.routes.ts';
import subscribeToSegmentEvents from '../server/src/api/subscribers/segmentSubscriber.ts';
import { subscribeToMessageEvents } from '../server/src/api/subscribers/messageSubscriber.ts';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json()); // For parsing JSON requests

// Connect to Database
connectDB();

subscribeToCustomerEvents();
subscribeToOrderEvents();
subscribeToSegmentEvents();
subscribeToMessageEvents();

// Define routes
app.use(customerRoutes);
app.use(orderRoutes);
app.use(segmentRoutes);
app.use(campaignRoutes);

export const handler = serverless(app);// Export as serverless function
