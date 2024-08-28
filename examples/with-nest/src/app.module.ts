import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TempleModule } from './temple/temple.module';

@Module({
  imports: [
    TempleModule.forRoot({
      useFactory: () => ({})
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TempleModule]
})
export class AppModule {}
