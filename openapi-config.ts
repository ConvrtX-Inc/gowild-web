import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:3001/docs-json',
  apiFile: './src/services/api/empty.api.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/services/api/go-wild.api.ts',
  exportName: 'goWildApi',
  hooks: true
};

export default config;
