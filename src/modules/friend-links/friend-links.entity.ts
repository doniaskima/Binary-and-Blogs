import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_friend_links' })
export class FriendLinksEntity extends BaseEntity {
  @Column()
  orderId: number;

  @Column({ length: 64 })
  name: string;

  @Column()
  desc: string;

  @Column()
  avatar: string;

  @Column()
  url: string;

  @Column()
  status: number;
}
