import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_comment' })
export class CommentEntity extends BaseEntity {
  @Column()
  userId: number;

  @Column({ nullable: true })
  comment: string;
  @Column({ nullable: true })
  upId: number;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  address: string;
}
