/**
 * Format a date for display in a human-readable format
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Generate a canonical URL for a given path
 * @param path - The path to generate URL for
 * @param site - The base site URL
 * @returns Complete canonical URL
 */
export function generateCanonicalURL(path: string, site: string): string {
  return new URL(path, site).toString();
}

/**
 * Generate Open Graph image URL
 * @param imagePath - Path to the image
 * @param site - The base site URL
 * @returns Complete image URL
 */
export function generateOGImageURL(imagePath: string | undefined, site: string): string {
  if (!imagePath) {
    return new URL('/og-default.png', site).toString();
  }
  return new URL(imagePath, site).toString();
}

/**
 * Generate structured data for blog posts
 * @param post - Blog post data
 * @param site - The base site URL
 * @returns JSON-LD structured data object
 */
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  date: string;
  image?: string;
  slug: string;
}, site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Automation Hub",
      "url": site
    },
    "publisher": {
      "@type": "Organization",
      "name": "Automation Hub",
      "url": site,
      "logo": {
        "@type": "ImageObject",
        "url": new URL('/logo.png', site).toString()
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": new URL(`/blog/${post.slug}`, site).toString()
    },
    "image": post.image ? new URL(post.image, site).toString() : new URL('/og-default.png', site).toString()
  };
}

/**
 * Generate structured data for software applications (tools)
 * @param tool - Tool information
 * @param site - The base site URL
 * @returns JSON-LD structured data object
 */
export function generateSoftwareApplicationSchema(tool: {
  name: string;
  description: string;
  category: string;
  url: string;
}, site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "applicationCategory": tool.category,
    "operatingSystem": "Web Browser",
    "url": new URL(tool.url, site).toString(),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Automation Hub",
      "url": site
    },
    "browserRequirements": "Requires JavaScript. Modern web browser required.",
    "permissions": "No special permissions required"
  };
}

/**
 * Generate FAQ schema for a list of questions and answers
 * @param faqs - Array of FAQ objects
 * @returns JSON-LD structured data object
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, '') // Strip HTML tags
      }
    }))
  };
}

/**
 * Generate breadcrumb structured data
 * @param breadcrumbs - Array of breadcrumb items
 * @param site - The base site URL
 * @returns JSON-LD structured data object
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  name: string;
  url: string;
}>, site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": new URL(crumb.url, site).toString()
    }))
  };
}

/**
 * Generate website schema for the homepage
 * @param site - The base site URL
 * @returns JSON-LD structured data object
 */
export function generateWebsiteSchema(site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Automation Hub",
    "description": "Discover automation workflows and free tools to boost your productivity. Learn Zapier, home automation, and use our calculators, converters, and generators.",
    "url": site,
    "publisher": {
      "@type": "Organization",
      "name": "Automation Hub",
      "url": site
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${site}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Extract keywords from text for meta tags
 * @param text - Text to extract keywords from
 * @param maxKeywords - Maximum number of keywords to return
 * @returns Array of keywords
 */
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  // Simple keyword extraction - in a real app, you might use a more sophisticated algorithm
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 3) // Filter short words
    .filter(word => !['this', 'that', 'with', 'have', 'will', 'from', 'they', 'been', 'said', 'each', 'which', 'their', 'time', 'would', 'there', 'could', 'other'].includes(word)); // Filter common stop words

  // Count word frequency
  const wordCounts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort by frequency and return top keywords
  return Object.entries(wordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Generate meta description from content
 * @param content - Content to generate description from
 * @param maxLength - Maximum length of description
 * @returns Meta description string
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove HTML tags and extra whitespace
  const cleanContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  
  if (lastSentence > maxLength * 0.7) {
    return cleanContent.substring(0, lastSentence + 1);
  }

  // If no good sentence break, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return cleanContent.substring(0, lastSpace) + '...';
}

/**
 * Generate slug from title
 * @param title - Title to convert to slug
 * @returns URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Validate and clean URL
 * @param url - URL to validate
 * @returns Clean, valid URL or null if invalid
 */
export function validateURL(url: string): string | null {
  try {
    const validURL = new URL(url);
    return validURL.toString();
  } catch {
    return null;
  }
}
