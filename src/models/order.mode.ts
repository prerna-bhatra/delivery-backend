// restaurant/order.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ type: [{ type: String }] })
  items: string[];

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  isDelivered: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
