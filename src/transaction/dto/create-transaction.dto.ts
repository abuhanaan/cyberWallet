import { ApiProperty } from '@nestjs/swagger';
import { Double, Integer } from 'aws-sdk/clients/apigateway';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  walletId: number;
}
