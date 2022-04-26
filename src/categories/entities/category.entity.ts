import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  nome: string;

  @Prop()
  ativo: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
