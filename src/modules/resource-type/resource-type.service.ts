import { Repository, In } from 'typeorm';
import { ResourceTypeEntity } from './resource-type.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceEntity } from '../ressource/ressource.entity';

@Injectable()
export class ResourceTypeService {
  constructor(
    @InjectRepository(ResourceTypeEntity)
    private readonly ResourceTypeModel: Repository<ResourceTypeEntity>,
    @InjectRepository(ResourceEntity)
    private readonly ResourceModel: Repository<ResourceEntity>,
  ) {}

  async set(params) {
    const { name, status, orderId, id } = params;
    const data: any = { name, orderId, status };
    const r = await this.ResourceTypeModel.findOne({ where: { name } });
    //create one
    if (r) {
      return await this.ResourceTypeModel.update({ id: r.id }, data);
    }
    //update one
    if (id) {
      return await this.ResourceModel.update({ id }, data);
    }
    const res = await this.ResourceModel.query(
      `select max(orderId) as max_order from tb_resource_type `,
    );
    let { max_order } = res[0];
    max_order = max_order > 0 ? max_order : 1;
    data.orderId = orderId ? orderId : max_order + 10;
    return await this.ResourceTypeModel.save(data);
  }

  async query(params) {
    const { page = 1, pageSize = 10 } = params;
    const rows = await this.ResourceTypeModel.find({
      order: { id: 'ASC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      cache: true,
    });
    const ids = rows.map((t) => t.id);
    const res: any = await this.ResourceModel.find({
      where: { resourceId: In(ids) },
    });
    rows.forEach(
      (t: any) =>
        (t.resource_num = res.filter((k) => k.resourceId === t.id).length),
    );
    const count = await this.ResourceTypeModel.count();
    return { rows, count };
  }

  async queryAll(params) {
    const rows = await this.ResourceTypeModel.find({
      order: { orderId: 'ASC' },
      where: { status: 1 },
      cache: true,
    });
    const resourceIds = rows.map((t) => t.id);
    const res: any = await this.ResourceModel.find({
      where: { resourceId: In(resourceIds) },
    });
    rows.forEach(
      (t: any) => (t.resource = res.filter((k) => k.resourceId == t.id)),
    );
    const count = await this.ResourceTypeModel.count();
    return { rows, count };
  }

  async del(params) {
    const { id } = params;
    const count = await this.ResourceModel.count({ where: { resourceId: id } });

    if (count > 0) {
      throw new HttpException(
        'The current category is in use!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const r = await this.ResourceTypeModel.findOne({ where: { id } });

    if (!r) {
      throw new HttpException(
        'Invalid operation, category does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.ResourceTypeModel.delete({ id });
  }
}
