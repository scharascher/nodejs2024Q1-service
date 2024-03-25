import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from 'src/routes/track/dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { TrackDto } from 'src/routes/track/dto/track.dto';
import { TRACK_NOT_FOUND_ERROR } from 'src/routes/track/const';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async getAllTracks() {
    const tracks = await this.prisma.track.findMany();
    return plainToInstance(TrackDto, tracks);
  }
  async getTrackById(id: string) {
    const track = await this.findTrackById(id);
    return plainToInstance(TrackDto, track);
  }
  async createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = this.prisma.track.create({ data: createTrackDto });
    return plainToInstance(TrackDto, newTrack);
  }
  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findTrackById(id);
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    return plainToInstance(TrackDto, updatedTrack);
  }
  async deleteTrack(id: string) {
    await this.findTrackById(id);
    await this.prisma.track.delete({ where: { id } });
  }
  private async findTrackById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) throw new NotFoundException(TRACK_NOT_FOUND_ERROR);
    return track;
  }
}
