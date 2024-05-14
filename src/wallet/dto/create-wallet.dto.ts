import { ApiProperty } from '@nestjs/swagger';
import { Double, Integer } from 'aws-sdk/clients/apigateway';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: Integer;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  balance: Double;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  transactionPin: Integer;
}
