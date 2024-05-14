import { ApiProperty } from '@nestjs/swagger';
import { User, Wallet } from '@prisma/client';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { WalletEntity } from 'src/wallet/entities/wallet.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ required: false, type: () => WalletEntity })
  wallet?: WalletEntity;

  @ApiProperty({
    isArray: true,
    required: false,
    type: () => TransactionEntity,
  })
  transactions?: TransactionEntity[];

  constructor({ wallet, transactions, ...data }: Partial<UserEntity>) {
    Object.assign(this, data);

    if (wallet) {
      this.wallet = new WalletEntity(wallet);
    }

    if (transactions) {
      this.transactions = transactions.map(
        (transaction) => new TransactionEntity(transaction),
      );
    }
  }
}
