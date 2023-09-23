import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_verify' })
export class VerifyEntity extends BaseEntity {
  @Column({ length: 30 })
  code: string;

  @Column({ length: 64 })
  email: string;

  @Column({ default: 0 })
  errorNum: number;

  @Column({ length: 64 })
  expirationTime: string;

  @Column({ length: 30 })
  type: string;
}
