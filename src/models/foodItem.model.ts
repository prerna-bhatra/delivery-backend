import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FoodItemDocument = FoodItem & Document;

@Schema()
export class FoodImage {
  @Prop()
  data: Buffer
  @Prop()
  contentType: string
}

@Schema()
export class FoodItem {
  @Prop({ required: true, ref: 'Restaurant' })
  restaurentId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  foodName: string;

  @Prop({ required: true })
  foodImage: FoodImage
}

export const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
