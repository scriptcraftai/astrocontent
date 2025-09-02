// src/paths.ts

// Automatically detect GitHub Pages repo name as base path
const repoName = "astrocontent"; // Change ONLY if repo name changes
const isGitHubPages = import.meta.env.MODE === "production";

const base =
  isGitHubPages ? `/${repoName}/` : "/";

const paths = {
  home: base,
  blog: base + "blog",
  tools: base + "tools",
  about: base + "about",
  contact: base + "contact",
};

export default paths;
