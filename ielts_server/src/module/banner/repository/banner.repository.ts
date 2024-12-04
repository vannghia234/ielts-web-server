import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateBannerDTO } from '../dto/create-banner.dto';
import { UpdateBannerDTO } from '../dto/update-banner.dto';
import { BannerEntity } from 'src/lib/entity/banner/banner.entity';
import { FilterQueryBannerDTO } from '../dto/filter-query-banner.dto';

@Injectable()
export class BannerRepository {
	constructor(
		@InjectRepository(BannerEntity)
		private readonly bannerEntity: Repository<BannerEntity>,
	) {}

	async findAll() {
		return this.bannerEntity.find();
	}

	async findOne(id: string): Promise<BannerEntity | null> {
		return this.bannerEntity.findOne({
			where: { id },
		});
	}

	async filter(query: FilterQueryBannerDTO): Promise<BannerEntity[]> {
		const params: FindOptionsWhere<BannerEntity> = {}
		if (query?.type) {
			params.type = In([query.type])
		}

		return this.bannerEntity.findBy(params)
	}

	async create(data: CreateBannerDTO) {
		const banner = new BannerEntity();
		banner.type = data.type;
		banner.src = data.src;
		banner.content = data.content;
		return this.bannerEntity.save(banner);
	}

	async update(id: string, data: Partial<UpdateBannerDTO>) {
		const bandsScore = new BannerEntity();
		if (data.type) {
			bandsScore.type = data.type;
		}

		if (data.src) {
			bandsScore.src = data.src;
		}
		if (data.content) {
			bandsScore.content = data.content;
		}
		return this.bannerEntity.update(id, bandsScore);
	}

	async delete(id: string) {
		return this.bannerEntity.delete(id);
	}
}
