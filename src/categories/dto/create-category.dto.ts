import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsNumber()
  @ApiProperty()
  ativo: number;
}
