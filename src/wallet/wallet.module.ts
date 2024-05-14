import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [PrismaModule],
  exports: [WalletService],
})
export class WalletModule {}
