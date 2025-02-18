import { SinginDto } from './dto/singin.dto';
import { SingupDto } from './dto/singup.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    singin(singInDto: SinginDto): Promise<{
        accessToken: string;
    }>;
    singup(singupDto: SingupDto): Promise<{
        accessToken: string;
    }>;
    private generateAccessToken;
}
