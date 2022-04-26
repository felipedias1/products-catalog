import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nome: string;

  @IsNumber()
  quantidade: number;

  @IsNumber()
  ativo: number;

  @IsMongoId()
  categoria_id: string;
}
