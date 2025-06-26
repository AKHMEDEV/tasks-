import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
  await app.listen(port, () =>
    console.log(`server started on port ${port} 🟢`),
  );
}
bootstrap();
