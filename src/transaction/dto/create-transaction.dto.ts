import { ApiProperty } from '@nestjs/swagger';
import { Double, Integer } from 'aws-sdk/clients/apigateway';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  beneficiarryWalletId: number;

  @IsNumberString()
  @MinLength(4)
  @MaxLength(4)
  @IsNotEmpty()
  @ApiProperty()
  transactionPin: string;
}
