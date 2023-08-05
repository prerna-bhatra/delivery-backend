import { Module   } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';



import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RestaurantService } from './restaurant/restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './models/restaurant.model';
import { CustomerController } from './customer/customer.controller';
import { OrderService } from './order/order.service';
import { CustomerService } from './customer/customer.service';
import { Customer, CustomerSchema } from './models/customer.model';
import { Order, OrderSchema } from './models/order.mode';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { FoodItem, FoodItemSchema } from './models/foodItem.model';


@Module({
  imports: [
    MulterModule.register(),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL
    ),

    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Order.name, schema: OrderSchema },
      { name: FoodItem.name, schema: FoodItemSchema }
    ])

  ],
  controllers: [AppController, RestaurantController, CustomerController],
  providers: [AppService, RestaurantService, OrderService, CustomerService, AuthService],
})
export class AppModule { }

