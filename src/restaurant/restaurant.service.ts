import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponseType } from 'src/interfaces';
import { Restaurant } from 'src/models/restaurant.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { FoodItem } from 'src/models/foodItem.model';
import * as fs from 'fs';


@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant') private readonly restaurantModel: Model<Restaurant>,
    @InjectModel('FoodItem') private readonly foodItemModel: Model<FoodItem>,
    private readonly jwtService: JwtService,
  ) { }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantModel.find().exec();
  }

  async addRestaurant(restaurant: Restaurant): Promise<IResponseType> {
    console.log("WITHOUT ENCRYPT", { restaurant });

    const { email, password } = restaurant;

    const isAlreadyExists = await this.restaurantModel.findOne({ email })

    console.log({ isAlreadyExists });


    if (isAlreadyExists) {
      return {
        success: false,
        status: 400,
        message: "This Email is already registered"
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    restaurant.password = hashedPassword;

    console.log("ENCRYPTED", { restaurant });


    const newRestaurant = new this.restaurantModel(restaurant);
    const saveResaturant = await newRestaurant.save();
    console.log({ saveResaturant });

    return {
      success: true,
      status: 200,
      message: "Restaurent registered"
    }
  }

  //bulk dishes
  async loginRestaurantAccount({ email, password }): Promise<IResponseType> {
    //update the dishes 
    try {
      console.log({ email, password });


      const isRegistered = await this.restaurantModel.findOne({ email })
      if (!isRegistered) {
        return {
          status: 400,
          message: "Email not registered ",
          success: false
        }
      }

      const { password: savedPassword } = isRegistered;

      const validatePassword = await bcrypt.compare(password, savedPassword)
      // console.log({ validatePassword });
      if (!validatePassword) {
        return {
          status: 400,
          message: "Incorrect Password ",
          success: false
        }
      }


      const payload = { username: email, sub: isRegistered._id };

      const access_token = this.jwtService.sign(payload)

      console.log({ access_token });

      return {
        status: 200,
        message: "Success ",
        success: true,
        data: [access_token]
      }

    } catch (error) {
      return {
        status: 400,
        message: "Something Went Wrong",
        success: false,
        error
      }
    }

  }

  async addFood({ fields, files }) {

    console.log({
      resid: fields.restaurantId[0],
      fName: fields.foodName[0]
    });
    const filepath = files.foodImage[0].filepath;
    const foodImage = {
      data: fs.readFileSync(filepath),
      contentType: files.foodImage[0].mimetype
    }

    const rId = fields.restaurantId[0]
    const fName = fields.foodName[0]

    const saveFood = await this.foodItemModel.create({
      foodImage,
      foodName: fName,
      restaurentId: rId
    })

    return {
      success: true,
      status: 200,
      message: "food item added "
    }
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    return this.restaurantModel.findById(id).exec();
  }
}
