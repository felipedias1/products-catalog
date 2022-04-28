import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ExportCategoryFiles {
  @Prop()
  @ApiProperty()
  message: string;
}
