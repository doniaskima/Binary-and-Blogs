import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class ProjectDto {
  @IsNotEmpty({ message: 'Project name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'background image URL cannot be empty' })
  bgImage: string;

  @IsNotEmpty({ message: 'Please provide a brief project description' })
  desc: string;

  @IsNotEmpty({ message: 'Project tags cannot be empty' })
  tag: string;

  @IsNotEmpty({ message: 'Project start date cannot be empty' })
  startTime: string;

  @IsNotEmpty({ message: 'Project end date cannot be empty' })
  endTime: string;

  git: string;

  @IsOptional()
  @IsEnum([1, -1], { message: 'Incorrect parameter for hot' })
  @Type(() => Number)
  hot: number;

  @IsEnum([1, 2], { message: 'Incorrect parameter for project type' })
  @Type(() => Number)
  type: number;

  @IsOptional()
  @IsEnum([1, -1], { message: 'Incorrect parameter for status' })
  @Type(() => Number)
  status: number;

  orderId: number;
}

export class ProjectSetDto {
  id: number;
  @ValidateNested()
  @Type(() => ProjectDto)
  data: ProjectDto;
}
