/**
 * Utility functions for handling internal paths in GitHub Pages deployment
 */

// Get the base path from astro config
const basePath = import.meta.env.BASE_URL || '/';

/**
 * Creates a properly prefixed internal link for GitHub Pages
 * @param path - The internal path (e.g., '/blog', '/tools/calculator')
 * @returns - The full path with base URL (e.g., '/astrocontent/blog')
 */
export function createInternalLink(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If we're in development or base is just '/', return the original path
  if (basePath === '/' || import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // For production GitHub Pages, prepend the base path with proper slash
  return `${basePath}/${cleanPath}`;
}

/**
 * Creates a home page link
 */
export function createHomeLink(): string {
  return basePath === '/' ? '/' : basePath;
}
