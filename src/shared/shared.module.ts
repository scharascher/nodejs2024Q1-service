import { Global, Module } from '@nestjs/common';
import { UUID_VERSION } from './const/uuid';

@Global()
@Module({
  providers: [{ useValue: UUID_VERSION, provide: 'UUID_VERSION' }],
})
export class SharedModule {}
