import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '@prisma/client';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class WalletEntity implements Wallet {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  balance: number;
  transactionPin: string;

  @ApiProperty({ required: false, type: () => UserEntity })
  user?: UserEntity;

  @ApiProperty({ required: false, type: () => TransactionEntity })
  transactions?: TransactionEntity[];

  constructor({ user, transactions, ...data }: Partial<WalletEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }

    if (transactions) {
      this.transactions = transactions.map(
        (transaction) => new TransactionEntity(transaction),
      );
    }
  }
}
