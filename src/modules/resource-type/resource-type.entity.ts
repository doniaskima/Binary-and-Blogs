import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_resource_type' })
export class ResourceTypeEntity extends BaseEntity {
  @Column({ unique: true })
  orderId: number;

  @Column({ length: 16 })
  name: string;

  @Column({ default: 1 })
  status: number;
}
