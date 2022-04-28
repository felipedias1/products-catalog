import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsNumber()
  @ApiProperty()
  quantidade: number;

  @IsNumber()
  @ApiProperty()
  ativo: number;

  @IsMongoId()
  @ApiProperty()
  categoriaId: string;
}
