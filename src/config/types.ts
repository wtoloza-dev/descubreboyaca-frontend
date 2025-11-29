/**
 * Config Types
 * 
 * Common interface for all environment configurations.
 * This ensures all environments have the same structure.
 */

export interface Config {
  /** Backend API base URL */
  apiUrl: string;
  
  // Add more properties here as needed:
  // frontendUrl: string;
  // enableAnalytics: boolean;
  // maxUploadSizeMB: number;
}

