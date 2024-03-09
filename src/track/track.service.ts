import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE, getId } from '../database/db';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  async getAllTracks() {
    return DATABASE.track;
  }
  async getTrackById(id: string) {
    return await this.findTrackById(id);
  }
  async createTrack(createTrackDto: CreateTrackDto) {
    DATABASE.track.push({
      id: getId(),
      ...createTrackDto,
    });
    return DATABASE.track[DATABASE.track.length - 1];
  }
  async updateTrack(id: string, createTrackDto: CreateTrackDto) {
    const track = await this.findTrackById(id);
    const index = DATABASE.track.findIndex((t) => t.id === id);
    DATABASE.track[index] = { ...track, ...createTrackDto };
    return DATABASE.track[index];
  }
  async deleteTrack(id: string) {
    await this.findTrackById(id);
    const index = DATABASE.track.findIndex((t) => t.id === id);
    DATABASE.track.splice(index, 1);
  }
  private async findTrackById(id: string) {
    const track = DATABASE.track.find((t) => t.id === id);
    if (!track) throw new NotFoundException(`User not found`);
    return track;
  }
}
