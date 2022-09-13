import { LogLevel } from 'typescript-logging';
import { Category, CategoryProvider } from 'typescript-logging-category-style';

const provider = CategoryProvider.createProvider('Convrtx', { level: LogLevel.Debug });

export function getLogger(name: string): Category {
  return provider.getCategory(name);
}
