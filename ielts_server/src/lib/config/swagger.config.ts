import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
	.setTitle('SWAGGER API')
	.setVersion('2.0.0')
	.addBearerAuth()
	.build();
