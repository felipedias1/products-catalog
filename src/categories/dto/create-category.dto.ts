import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  nome: string;

  @IsNumber()
  ativo: number;
}
