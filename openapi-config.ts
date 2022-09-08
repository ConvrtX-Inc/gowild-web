import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:3001/docs-json',
  apiFile: './src/lib/api/empty.api.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/lib/api/go-wild.api.ts',
  exportName: 'goWildApi',
  hooks: true
};

export default config;
