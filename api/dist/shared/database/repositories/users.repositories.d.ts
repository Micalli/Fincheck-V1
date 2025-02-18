import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class UsersRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createDto: Prisma.UserCreateArgs): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findUnique(findUniqueDto: Prisma.UserFindUniqueArgs): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
