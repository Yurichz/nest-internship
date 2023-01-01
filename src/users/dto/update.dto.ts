import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Max', description: 'First Name' })
  @IsNotEmpty()
  @IsOptional()
  @IsString({ message: 'Must be string' })
  firstName?: string;

  @ApiProperty({ example: 'Lastov', description: 'Last Name' })
  @IsNotEmpty()
  @IsOptional()
  @IsString({ message: 'Must be string' })
  lastName?: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email Address' })
  @IsNotEmpty()
  @IsOptional()
  @IsEmail({}, { message: 'Must be email' })
  email?: string;

  @ApiProperty({ example: '123456', description: 'User Password' })
  @IsNotEmpty()
  @IsOptional()
  @IsString({ message: 'Must be string' })
  password?: string;
}
