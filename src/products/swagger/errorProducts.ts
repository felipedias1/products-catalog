import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorProducts {
  @Prop()
  @ApiProperty()
  message: string;

  @Prop()
  @ApiProperty()
  statusCode: number;
}
