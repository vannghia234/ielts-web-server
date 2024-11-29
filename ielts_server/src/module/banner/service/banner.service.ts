import { Injectable } from '@nestjs/common';
import { BannerRepository } from '../repository/banner.repository';
import { CreateBannerDTO } from '../dto/create-banner.dto';
import { BandScoreEntity } from 'src/lib/entity/bandScore/bandScore.entity';
import { UpdateBannerDTO } from '../dto/update-banner.dto';

@Injectable()
export class BannerService {
	constructor(private readonly bannerRepository: BannerRepository) {}

	async findAll() {
		return this.bannerRepository.findAll();
	}

	async findOne(id: string) {
		return this.bannerRepository.findOne(id);
	}

	async getReading(): Promise<BandScoreEntity | null> {
		const list = await this.bannerRepository.findAll();
		if (list.length === 0) return null;
		return list.find((bandScore) => bandScore.name === 'reading');
	}

	async getListening(): Promise<BandScoreEntity | null> {
		const list = await this.bannerRepository.findAll();
		if (list.length === 0) return null;
		return list.find((bandScore) => bandScore.name === 'listening');
	}

	async create(data: CreateBannerDTO) {
		return this.bannerRepository.create(data);
	}

	async update(id: string, data: UpdateBannerDTO) {
		const bandScore = await this.findOne(id);
		if (!bandScore) throw new Error(`Data with id ${id} not found`);
		return this.bannerRepository.update(id, data);
	}

	async delete(id: string) {
		return this.bannerRepository.delete(id);
	}
}
