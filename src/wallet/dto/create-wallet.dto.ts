import { ApiProperty } from '@nestjs/swagger';
import { Double, Integer } from 'aws-sdk/clients/apigateway';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  balance: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  transactionPin: number;
}
