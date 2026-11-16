import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  return rss({
    title: 'Factorize Blog',
    description: 'Notes on agents, automation, and building software factories.',
    site: context.site!,
    items: (await publishedPosts()).map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      author: post.data.author,
      link: `/${post.id}/`,
    })),
    customData: '<language>en</language>',
  });
}
