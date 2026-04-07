import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class DefineDto {
  @ApiProperty({
    example: 'recursión',
    description: 'Palabra o concepto a definir',
  })
  @IsString({ message: 'La palabra debe ser texto.' })
  @MinLength(2, { message: 'La palabra debe tener al menos 2 caracteres.' })
  word: string;
}
