import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_collect' })
export class CollectEntity extends BaseEntity {
  @Column({ comment: 'User ID' })
  userId: number;

  @Column({
    default: 1,
    comment:
      'Type of collection, [1: Music, 2: Article, 3: Tool, 4: Navigation, 5: Project]',
  })
  typeId: number;

  @Column({ nullable: true, comment: 'Song ID' })
  mid: number;

  @Column({ nullable: true, comment: 'Article ID' })
  articleId: number;

  @Column({ nullable: true, comment: 'Tool ID' })
  toolId: number;

  @Column({
    nullable: true,
    length: 255,
    comment: 'Cover image of the collected song',
  })
  pic: string;

  @Column({
    nullable: true,
    length: 255,
    comment: "Name of the collected song's album",
  })
  artist: string;

  @Column({
    nullable: true,
    length: 255,
    comment: "Name of the collected song's artist",
  })
  album: string;

  @Column({
    nullable: true,
    length: 255,
    comment: 'Name of the collected song',
  })
  name: string;

  @Column({
    nullable: true,
    default: 0,
    comment: 'Whether it is not deleted (1: deleted)',
  })
  delete: number;
}
