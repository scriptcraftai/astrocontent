// src/paths.ts

// Keep in sync with astro.config.mjs
const repoName = "astrocontent"; 
const isGitHubPages = import.meta.env.MODE === "production";

const base = isGitHubPages ? `/${repoName}/` : "/";

const paths = {
  home: base,
  blog: base + "blog",
  tools: base + "tools",
  about: base + "about",
  contact: base + "contact",
};

export default paths;
