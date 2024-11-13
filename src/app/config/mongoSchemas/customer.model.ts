import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    email: string;
    phone: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}

const customerSchema: Schema<ICustomer> = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        phone: { 
            type: String, 
            required: true 
        },
        address: { 
            type: String, 
            required: false 
        },
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export default Customer;
