import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { ChangePasswordDto } from '../dtos/change-passwords.dto';

@Injectable()
export class ChangePasswordProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly hashingProvider: HashingProvider,
  ) {}

  public async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      throw new BadRequestException('Password change is not available');
    }

    const isPasswordValid = await this.hashingProvider.comparePassword(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    user.password = await this.hashingProvider.hashPassword(
      changePasswordDto.newPassword,
    );

    await this.usersRepository.save(user);

    return {
      message: 'Password changed successfully',
    };
  }
}
