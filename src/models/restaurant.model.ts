import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Cordinates {
  @Prop({ required: true })
  lat: string;

  @Prop({ required: true })
  long: string;
}

@Schema()
export class Location {
  @Prop({ required: true, default: 'India' })
  country: string;

  @Prop({ required: true, default: 'Rajsthan' })
  state: string;

  @Prop({ required: true, default: '332404' })
  zipCode: string;

  @Prop({ required: true, default: 'Ringus' })
  city: string;
}

@Schema()
export class Restaurant {
  //restaurent name
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  cordinates: Cordinates;

  @Prop({ required: false })
  location: Location;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
