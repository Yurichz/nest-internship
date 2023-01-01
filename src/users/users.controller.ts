import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'mongodb';
import { UsersService } from './users.service';
import { User, UserDocument } from './users.model';
import { encodePassword } from '../utils/bcrypt';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/v1/user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAllUsers(): Promise<UserDocument[]> {
    try {
      const allUsers = await this.userService.findAll();

      return allUsers;
    } catch (error) {
      throw new HttpException(error, 422);
    }
  }

  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  async findUserById(@Param('id') id: string): Promise<UserDocument> {
    try {
      const user = await this.userService.findById(id);

      return user;
    } catch (error) {
      throw new HttpException(error, 422);
    }
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    try {
      const password = await encodePassword(createUserDto.password);
      const user = await this.userService.create({
        ...createUserDto,
        password,
      });

      return user;
    } catch (error) {
      throw new HttpException(error, 409);
    }
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      if (!updateUserDto.password) {
        const user = await this.userService.updateById(id, updateUserDto);

        return user;
      }

      const password = await encodePassword(updateUserDto.password);
      const user = await this.userService.updateById(id, {
        ...updateUserDto,
        password,
      });

      return user;
    } catch (error) {
      throw new HttpException(error, 409);
    }
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: User })
  @Delete()
  async deleteUserById(@Body('id') id: string): Promise<DeleteResult> {
    try {
      const user = await this.userService.deleteById(id);

      return user;
    } catch (error) {
      throw new HttpException(error, 422);
    }
  }
}
