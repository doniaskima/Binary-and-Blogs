import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_tag' })
export class TagEntity extends BaseEntity {
  @Column({ length: 16, unique: true })
  name: string;
}
