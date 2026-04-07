import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { MessagesModule } from './messages/messages.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AiModule } from './ai/ai.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para el frontend
  app.enableCors();

  // Validación global de datos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Demo Backend - Taller')
    .setDescription(
      'API de demostración educativa.',
    )
    .setVersion('1.0')
    .addTag('utilidades', 'Operaciones simples de ejemplo')
    .addTag('ia', 'Endpoint que consume una API de IA')
    .build();

  const configMessages = new DocumentBuilder()
    .setTitle('Demo Backend - Taller - Mensajes')
    .setDescription(
      'API de demostración educativa - Mensajes.',
    )
    .addTag('mensajes', 'Operaciones con mensajes')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [UtilitiesModule, AiModule],
  });
  SwaggerModule.setup('api', app, document);

  const documentMessages = SwaggerModule.createDocument(app, configMessages,
    {
      // include: [MessagesModule],
    }
  );
  SwaggerModule.setup('doc', app, documentMessages);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`\n🚀 Backend corriendo en: http://localhost:${port}`);
  console.log(`📖 Swagger docs en:      http://localhost:${port}/api\n`);
}
bootstrap();
