import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nome: string;

  @IsNumber()
  quantidade: number;

  @IsNumber()
  ativo: number;

  @IsMongoId()
  categoriaId: string;
}
