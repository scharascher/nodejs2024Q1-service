import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TrackModule } from './track/track.module';
import { ArtistService } from './artist/artist.service';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    PrismaModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
  ],
})
export class AppModule {}
