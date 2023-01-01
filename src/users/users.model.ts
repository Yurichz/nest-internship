import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({ example: 'Max', description: 'First Name' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ example: 'Lastov', description: 'Last Name' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email Address' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: '123456', description: 'User Password' })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
