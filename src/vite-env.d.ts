/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_UPLOAD_AI_API: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
