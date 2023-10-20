import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tb_comment' })
export class CommentEntity extends BaseEntity {
	@Column()
	userId: number;

	@Column()
	comment: string;

	@Column({ nullable: true })
	articleId: number;

	@Column({ nullable: true })
	upId: number; //upward comment or parent comment

	@Column({ nullable: true })
	ip: string;

	@Column({ nullable: true })
	address: string;
}
