import { getCollection } from 'astro:content';

export async function publishedPosts() {
  return (await getCollection('posts', ({ data }) => !data.draft && data.pubDate <= new Date()))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id));
}

export const formatDate = (date: Date) => new Intl.DateTimeFormat('en', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
}).format(date);

export const readingTime = (body = '') => Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
