import { ITrack } from 'src/routes/track/track.interface';
import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_API_PROPERTY_ID } from 'src/shared/const/swagger';
import { CreateTrackDto } from 'src/routes/track/dto/create-track.dto';

export class TrackDto extends CreateTrackDto implements ITrack {
  @ApiProperty(SWAGGER_API_PROPERTY_ID)
  readonly id: string;
}
