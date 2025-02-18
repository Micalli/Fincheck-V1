import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    findAllByUserId(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        userId: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionTupe;
    }[]>;
}
