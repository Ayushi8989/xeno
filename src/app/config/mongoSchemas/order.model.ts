import mongoose, { Schema, Document } from 'mongoose';
import { ICustomer } from './customer.model.ts'; 

export interface IOrder extends Document {
    orderNumber: string;
    customerId: ICustomer['_id'];
    items: Array<{
        product: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    orderDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema: Schema<IOrder> = new Schema(
    {
        orderNumber: {
            type: String, 
            required: true, 
            unique: true 
        },
        customerId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Customer', 
            required: true 
        },
        items: [
            {
                product: { 
                    type: String, 
                    required: true 
                },
                quantity: { 
                    type: Number, 
                    required: true 
                },
                price: { 
                    type: Number, 
                    required: true 
                },
            },
        ],
        totalAmount: { 
            type: Number, 
            required: true 
        },
        orderDate: { 
            type: Date, 
            required: true, default: Date.now 
        },
        status: { 
            type: String, default: 'Pending' 
        },
    },
    {
        timestamps: true, 
    }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
