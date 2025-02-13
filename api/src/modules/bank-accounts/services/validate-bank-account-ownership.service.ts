import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async validate(userId: string, bankAccountId: string) {
    const isOnwer = await this.bankAccountsRepository.findFirst({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    if (!isOnwer) {
      throw new NotFoundException('Conta do banco não encotrada.');
    }
  }
}
