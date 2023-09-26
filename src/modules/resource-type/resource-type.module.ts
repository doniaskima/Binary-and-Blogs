import { ResourceTypeEntity } from './resource-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResourceEntity } from '../ressource/ressource.entity';
import { ResourceTypeService } from './resource-type.service';
import { ResourceTypeController } from './resource-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceTypeEntity, ResourceEntity])],
  controllers: [ResourceTypeController],
  providers: [ResourceTypeService],
})
export class ResourceTypeModule {}
