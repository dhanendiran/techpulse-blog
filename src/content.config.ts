import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().default('/images/default-blog.svg'),
    author: z.string().default('Dhanendiran M'),
    authorRole: z.string().default('AI Engineer & Tech Analyst'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    hasAffiliateLinks: z.boolean().default(false),
    readingTime: z.string().default('5 min read'),
  }),
});

export const collections = { blog };
