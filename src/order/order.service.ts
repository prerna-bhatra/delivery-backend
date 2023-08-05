// restaurant/order.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/models/order.mode';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async addOrder(order: Order): Promise<Order> {
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }

  async getOrderById(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async updateOrderStatus(id: string, isDelivered: boolean): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, { isDelivered }, { new: true }).exec();
  }

  async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    return this.orderModel.find({ customerId }).exec();
  }
}
