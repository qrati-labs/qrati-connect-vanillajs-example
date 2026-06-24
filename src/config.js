export const ORGANIZATION_ID =
  import.meta.env.VITE_ORGANIZATION_ID || '69ad9c7876d8bf6f864b3a65';

export const EMBED_URL =
  import.meta.env.VITE_QRATI_EMBED_URL ||
  'https://cdn.jsdelivr.net/npm/@qratilabs/qrati-connect/embed/embed.js';

// Demo-login endpoint for orgs with custom auth. Leave empty to skip the call.
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '';

export const GITHUB_ORG = 'qrati-labs';
export const REPO = 'qrati-connect-vanillajs-example';
