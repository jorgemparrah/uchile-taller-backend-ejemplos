import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefineDto } from './dto/define.dto';
import { AiService } from './ai.service';

@ApiTags('ia')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('define')
  @ApiOperation({
    summary: 'Definir una palabra usando IA',
    description:
      'Recibe una palabra y devuelve una definición breve generada por IA (OpenAI). Requiere OPENAI_API_KEY en .env; opcional OPENAI_MODEL (por defecto gpt-4o-mini).',
  })
  @ApiResponse({ status: 201, description: 'Definición generada por IA' })
  define(@Body() dto: DefineDto) {
    return this.aiService.define(dto.word);
  }
}
