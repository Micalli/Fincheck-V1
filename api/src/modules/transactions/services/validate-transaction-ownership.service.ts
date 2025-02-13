import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async validate(userId: string, transactionId: string) {
    const isOnwer = await this.transactionsRepository.findFirst({
      where: {
        userId,
        id: transactionId,
      },
    });

    if (!isOnwer) {
      throw new NotFoundException('Transação não encotrada.');
    }
  }
}
