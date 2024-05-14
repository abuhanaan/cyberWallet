import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { Integer } from 'aws-sdk/clients/apigateway';
import { NotFound } from '@aws-sdk/client-s3';
import { generateReferenceId } from 'src/utils/referenceGenerator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  private async checkIfTransactionAlreadyExist(reference: string) {
    const existingTransaction = await this.prisma.transaction.findFirst({
      where: { reference },
    });

    if (existingTransaction) {
      throw new ConflictException('Duplicate transaction');
    }
  }

  private async checkIfPinIsCorrect(user: UserEntity, pin: string) {
    // console.log(user.wallet.transactionPin);
    const isPinValid = await bcrypt.compare(pin, user.wallet.transactionPin);

    if (!isPinValid) {
      throw new BadRequestException(
        'Pin mismatch, please provide the right pin',
      );
    }
  }

  private async checkIfUserExist(id: Integer): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { wallet: true },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return user;
  }

  private async checkIfWalletExist(id: Integer) {
    const wallet = await this.prisma.wallet.findUnique({ where: { id } });
    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${id} does not exist`);
    }
    return wallet;
  }

  private checkIfSenderBalanceIsSufficient(user: UserEntity, amount: Integer) {
    if (user.wallet.balance < amount) {
      throw new ConflictException('Insufficient Balance');
    }
  }
  async create(createTransactionDto: CreateTransactionDto) {
    const user = await this.checkIfUserExist(createTransactionDto.userId);
    const transactionRef = generateReferenceId();
    const beneficiarry = await this.checkIfWalletExist(
      createTransactionDto.beneficiarryWalletId,
    );
    // console.log(user);
    await this.checkIfPinIsCorrect(user, createTransactionDto.transactionPin);
    await this.checkIfSenderBalanceIsSufficient(
      user,
      createTransactionDto.amount,
    );

    await this.checkIfTransactionAlreadyExist(transactionRef);

    const dbTransaction = await this.prisma.$transaction(async (prisma) => {
      const newTransaction = await prisma.transaction.create({
        data: {
          reference: transactionRef,
          userId: user.id,
          amount: createTransactionDto.amount,
          walletId: createTransactionDto.beneficiarryWalletId,
        },
      });

      const beneficiarryWalletUpdate = await prisma.wallet.update({
        where: { id: beneficiarry.id },
        data: { balance: { increment: createTransactionDto.amount } },
      });

      const senderWalletUpdate = await prisma.wallet.update({
        where: { id: user.wallet.id },
        data: { balance: { decrement: createTransactionDto.amount } },
      });

      return [newTransaction];
    });
    return dbTransaction[0];
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
