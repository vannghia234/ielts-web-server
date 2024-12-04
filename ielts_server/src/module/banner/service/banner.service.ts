import { Injectable } from '@nestjs/common';
import { BannerRepository } from '../repository/banner.repository';
import { CreateBannerDTO } from '../dto/create-banner.dto';
import { BandScoreEntity } from 'src/lib/entity/bandScore/bandScore.entity';
import { UpdateBannerDTO } from '../dto/update-banner.dto';
import { FilterQueryBannerDTO } from '../dto/filter-query-banner.dto';
import { EBannerType } from 'src/lib/entity/banner/EBannerType';

@Injectable()
export class BannerService {
	constructor(private readonly bannerRepository: BannerRepository) {}

	async findAll() {
		return this.bannerRepository.findAll();
	}

	async findOne(id: string) {
		return this.bannerRepository.findOne(id);
	}

	async create(data: CreateBannerDTO) {
		return this.bannerRepository.create(data);
	}

	async update(id: string, data: UpdateBannerDTO) {
		const banner = await this.findOne(id);
		if (!banner) throw new Error(`Data with id ${id} not found`);
		return this.bannerRepository.update(id, data);
	}

	async delete(id: string) {
		return this.bannerRepository.delete(id);
	}
}
