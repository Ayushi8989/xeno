import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http'; 
import connectDB from '../config/dbConfig.ts';
import customerRoutes from '../routes/customer.routes.ts';
import orderRoutes from '../routes/order.routes.ts';
import subscribeToCustomerEvents from './subscribers/customerSubscriber.ts';
import subscribeToOrderEvents from './subscribers/orderSubscriber.ts';
import segmentRoutes from '../routes/segment.routes.ts';
import campaignRoutes from '../routes/campaign.routes.ts';
import subscribeToSegmentEvents from './subscribers/segmentSubscriber.ts';
import { subscribeToMessageEvents } from './subscribers/messageSubscriber.ts';

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
