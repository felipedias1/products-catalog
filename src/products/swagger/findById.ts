import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class FindProductById extends Product {
  @Prop()
  @ApiProperty()
  _id: string;

  @Prop()
  @ApiProperty()
  __v: number;
}
