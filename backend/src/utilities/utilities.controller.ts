import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UtilitiesService } from './utilities.service';

@ApiTags('utilidades')
@Controller('utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Get('sum')
  @ApiOperation({ summary: 'Sumar dos números' })
  @ApiQuery({ name: 'a', type: Number, example: 5 })
  @ApiQuery({ name: 'b', type: Number, example: 3 })
  @ApiResponse({ status: 200, description: 'Resultado de la suma' })
  sum(@Query('a') a: string, @Query('b') b: string) {
    const numA = Number(a);
    const numB = Number(b);
    if (isNaN(numA) || isNaN(numB)) {
      throw new BadRequestException('Los parámetros a y b deben ser números. Ejemplo: /utilities/sum?a=5&b=3');
    }
    return this.utilitiesService.sum(numA, numB);
  }

  @Get('uppercase')
  @ApiOperation({ summary: 'Convertir texto a mayúsculas' })
  @ApiQuery({ name: 'text', type: String, example: 'hola mundo' })
  @ApiResponse({ status: 200, description: 'Texto convertido a mayúsculas' })
  uppercase(@Query('text') text: string) {
    return this.utilitiesService.uppercase(text ?? '');
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filtrar lista de ítems por categoría' })
  @ApiQuery({
    name: 'category',
    type: String,
    example: 'fruta',
    description: 'Categorías disponibles: fruta, verdura, lacteo, proteina',
  })
  @ApiResponse({ status: 200, description: 'Ítems que coinciden con la categoría' })
  filter(@Query('category') category: string) {
    return this.utilitiesService.filter(category ?? '');
  }
}
