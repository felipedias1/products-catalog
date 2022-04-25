import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  nome: string;

  @Prop()
  quantidade: number;

  @Prop()
  ativo: number;

  @Prop()
  categoria_id: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
