import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerController } from './controller/banner.controller';
import { BannerService } from './service/banner.service';
import { BannerRepository } from './repository/banner.repository';
import { BannerEntity } from 'src/lib/entity/banner/banner.entity';

@Module({
	imports: [TypeOrmModule.forFeature([BannerEntity])],
	controllers: [BannerController],
	exports: [BannerService, BannerRepository],
	providers: [BannerService, BannerRepository],
})
export class BannerModule {}
