import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOnwer = await this.categoriesRepository.findFirst({
      where: {
        userId,
        id: categoryId,
      },
    });

    if (!isOnwer) {
      throw new NotFoundException('Categoria não encotrada.');
    }
  }
}
