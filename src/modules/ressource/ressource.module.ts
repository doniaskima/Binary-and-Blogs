import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResourceEntity } from './ressource.entity';
import { ResourceTypeEntity } from '../resource-type/resource-type.entity';
import { ResourceService } from './ressource.service';
import { ResourceController } from './ressource.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity, ResourceTypeEntity])],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
