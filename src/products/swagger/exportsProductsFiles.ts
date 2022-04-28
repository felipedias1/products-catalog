import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ExportFiles {
  @Prop()
  @ApiProperty()
  message: string;
}
