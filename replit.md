# Overview

This is an Automation Hub - a static site generator built with Astro that combines automation-focused blog content with a collection of client-side productivity tools. The application is designed for high performance, SEO optimization, and easy deployment to GitHub Pages. It serves as a comprehensive resource for workflow automation guides, tutorials, and practical tools that help users streamline their productivity.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Static Site Generation**: Built on Astro framework for lightning-fast performance and optimal SEO
- **TypeScript Integration**: Full TypeScript support with strict configuration for type safety
- **Component-Based Structure**: Organized component library in `/src/components/` for reusable UI elements
- **Responsive Design**: Tailwind CSS utility-first approach for mobile-responsive layouts

## Content Management System
- **Markdown-Based Blog**: Content stored in `/src/content/blog/` as Markdown files with frontmatter metadata
- **Content Collections**: Astro's content collection system with schema validation for blog posts
- **Frontmatter Schema**: Structured metadata including title, description, date, tags, workflowType, and optional images
- **Static Route Generation**: Dynamic blog post routes generated at build time from Markdown files

## Blog System Features
- **Automation-Focused Content**: Specialized content covering workflow automation, Zapier integrations, smart home setups
- **Recommendation Engine**: Custom algorithm in `/src/utils/recommendations.ts` that suggests related content based on workflow types and tags
- **SEO Optimization**: Comprehensive SEO utilities including structured data generation, canonical URLs, and Open Graph meta tags

## Tools Hub Architecture
- **Client-Side Tools**: Self-contained productivity tools that run entirely in the browser
- **Tool Categories**: Home renovation calculator, CSS generators, image converters, document processors
- **Privacy-First Design**: All tools process data client-side without server communication
- **Modular Implementation**: Each tool as a separate component for easy maintenance and extension

## Styling and Design System
- **Tailwind CSS**: Utility-first CSS framework for consistent, responsive design
- **Global Styles**: Custom typography and prose styles in `/src/styles/global.css`
- **Component Styling**: Scoped styles within components for maintainability
- **Responsive Breakpoints**: Mobile-first design approach with Tailwind's responsive utilities

## Path Resolution and Project Structure
- **TypeScript Path Mapping**: Configured path aliases for clean imports (`@/components/*`, `@/layouts/*`, `@/utils/*`)
- **Organized Directory Structure**: Clear separation of concerns with dedicated folders for content, components, utilities, and layouts
- **Asset Management**: Public assets for images, robots.txt, and static files

# External Dependencies

## Core Framework and Build Tools
- **Astro**: Static site generator framework (v5.13.5) - primary build system
- **TypeScript**: Type-safe development environment (v5.9.2)
- **Tailwind CSS**: Utility-first CSS framework (v3.4.17) with Astro integration
- **Node.js**: Runtime environment with TypeScript definitions

## Content Processing
- **Astro Content Collections**: Built-in content management system for Markdown processing
- **Frontmatter Validation**: Schema-based validation using Zod through Astro's content system
- **Markdown Rendering**: Astro's built-in Markdown to HTML compilation

## Development and Deployment
- **GitHub Pages**: Target deployment platform for static hosting
- **GitHub Actions**: Automated deployment pipeline (mentioned in README)
- **SEO Tools**: Custom utilities for meta tag generation, structured data, and sitemap creation

## Browser APIs and Client-Side Features
- **File API**: For client-side file processing in conversion tools
- **Canvas API**: For image manipulation in PNG to JPG converter
- **Local Storage**: For saving user preferences and tool settings
- **Intersection Observer**: For performance optimizations and lazy loading

## Search Engine Optimization
- **robots.txt**: Search engine crawling directives
- **Structured Data**: Schema.org JSON-LD implementation for rich snippets
- **Open Graph**: Social media sharing optimization
- **Sitemap Generation**: Automatic sitemap creation for search engines