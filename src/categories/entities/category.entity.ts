import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  @ApiProperty()
  nome: string;

  @Prop()
  @ApiProperty()
  ativo: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
