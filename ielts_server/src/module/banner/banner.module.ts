import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandScoreEntity } from 'src/lib/entity/bandScore/bandScore.entity';
import { BannerController } from './controller/banner.controller';
import { BannerService } from './service/banner.service';
import { BannerRepository } from './repository/banner.repository';

@Module({
	imports: [TypeOrmModule.forFeature([BandScoreEntity])],
	controllers: [BannerController],
	exports: [BannerService, BannerRepository],
	providers: [BannerService, BannerRepository],
})
export class BandScoreModule {}
