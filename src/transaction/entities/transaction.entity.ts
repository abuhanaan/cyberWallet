import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';
import { WalletEntity } from 'src/wallet/entities/wallet.entity';
export class TransactionEntity implements Transaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  walletId: number;

  @ApiProperty({ required: false, type: () => WalletEntity })
  wallet?: WalletEntity;

  @ApiProperty({ required: false, type: () => UserEntity })
  user?: UserEntity;

  constructor({ wallet, user, ...data }: Partial<TransactionEntity>) {
    Object.assign(this, data);

    if (wallet) {
      this.wallet = new WalletEntity(wallet);
    }

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
