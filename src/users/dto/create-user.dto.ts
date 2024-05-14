import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: String;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: String;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: String;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: String;
}
