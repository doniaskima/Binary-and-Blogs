
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessageEntity } from '../chat/message.entity';
import { UserEntity } from '../user/user.entity';
import { StatisticsController } from './statistic.controller';
import { StatisticsService } from './statistic.service';
import { ArticleEntity } from '../article/article.entity';
import { CommentEntity } from '../comment/comment.entity';
import { TypeEntity } from '../type/type.entity';
import { FriendLinksEntity } from '../friend-links/friend-links.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ArticleEntity, CommentEntity, MessageEntity, TypeEntity, FriendLinksEntity, UserEntity]),
	],
	controllers: [StatisticsController],
	providers: [StatisticsService],
})
export class StatisticsModule {}
