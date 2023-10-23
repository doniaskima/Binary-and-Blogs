
import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { StatisticsService } from './statistic.service';


@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}	
	@Get('/summary')
	Summary(){
		return this.statisticsService.Summary();
	}
	@Get('/typeInfo')
	typeInfo() {
		return this.statisticsService.typeInfo();
	}
}
