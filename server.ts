import { CommonEngine } from '@angular/ssr';
import { dirname, join, resolve } from 'path';
import { readFileSync } from 'fs';
import bootstrap from './src/main.server';

// Create a CommonEngine instance
const commonEngine = new CommonEngine();

// Define the paths
const serverDistFolder = resolve(__dirname, '../browser');
const indexHtml = join(serverDistFolder, 'index.html');

// Render the Angular application for each request
function renderAngularApp(url: string): Promise<string> {
  return commonEngine.render({
    bootstrap,
    documentFilePath: indexHtml,
    url,
    providers: [],
  });
}

// Export the function to handle SSR
export default async function app(url: string): Promise<string> {
  try {
    const html = await renderAngularApp(url);
    return html;
  } catch (error) {
    console.error('Error rendering Angular app:', error);
    throw error;
  }
}
