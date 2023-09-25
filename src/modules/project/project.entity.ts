import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity/baseEntity';

@Entity({ name: 'tb_project' })
export class ProjectEntity extends BaseEntity {
  @Column({ comment: 'Sorting ID' })
  orderId: number;

  @Column({ length: 64, comment: 'Project name' })
  name: string;

  @Column({ comment: 'Project description' })
  desc: string;

  @Column({ comment: 'Background image URL' })
  bgImage: string;

  @Column({ comment: 'Tags, stored with commas separating them' })
  tag: string;

  @Column({ comment: 'Project start time' })
  startTime: Date;

  @Column({ comment: 'Project end time' })
  endTime: Date;

  @Column({ comment: 'Project GitHub URL', nullable: true })
  git: string;

  @Column({ comment: 'Project demo example URL', nullable: true })
  link: string;

  @Column({
    comment:
      'Type: [1: Project, can link to an external site | 2: Internal module in the blog, for 2, it goes to a path within this site]',
    nullable: true,
  })
  type: number;

  @Column({
    comment: 'Path on this site, only available if type == 2',
    nullable: true,
  })
  path: string;

  @Column({
    comment:
      'Whether its a hot/recommended project [1: Recommended | -1: Default]',
    nullable: true,
  })
  hot: number;

  @Column({
    comment: 'Project status [1: Normal | -1: Frozen]',
    nullable: true,
  })
  status: number;
}
