import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { GlobalExceptionFilter } from './utils/globalExceptionFilter';
import { BadRequestExceptionFilter } from './utils/badRequestExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      exceptionFactory: (errors) => {
        throw new BadRequestException(errors);
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new BadRequestExceptionFilter(),
  );
  const config = new DocumentBuilder()
    .setTitle('Cyber-byte Mock Interview')
    .setDescription('Wallet API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.use(cors());
  await app.listen(3000);
}
bootstrap();
