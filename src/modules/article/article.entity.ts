import { BaseEntity } from 'src/common/entity/baseEntity';
import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'tb_article' })
export class ArticleEntity extends BaseEntity {
  @Column({ length: 32, unique: true, comment: 'Article title' })
  title: string;

  @Column({ length: 300, comment: 'Article description' })
  desc: string;

  @Column({ type: 'text', comment: 'Article content' })
  content: string;

  @Column({ comment: 'status' })
  status: number;

  @Column({ comment: 'User Id' })
  userId: number;

  @Column({ comment: 'Category Id' })
  typeId: number;

  @Column({ comment: 'Tag Id , coma-seprated' })
  tagId: string;

  @Column({ comment: 'Article cover image' })
  coverImg: string;

  @Column({ nullable: true, comment: 'Sort ID' })
  orderId: number;

  @Column({ length: 300, nullable: true, comment: 'Background music' })
  bgMusic: string;

  @Column({ nullable: true, default: 0, comment: 'Read volume' })
  readVolume: number;

  @Column({ nullable: true, default: 0, comment: 'Number of collectors' })
  collectionVolume: number;

  @Column({ nullable: true, default: 1, comment: 'Display layout mode' })
  layoutMode: number;

  @Column({
    nullable: true,
    default: 1,
    comment: 'Whether to autoplay background music. 1: yes, others: no',
  })
  autoPlay: number;
  
  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
