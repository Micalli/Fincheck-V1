import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class CategoriesRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findMany(findManyDto: Prisma.CategoryFindManyArgs): Prisma.PrismaPromise<{
        id: string;
        name: string;
        userId: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionTupe;
    }[]>;
    findFirst(findFirstDto: Prisma.CategoryFindFirstArgs): Prisma.Prisma__CategoryClient<{
        id: string;
        name: string;
        userId: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionTupe;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
