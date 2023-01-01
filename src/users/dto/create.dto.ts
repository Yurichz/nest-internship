import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Max', description: 'First Name' })
  @IsNotEmpty()
  @Length(2, 255)
  @IsString({ message: 'firstName must be string' })
  firstName: string;

  @ApiProperty({ example: 'Lastov', description: 'Last Name' })
  @IsNotEmpty()
  @Length(2, 255)
  @IsString({ message: 'lastName must be string' })
  lastName: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email Address' })
  @IsNotEmpty()
  @Length(2, 255)
  @IsEmail({}, { message: 'Must be email' })
  email: string;

  @ApiProperty({ example: '123456', description: 'User Password' })
  @IsNotEmpty()
  @Length(6, 48)
  @IsString({ message: 'password must be string' })
  password: string;
}
