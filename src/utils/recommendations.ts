import type { CollectionEntry } from 'astro:content';

/**
 * Get recommended blog posts based on workflow type and content similarity
 * @param allPosts - All blog posts from the collection
 * @param currentWorkflowType - The workflow type of the current post
 * @param currentSlug - The slug of the current post to exclude from recommendations
 * @returns Array of recommended posts (max 4)
 */
export function getRecommendations(
  allPosts: CollectionEntry<'blog'>[],
  currentWorkflowType: string,
  currentSlug: string
): CollectionEntry<'blog'>[] {
  // Filter out the current post and draft posts
  const eligiblePosts = allPosts.filter(
    post => !post.data.draft && !currentSlug.includes(post.slug)
  );

  // Find posts with the same workflow type
  const sameWorkflowPosts = eligiblePosts.filter(
    post => post.data.workflowType === currentWorkflowType
  );

  // Find posts with related tags
  const currentPost = allPosts.find(post => currentSlug.includes(post.slug));
  const currentTags = currentPost?.data.tags || [];
  
  const relatedTagsPosts = eligiblePosts.filter(post => {
    const commonTags = post.data.tags.filter((tag: string) => currentTags.includes(tag));
    return commonTags.length > 0 && post.data.workflowType !== currentWorkflowType;
  });

  // Combine and prioritize recommendations
  const recommendations: CollectionEntry<'blog'>[] = [];
  
  // Add same workflow type posts first (up to 2)
  recommendations.push(...sameWorkflowPosts.slice(0, 2));
  
  // Add related tag posts to fill remaining slots
  const remainingSlots = 4 - recommendations.length;
  if (remainingSlots > 0) {
    const filteredRelatedPosts = relatedTagsPosts.filter(
      post => !recommendations.some(rec => rec.slug === post.slug)
    );
    recommendations.push(...filteredRelatedPosts.slice(0, remainingSlots));
  }
  
  // If still need more, add recent posts from different workflow types
  if (recommendations.length < 4) {
    const recentPosts = eligiblePosts
      .filter(post => !recommendations.some(rec => rec.slug === post.slug))
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .slice(0, 4 - recommendations.length);
    
    recommendations.push(...recentPosts);
  }

  return recommendations.slice(0, 4);
}

/**
 * Get tool recommendations based on workflow type
 * @param workflowType - The workflow type to match tools against
 * @returns Array of tool recommendations with their URLs and descriptions
 */
export function getToolRecommendations(workflowType: string) {
  const toolMappings: Record<string, Array<{
    name: string;
    url: string;
    description: string;
    relevance: string;
  }>> = {
    'Business Finance': [
      {
        name: 'Home Renovation Calculator',
        url: '/tools/calculator',
        description: 'Calculate project costs and budgets for business expenses',
        relevance: 'Perfect for planning office renovations or space improvements'
      }
    ],
    'Marketing Automation': [
      {
        name: 'CSS Box-Shadow Generator',
        url: '/tools/box-shadow',
        description: 'Create beautiful web elements for marketing campaigns',
        relevance: 'Essential for designing engaging email templates and landing pages'
      },
      {
        name: 'PNG to JPG Converter',
        url: '/tools/converter/png-to-jpg',
        description: 'Optimize images for faster loading marketing materials',
        relevance: 'Reduce file sizes for better email delivery and web performance'
      }
    ],
    'Smart Home': [
      {
        name: 'Home Renovation Calculator',
        url: '/tools/calculator',
        description: 'Plan smart home upgrade costs and ROI calculations',
        relevance: 'Budget for smart home installations and energy efficiency improvements'
      }
    ],
    'Web Development': [
      {
        name: 'CSS Box-Shadow Generator',
        url: '/tools/box-shadow',
        description: 'Generate CSS code for modern web designs',
        relevance: 'Create professional shadows and depth effects for web projects'
      },
      {
        name: 'PNG to JPG Converter',
        url: '/tools/converter/png-to-jpg',
        description: 'Optimize images for web performance',
        relevance: 'Convert and compress images for faster website loading'
      }
    ]
  };

  return toolMappings[workflowType] || [];
}

/**
 * Calculate content similarity score between two posts
 * @param post1 - First post to compare
 * @param post2 - Second post to compare
 * @returns Similarity score between 0 and 1
 */
export function calculateSimilarity(
  post1: CollectionEntry<'blog'>,
  post2: CollectionEntry<'blog'>
): number {
  let score = 0;
  
  // Workflow type match (highest weight)
  if (post1.data.workflowType === post2.data.workflowType) {
    score += 0.5;
  }
  
  // Tag overlap
  const commonTags = post1.data.tags.filter((tag: string) => post2.data.tags.includes(tag));
  const tagSimilarity = commonTags.length / Math.max(post1.data.tags.length, post2.data.tags.length);
  score += tagSimilarity * 0.3;
  
  // Title similarity (basic keyword matching)
  const title1Words = post1.data.title.toLowerCase().split(' ').filter((word: string) => word.length > 3);
  const title2Words = post2.data.title.toLowerCase().split(' ').filter((word: string) => word.length > 3);
  const commonWords = title1Words.filter((word: string) => title2Words.includes(word));
  const titleSimilarity = commonWords.length / Math.max(title1Words.length, title2Words.length);
  score += titleSimilarity * 0.2;
  
  return Math.min(score, 1);
}

/**
 * Get related content suggestions for a specific topic
 * @param topic - The topic to find related content for
 * @param allPosts - All available blog posts
 * @returns Array of related posts
 */
export function getRelatedContentByTopic(
  topic: string,
  allPosts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[] {
  const topicLower = topic.toLowerCase();
  
  return allPosts
    .filter(post => !post.data.draft)
    .filter(post => {
      const titleMatch = post.data.title.toLowerCase().includes(topicLower);
      const tagMatch = post.data.tags.some((tag: string) => tag.toLowerCase().includes(topicLower));
      const workflowMatch = post.data.workflowType.toLowerCase().includes(topicLower);
      
      return titleMatch || tagMatch || workflowMatch;
    })
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 6);
}
