import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorCategory {
  @Prop()
  @ApiProperty()
  message: string;

  @Prop()
  @ApiProperty()
  statusCode: number;
}
