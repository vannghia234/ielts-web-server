import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BandScoreEntity } from 'src/lib/entity/bandScore/bandScore.entity';
import { Repository } from 'typeorm';
import { CreateBandScoreDTO } from '../dto/create-band-score.dto';

@Injectable()
export class BandScoreRepository {
	constructor(
		@InjectRepository(BandScoreEntity)
		private readonly bandScoreEntity: Repository<BandScoreEntity>,
	) {}

	async findAll() {
		return this.bandScoreEntity.find();
	}

	async findOne(id: string) {
		return this.bandScoreEntity.findOne({
			where: { id },
		});
	}

	async create(data: CreateBandScoreDTO) {
		const bandsScore = new BandScoreEntity();
		if (data.name) {
			bandsScore.name = data.name;
		}
		bandsScore.bands = data.bandsScore.map((band) => ({
			max: band.max,
			min: band.min,
			score: band.score,
		}));
		return this.bandScoreEntity.save(bandsScore);
	}

	async delete(id: string) {
		return this.bandScoreEntity.delete(id);
	}
}
