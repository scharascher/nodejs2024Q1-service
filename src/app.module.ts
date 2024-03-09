import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [ConfigModule.forRoot(), SharedModule, PrismaModule, RoutesModule],
})
export class AppModule {}
