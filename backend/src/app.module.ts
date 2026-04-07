import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilitiesModule } from './utilities/utilities.module';
import { AiModule } from './ai/ai.module';
// import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    // Carga variables de entorno desde .env
    ConfigModule.forRoot({ isGlobal: true }),
    // MessagesModule,
    UtilitiesModule,
    AiModule,
  ],
  controllers: [],
})
export class AppModule {}
