/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TENANT_ID?: string;
  // add more env vars as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 