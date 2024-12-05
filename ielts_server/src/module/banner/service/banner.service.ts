import { Inject, Injectable } from '@nestjs/common';
import { BannerRepository } from '../repository/banner.repository';
import { CreateBannerDTO } from '../dto/create-banner.dto';
import { UpdateBannerDTO } from '../dto/update-banner.dto';
import { EBannerType } from 'src/lib/entity/banner/EBannerType';
import { BannerEntity } from 'src/lib/entity/banner/banner.entity';
import { ImageUploadService } from 'src/module/resource/image.service';
import { PathService } from 'src/shared/service/path.service';

@Injectable()
export class BannerService {
	constructor(
		private readonly pathService: PathService,
		private readonly bannerRepository: BannerRepository,
		private readonly imageUploadService: ImageUploadService,
	) {}

	async findAll(): Promise<BannerEntity[]> {
		const banners = await this.bannerRepository.findAll();

		banners.map(banner => {
			if (banner.type !== EBannerType.video && banner.src.search(/[\/|\\]/) === 0) {
				banner.src = this.pathService.initFullPath(banner.src)
			}
		})

		return banners
	}

	async findOne(id: string): Promise<BannerEntity | null> {
		const banner = await this.bannerRepository.findOne(id)
		if (banner.type !== EBannerType.video && banner.src.search(/[\/|\\]/) === 0) {
			banner.src = this.pathService.initFullPath(banner.src)
		}
		return banner;
	}

	async create(data: CreateBannerDTO) {
		return this.bannerRepository.create(data);
	}

	async update(banner: BannerEntity, data: UpdateBannerDTO) {
		return this.bannerRepository.update(banner.id, data);
	}

	async updateWithFile(
		banner: BannerEntity,
		data: UpdateBannerDTO,
		file?: Express.Multer.File,
	) {
		// only type with video can be updated src
		const newSrc = data.src
		delete data.src;
		if (
			banner.type !== EBannerType.video &&
			banner.type !== EBannerType.text &&
			!!file
		) {
			await this.imageUploadService.deleteFile(banner.src);
		}

		if (
			data.type !== EBannerType.video &&
			data.type !== EBannerType.text &&
			!!file
		) {
			const filePath = await this.imageUploadService.uploadFile(file);
			data.src = filePath;
		}

		if (data.type === EBannerType.video) {
			data.src = newSrc
		}

		return this.bannerRepository.update(banner.id, data);
	}

	async delete(id: string) {
		return this.bannerRepository.delete(id);
	}
}
