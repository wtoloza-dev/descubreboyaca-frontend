/**
 * Config Manager
 *
 * Singleton configuration based on SCOPE environment variable.
 * Initialized once when first imported.
 * Default: local
 */

import type { Config } from './types';
import { localConfig } from './local.config';
import { developmentConfig } from './development.config';
import { testConfig } from './test.config';
import { productionConfig } from './production.config';

type Scope = 'local' | 'development' | 'test' | 'production';

/**
 * All environment configurations
 */
const configs: Record<Scope, Config> = {
  local: localConfig,
  development: developmentConfig,
  test: testConfig,
  production: productionConfig,
};

/**
 * Current scope from environment
 */
const scope = (process.env.SCOPE || 'local') as Scope;

/**
 * Application configuration (singleton)
 *
 * Initialized once based on SCOPE environment variable.
 *
 * @example
 * ```typescript
 * import { config } from '@/config';
 * console.log(config.apiUrl); // http://localhost:8000
 * ```
 */
export const config = configs[scope];

// Re-export types
export type { Config } from './types';
