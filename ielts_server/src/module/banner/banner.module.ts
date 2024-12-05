import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerController } from './controller/banner.controller';
import { BannerService } from './service/banner.service';
import { BannerRepository } from './repository/banner.repository';
import { BannerEntity } from 'src/lib/entity/banner/banner.entity';
import { ResourceModule } from '../resource/resource.module';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/app.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
	imports: [TypeOrmModule.forFeature([BannerEntity]), ResourceModule, SharedModule],
	controllers: [BannerController],
	exports: [BannerService, BannerRepository],
	providers: [BannerService, BannerRepository],
})
export class BannerModule {}
