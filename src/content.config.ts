import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(70, 'Keep titles under 70 chars to avoid SERP truncation'),
			description: z.string().min(120).max(170, 'Meta descriptions perform best at 120-170 chars'),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			author: z.string().default('Sanchit'),
			keywords: z.array(z.string()).default([]),
			faq: z
				.array(
					z.object({
						q: z.string(),
						a: z.string(),
					}),
				)
				.default([]),
		}),
});

export const collections = { blog };
