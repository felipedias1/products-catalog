import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  nome: string;

  @Prop()
  quantidade: number;

  @Prop()
  ativo: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoriaId: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
