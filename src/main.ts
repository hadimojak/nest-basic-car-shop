import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookiesession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookiesession({
      keys: ['asd87s8'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      //this option secure the body of request and wipe out all other property
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
