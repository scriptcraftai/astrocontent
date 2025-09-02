import { defineConfig } from "astro/config";

// ⚡ Keep repo name in one place only
const repoName = "astrocontent"; // Change here if repo changes
const isGitHubPages = process.env.NODE_ENV === "production";

// Dynamic base for GitHub Pages vs local dev
const base = isGitHubPages ? `/${repoName}/` : "/";

export default defineConfig({
  base,
  integrations: [],
});
