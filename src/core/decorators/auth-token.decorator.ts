import { ExecutionContext, createParamDecorator, HttpException } from '@nestjs/common';

export const AuthToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const token = request.headers['authorization'];
	if (!token) {
		throw new HttpException('No authorization header were found', 401);
	}

	return token.replace('Bearer ', '');
});
