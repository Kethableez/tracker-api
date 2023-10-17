import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './core/filters/prisma-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	const config = new DocumentBuilder()
		.setTitle('Tracker api')
		.setDescription('API for expense manager')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	app.use(cookieParser());
	app.enableCors({
		origin: ['http://localhost:4200'],
		credentials: true,
	});

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	await app.listen(3000);
}
bootstrap();
