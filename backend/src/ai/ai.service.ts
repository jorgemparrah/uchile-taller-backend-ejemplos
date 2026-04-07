import { Injectable, Logger } from '@nestjs/common';

const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async define(word: string): Promise<{ word: string; definition: string }> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return {
        word,
        definition:
          '⚠️ Falta configurar OPENAI_API_KEY en el archivo .env para usar este endpoint.',
      };
    }

    const model = process.env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL;

    try {
      const definition = await this.callOpenAiApi(word, apiKey, model);
      return { word, definition };
    } catch (error) {
      this.logger.error('Error al llamar a la API de IA', error);
      return {
        word,
        definition: 'No se pudo obtener una definición en este momento.',
      };
    }
  }

  private async callOpenAiApi(
    word: string,
    apiKey: string,
    model: string,
  ): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Define "${word}" en español en menos de 80 palabras. Solo la definición, sin título ni formato adicional.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      this.logger.warn(`OpenAI error ${response.status}: ${errText}`);
      throw new Error(`API respondió con status ${response.status}`);
    }

    const data = (await response.json()) as {
      choices: { message: { content: string } }[];
    };
    return data.choices[0].message.content.trim();
  }
}
