import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_type' })
export class TypeEntity extends BaseEntity {
  @Column({ length: 16, unique: true })
  name: string;

  @Column({ length: 16 })
  value: string;

  @Column({ length: 30 })
  desc: string;
}
