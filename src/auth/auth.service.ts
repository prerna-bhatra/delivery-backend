import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verify(token);
            request['user'] = payload;

            return request;
        } catch (err) {
            console.log('errrr===>', err);
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        // console.log('auth token', request.headers['authorization']?.split(' '));
        const tokenAndType = request.headers?.['authorization']?.split(' ') ?? [];
        // console.log({ tokenAndType });
        const [type, token] = tokenAndType;
        return type === 'Bearer' ? token : undefined;
    }

}
