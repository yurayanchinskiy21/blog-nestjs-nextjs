import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appCreate } from './app.create';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add middleware
  appCreate(app);

  const port = process.env.PORT || 3000;

  await app.listen(port, () => console.log(`http://localhost:${port}`));
}
bootstrap();
