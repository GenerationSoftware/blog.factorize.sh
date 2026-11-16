# Factorize Blog

The public blog at https://blog.factorize.sh. Built with Astro, MDX, and
Shiki syntax highlighting, and deployed as a static Cloudflare Pages site.

## Develop

Use Node 24.12.0 and npm 11.19.0.

```sh
npm ci
npm run dev
npm test
```

`npm test` checks Astro/TypeScript, builds the site, and verifies rendered MDX,
Shiki output, published links, RSS, and draft exclusion.

## Write a post

Add a Markdown or MDX file to `src/content/posts/`. Its filename becomes its URL:
`your-post.mdx` is served at `/your-post/`.

```yaml
---
title: "Your post title"
description: "A short description for the index, RSS, and link previews."
pubDate: 2026-11-16
author: "Factorize"
category: "Engineering"
draft: false
---
```

`title`, `description`, and `pubDate` are required. Author defaults to Factorize,
category defaults to Notes, and draft defaults to false. Drafts and future-dated
posts are excluded from routes, the index, RSS, and sitemap. Future posts appear
after a rebuild on or after their publication date.

Use fenced code blocks with a language (`js`, `typescript`, `bash`, etc.) for
Shiki highlighting. MDX extends the shared Markdown configuration. You can
import Astro components, as demonstrated by `Note.astro` in the welcome post.
The hidden `draft-example.mdx` is an authoring starting point.

## Hosting

Repository: `GenerationSoftware/blog.factorize.sh`.
Cloudflare Pages project: `factorize-blog`. Production branch: `main`.
Build command: `npm run build`. Output directory: `dist`. Root directory: `/`.
Custom domain: `blog.factorize.sh`. Git integration is configured for production
and branch preview builds. A deployment can also be triggered through the
Cloudflare Pages dashboard or deployment API if the GitHub push hook is unavailable.

The marketing site is maintained separately in `GenerationSoftware/Factorize.sh`.
Its Blog navigation link points here. The app and documentation hosting are separate.
