import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { HashService } from './has.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async register(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    const user = await this.getUserByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException();
    }

    createUser.password = await this.hashService.hashPassword(
      createUser.password,
    );
    return createUser.save();
  }
}
