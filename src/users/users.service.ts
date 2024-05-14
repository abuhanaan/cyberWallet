import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private checkIfUserExists(user: User, id: number) {
    if (!user) {
      throw new NotFoundException({
        message: 'Not Found',
        error: `User with id ${id} does not exist`,
      });
    }
  }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException({
          message: 'Conflict Operation',
          error: `User with email ${createUserDto.email} already exist`,
        });
      }
      const dbTransaction = await this.prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            address: createUserDto.address,
          },
        });

        const hashedPin = await bcrypt.hash(
          createUserDto.transactionPin,
          roundsOfHashing,
        );

        const newWallet = await prisma.wallet.create({
          data: {
            userId: newUser.id,
            balance: 0,
            transactionPin: hashedPin,
          },
        });

        return [newUser];
      });
      return this.prisma.user.findUnique({
        where: { id: dbTransaction[0].id },
        include: { wallet: true },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
