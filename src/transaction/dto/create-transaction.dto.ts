import { ApiProperty } from '@nestjs/swagger';
import { Double, Integer } from 'aws-sdk/clients/apigateway';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: Integer;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: Double;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  walletId: Integer;
}
