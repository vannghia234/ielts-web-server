import { Injectable } from '@nestjs/common';
import { BandScoreRepository } from '../repository/banScore.repository';
import { CreateBandScoreDTO } from '../dto/create-band-score.dto';
import { BandScoreEntity } from 'src/lib/entity/bandScore/bandScore.entity';

@Injectable()
export class BandScoreService {
	constructor(private readonly bandScoreRepository: BandScoreRepository) {}

	async findAll() {
		return this.bandScoreRepository.findAll();
	}

	async findOne(id: string) {
		return this.bandScoreRepository.findOne(id);
	}

	async getReading(): Promise<BandScoreEntity | null> {
		const list = await this.bandScoreRepository.findAll();
		if (list.length === 0) return null;
		return list.find((bandScore) => bandScore.name === 'reading');
	}

	async getListening(): Promise<BandScoreEntity | null> {
		const list = await this.bandScoreRepository.findAll();
		if (list.length === 0) return null;
		return list.find((bandScore) => bandScore.name === 'listening');
	}

	async create(data: CreateBandScoreDTO) {
		return this.bandScoreRepository.create(data);
	}

	async delete(id: string) {
		return this.bandScoreRepository.delete(id);
	}
}
