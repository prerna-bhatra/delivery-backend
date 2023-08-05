import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/models/customer.model';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}

  async addCustomer(customer: Customer): Promise<Customer> {
    const newCustomer = new this.customerModel(customer);
    return newCustomer.save();
  }

  async getCustomerById(id: string): Promise<Customer> {
    return this.customerModel.findById(id).exec();
  }

  async verifyPhoneNumber(id: string, verificationCode: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new BadRequestException('Customer not found.');
    }

    // Simulate OTP verification (replace this with your actual OTP verification logic)
    const simulatedOtp = '123456'; // Replace with the OTP sent to the customer's phone
    if (verificationCode !== simulatedOtp) {
      throw new BadRequestException('Invalid verification code.');
    }

    customer.isVerified = true;
    return customer.save();
  }

  async getCustomerByEmail(email: string): Promise<Customer> {
    return this.customerModel.findOne({ email }).exec();
  }
}
