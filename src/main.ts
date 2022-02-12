import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EasyconfigService } from 'nestjs-easyconfig';
import { AppModule } from './app.module';
import { EasyConfiguration } from './configs/easyconfig.service';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService : EasyConfiguration = app.get(EasyconfigService);
  const objConfig = configService["envConfig"];
  console.log(objConfig);


  app.useGlobalPipes(new ValidationPipe);
  const config = new DocumentBuilder()
    .setTitle('CargoFive Challenge Documentation')
    .setDescription('Documentation Backend About Challenge')
    .setVersion('1.0')
    .addTag('CargoFive challenge backend')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }, 'XYZ')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
