import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'datetime',
    length: 0,
    nullable: false,
    name: 'createdAt',
    comment: 'Creation Time',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    length: 0,
    nullable: false,
    name: 'updatedAt',
    comment: 'Update Time',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    length: 0,
    nullable: false,
    name: 'deletedAt',
    comment: 'Deletion Time',
  })
  deletedAt: Date;
}
