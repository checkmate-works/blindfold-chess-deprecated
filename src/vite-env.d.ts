/// <reference types="vite/client" />

// マークダウンファイルの型定義
declare module "*.md?raw" {
  const content: string;
  export default content;
}
