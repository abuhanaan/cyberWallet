import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { Prisma } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, WalletModule, TransactionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
