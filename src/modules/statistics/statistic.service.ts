import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../article/article.entity';
import { Repository } from 'typeorm';
import { TypeEntity } from '../type/type.entity';
import { CommentEntity } from '../comment/comment.entity';
import { FriendLinksEntity } from '../friend-links/friend-links.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class StatisticsService {
    constructor(
		@InjectRepository(ArticleEntity)
		private readonly ArticleModel: Repository<ArticleEntity>,
		@InjectRepository(TypeEntity)
		private readonly TypeModel: Repository<TypeEntity>,
		@InjectRepository(CommentEntity)
		private readonly CommentModel: Repository<CommentEntity>,
		@InjectRepository(FriendLinksEntity)
		private readonly FriendLinksModel: Repository<FriendLinksEntity>,
		@InjectRepository(UserEntity)
		private readonly UserModel: Repository<UserEntity>,
	) {}

    //Get the number of articles in each category 
    //i say type or category the same thing :3 
    async typeInfo(){
        const type = await this.TypeModel.find({select : ['id','name' ]})
		const typeIds = type.map((t: any) => t.id);
        const task=[];
        typeIds.forEach((id)=>task.push(this.ArticleModel.count({where : {typeId : id}})));
		const articleNumsMap = await Promise.all(task);
        type.forEach((type:any , i )=>(type.nums=articleNumsMap[i]))
        return type;
    }
}