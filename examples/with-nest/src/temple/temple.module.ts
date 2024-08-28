import { Module } from '@nestjs/common';
import { TempleService } from './temple.service';

@Module({
  providers: [ TempleService ],
  imports: [],
  exports: [ TempleService ]
})

export class TempleModule {
  static forRoot(config: Record<string, unknown>) {
    const configProvider: any = { provide: 'TEMPLE_CONFIG' };

    if (config.useFactory) {
      configProvider.useFactory = config.useFactory;
      configProvider.inject = config.inject || [];
    } else {
      configProvider.useValue = config;
    }

    return {
      module: TempleModule,
      providers: [ configProvider, TempleService ],
      exports: [ TempleService ]
    };
  }
}