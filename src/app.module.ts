import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginController } from './app.controller';
import { LoginService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [LoginController],
  providers: [LoginService],
})
export class AppModule {}
