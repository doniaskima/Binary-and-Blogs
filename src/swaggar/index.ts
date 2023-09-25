/* eslint-disable prettier/prettier */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
	.setTitle('Binary and Blogs api document')
	.setDescription('about Binary and blogs api docs')
	.setVersion('1.0.0')
	.addBearerAuth()
	.build();

export function createSwagger(app) {
	const document = SwaggerModule.createDocument(app, swaggerOptions);
	SwaggerModule.setup('/docs', app, document);
}
