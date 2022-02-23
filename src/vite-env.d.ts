/// <reference types="svelte" />
/// <reference types="vite/client" />

// svelte.d.ts
declare module "*.svelte" {
  const value: any; // Add better type definitions here if desired.
  export default value;
}
