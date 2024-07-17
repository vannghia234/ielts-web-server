import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/shared/constant/enum_database';

@Injectable()
export class PermissionLectureGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		console.log('permission guard ');
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get<string>('app.jwt.privateKey'),
			});
			console.log('payload ' + JSON.stringify(payload));
			if (
				payload.permissionName === UserRole.LECTURE ||
				payload.permissionName === UserRole.ADMIN
			) {
				console.log('is ', payload.permissionName);
				request['user'] = payload;
				return true;
			}
		} catch (error) {
			console.log('token ' + error);
			throw new UnauthorizedException();
		}
		return false;
	}
	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
