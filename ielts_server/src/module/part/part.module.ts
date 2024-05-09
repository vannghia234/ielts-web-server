import { Module, forwardRef } from '@nestjs/common';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { Part } from 'src/lib/entity/part/Part.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupQuestionModule } from '../group-question/group-question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Part])],
  controllers: [PartController],
  providers: [PartService],
  exports: [PartService],
})
export class PartModule {}
