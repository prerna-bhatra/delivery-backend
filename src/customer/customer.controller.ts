import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from 'src/models/customer.model';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async addCustomer(@Body() customer: Customer): Promise<Customer> {
    return this.customerService.addCustomer(customer);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }

  @Patch(':id/verify')
  async verifyPhoneNumber(@Param('id') id: string, @Body() verificationCode: string): Promise<Customer> {
    return this.customerService.verifyPhoneNumber(id, verificationCode);
  }
}
