import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class BankAccountsRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createDto: any): Prisma.Prisma__BankAccountClient<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.BankAccountType;
        initialBalance: number;
        color: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findMany<T extends Prisma.BankAccountFindManyArgs>(findManyDto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>): Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<Prisma.$BankAccountPayload<import("@prisma/client/runtime/library").DefaultArgs>, T, Prisma.PrismaClientOptions>[]>;
    findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs): Prisma.Prisma__BankAccountClient<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.BankAccountType;
        initialBalance: number;
        color: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(updateDto: any): Prisma.Prisma__BankAccountClient<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.BankAccountType;
        initialBalance: number;
        color: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    delete(deleteDto: Prisma.BankAccountDeleteArgs): Prisma.Prisma__BankAccountClient<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.BankAccountType;
        initialBalance: number;
        color: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
