import { Category, CategoryProvider } from 'typescript-logging-category-style';

const provider = CategoryProvider.createProvider('Convrtx');

export function getLogger(name: string): Category {
  return provider.getCategory(name);
}