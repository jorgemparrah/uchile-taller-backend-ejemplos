import { Injectable } from '@nestjs/common';

export interface Item {
  name: string;
  category: string;
}

@Injectable()
export class UtilitiesService {
  // Lista en memoria para el ejemplo de filtro
  private items: Item[] = [
    { name: 'Manzana', category: 'fruta' },
    { name: 'Pera', category: 'fruta' },
    { name: 'Zanahoria', category: 'verdura' },
    { name: 'Espinaca', category: 'verdura' },
    { name: 'Leche', category: 'lacteo' },
    { name: 'Queso', category: 'lacteo' },
    { name: 'Pollo', category: 'proteina' },
    { name: 'Atún', category: 'proteina' },
  ];

  sum(a: number, b: number): { a: number; b: number; result: number } {
    return { a, b, result: a + b };
  }

  uppercase(text: string): { original: string; result: string } {
    return { original: text, result: text.toUpperCase() };
  }

  filter(category: string): { category: string; results: Item[] } {
    const results = this.items.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase(),
    );
    return { category, results };
  }
}
