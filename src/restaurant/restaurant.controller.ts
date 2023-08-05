import { Controller, Get, Post, Body, Param, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as formidable from 'formidable';


import { RestaurantService } from './restaurant.service';
import { Restaurant } from 'src/models/restaurant.model';
import { IResponseType } from 'src/interfaces';
import { Request } from 'express';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurants();
  }

  @Post()
  async addRestaurant(@Body() restaurant: Restaurant): Promise<IResponseType> {
    return this.restaurantService.addRestaurant(restaurant);
  }

  @Post('login-restaurant')
  async loginRestaurant(@Body() userInfo: any): Promise<any> {
    const { email, password } = userInfo
    return this.restaurantService.loginRestaurantAccount({ email, password });
  }

  @Post('add-food-item')
  async addFoodItem(
    @Req() request: Request
  ): Promise<any> {
    const form = new formidable.IncomingForm();
    // console.log({ form });

    form.parse(request, async (err, fields, files) => {
      console.log("INSIDE FORM");
      
      if (err) {
        // Handle error
        console.error(err);
        return;
      }
      console.log('Form Fields:', fields);
      console.log('Uploaded Files:', files);
      const addFood = await this.restaurantService.addFood({ fields, files })
    });
    // return addFood
  }
  @Get(':id')
  async getRestaurantById(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.getRestaurantById(id);
  }
}
