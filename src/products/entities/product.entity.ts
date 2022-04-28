import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  @ApiProperty()
  nome: string;

  @Prop()
  @ApiProperty()
  quantidade: number;

  @Prop()
  @ApiProperty()
  ativo: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @ApiProperty()
  categoriaId: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
