import type { TempleOptions, TempleCompiler } from '@ossph/temple/compiler';

import { Inject, Injectable } from '@nestjs/common';
import temple from '@ossph/temple/compiler';


@Injectable()
export class TempleService {
  protected _compiler: TempleCompiler;
  public constructor(
    @Inject('TEMPLE_CONFIG')
    config: TempleOptions
  ) {
    this._compiler = temple(config);
  }

  public get compiler() {
    return this._compiler;
  }
}