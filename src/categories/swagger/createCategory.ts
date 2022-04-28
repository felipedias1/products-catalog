import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CreateCategory extends Category {
  @Prop()
  @ApiProperty()
  _id: string;

  @Prop()
  @ApiProperty()
  __v: number;
}
