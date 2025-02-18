import { CategoriesService } from './services/categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        userId: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionTupe;
    }[]>;
}
