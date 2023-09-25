import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly ProjectModel: Repository<ProjectEntity>,
  ) {}

  async set(params) {
    const { data, id } = params;
    if (id) {
      return await this.ProjectModel.update({ id }, data);
    }
    const res = await this.ProjectModel.query(
      `select max(orderId) as max_order from tb_project`,
    );
    let { max_order } = res[0];
    max_order = max_order > 0 ? max_order : 1;
    data.orderId = data.orderId ? data.orderId : max_order + 10;
    return await this.ProjectModel.save(data);
  }
}
