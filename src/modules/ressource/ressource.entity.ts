import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_resource' })
export class ResourceEntity extends BaseEntity {
  @Column({ nullable: true, comment: 'Sorting ID' })
  orderId: number;

  @Column({ length: 32, comment: 'Resource Name' })
  name: string;

  @Column({ comment: 'Resource Description' })
  desc: string;

  @Column({ nullable: true, comment: 'Resource Logo' })
  logo: string;

  @Column({ comment: 'Resource Address' })
  url: string;

  @Column({ comment: 'Resource Category ID' })
  resourceId: number;
}
