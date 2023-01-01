import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateResult, DeleteResult } from 'mongodb';
import { User, UserDocument } from './users.model';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  findAll(): Promise<UserDocument[]> {
    return this.userModel.find({}).exec();
  }

  findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  create(dto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(dto);
  }

  updateById(_id: string, dto: UpdateUserDto): Promise<UpdateResult> {
    return this.userModel.updateOne({ _id }, dto, { new: true }).exec();
  }

  deleteById(_id: string): Promise<DeleteResult> {
    return this.userModel.deleteOne({ _id }).exec();
  }
}
