import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandScoreEntity } from 'src/lib/entity/bandScore/bandScore.entity';
import { BandScoreController } from './controller/banScore.controller';
import { BandScoreService } from './service/banScore.service';
import { BandScoreRepository } from './repository/banScore.repository';

@Module({
	imports: [TypeOrmModule.forFeature([BandScoreEntity])],
	controllers: [BandScoreController],
	exports: [BandScoreService, BandScoreRepository],
	providers: [BandScoreService, BandScoreRepository],
})
export class BandScoreModule {}
