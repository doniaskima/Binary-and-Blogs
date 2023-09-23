import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity({ name: 'tb_user' })
export class UserEntity extends BaseEntity {
  @Column({ length: 12 })
  username: string;

  @Column({ length: 12 })
  nickname: string;

  @Column({ length: 1000 })
  password: string;

  @Column({ default: 1 })
  status: number;

  @Column({ default: 1 })
  sex: number;

  @Column({ nullable: true })
  roomId: number;

  @Column({ length: 64, unique: true })
  email: string;

  @Column({ length: 600, nullable: true })
  avatar: string;

  @Column({ length: 10, default: 'viewer' })
  role: string;

  @Column({ length: 255, nullable: true })
  roomBg: string;

  @Column({
    length: 255,
    default: 'Everyone has a signature, and I hope you do too...',
  })
  sign: string;

  @OneToMany(() => ArticleEntity, (article) => article.title)
  @JoinColumn({ name: 'nickname' })
  articles: ArticleEntity[];
}
