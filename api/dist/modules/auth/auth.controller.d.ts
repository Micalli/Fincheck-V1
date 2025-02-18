import { AuthService } from './auth.service';
import { SinginDto } from './dto/singin.dto';
import { SingupDto } from './dto/singup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authenticate(singinDto: SinginDto): Promise<{
        accessToken: string;
    }>;
    create(singupDto: SingupDto): Promise<{
        accessToken: string;
    }>;
    HelloWord(): string;
}
