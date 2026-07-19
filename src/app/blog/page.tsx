import Parser from 'rss-parser';
import { Newspaper, ArrowUpRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import BlogHeader from '@/components/ui/blog-header';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

const WP_FEED = 'https://wp.glassgallery.my.id/feed/';
const WP_BASE = 'https://wp.glassgallery.my.id';
const APEX_BASE = 'https://glassgallery.my.id';

const parser = new Parser();

type Post = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  creator?: string;
  categories?: string[];
};

async function getBlogPosts(): Promise<Post[]> {
  try {
    const feed = await parser.parseURL(WP_FEED);
    return feed.items.map(item => ({
      title: item.title || 'Untitled',
      link: item.link || '#',
      pubDate: item.pubDate || '',
      contentSnippet: (item.contentSnippet || '').substring(0, 200),
      creator: (item as any).creator || (item as any)['dc:creator'] || 'Azzar Budiyanto',
      categories: item.categories || [],
    }));
  } catch (error) {
    console.error('Error fetching blog feed:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getBlogPosts();
  const title = 'Blog — Wong Edan\'s by Azzar | IoT, Infrastructure & Engineering';
  const description = 'Essays on infrastructure, IoT, networking, and the messy edges between bits and atoms. Written by Azzar Budiyanto on Wong Edan\'s.';
  return {
    title,
    description,
    keywords: ['Azzar Budiyanto', 'Wong Edan', 'IoT', 'Infrastructure', 'Networking', 'Embedded Systems', 'DevOps'],
    authors: [{ name: 'Azzar Budiyanto', url: `${APEX_BASE}/about` }],
    creator: 'Azzar Budiyanto',
    publisher: 'Azzar Budiyanto',
    alternates: {
      canonical: `${APEX_BASE}/blog`,
      types: { 'application/rss+xml': WP_FEED },
    },
    openGraph: {
      type: 'website',
      url: `${APEX_BASE}/blog`,
      siteName: 'Azzar Budiyanto Portfolio',
      title,
      description,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@siapa_hayosiapa',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

function buildItemListJsonLd(posts: Post[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${APEX_BASE}/blog#itemlist`,
    name: 'Wong Edan\'s — Essays by Azzar Budiyanto',
    description: 'Curated index of long-form articles on infrastructure, IoT, and engineering.',
    url: `${APEX_BASE}/blog`,
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: p.link,
      name: p.title,
    })),
  });
}

function buildBlogPersonJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${APEX_BASE}/#person`,
    name: 'Azzar Budiyanto',
    url: `${APEX_BASE}/about`,
    sameAs: [
      'https://github.com/1999azzar',
      'https://www.linkedin.com/in/azzar-budiyanto/',
      'https://x.com/siapa_hayosiapa',
      'https://medium.com/@azzar_budiyanto',
      'https://orcid.org/0009-0003-6856-7820',
      'https://www.instagram.com/azzar_budiyanto/',
      'https://devpost.com/1999AZZAR',
      'https://www.youtube.com/channel/UCZjCSB4jkUY06-Nh0B2_VHw',
      'https://gist.github.com/1999AZZAR',
    ],
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const itemListJsonLd = buildItemListJsonLd(posts);
  const personJsonLd = buildBlogPersonJsonLd();

  return (
    <main className="page-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: itemListJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd }} />

      <BlogHeader />

      <p className="text-sm-body mb-10 max-w-2xl">
        Excerpts of long-form essays by{' '}
        <Link href="/about" className="text-accent hover:underline">Azzar Budiyanto</Link>.
        Full articles on{' '}
        <a href={WP_BASE} target="_blank" rel="noopener noreferrer me" className="text-accent hover:underline">
          Wong Edan&apos;s ↗
        </a>.
      </p>

      {posts.length === 0 ? (
        <div className="card-surface p-12 text-center">
          <Newspaper size={32} className="mx-auto mb-4 text-text/30" strokeWidth={1.5} />
          <p className="text-sm-body text-text/50">
            No articles yet. Visit{' '}
            <a href={WP_FEED} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{WP_FEED}</a>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post, index) => (
            <a key={index} href={post.link} target="_blank" rel="noopener noreferrer me"
              className="card-surface p-7 flex flex-col justify-between min-h-[260px] group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="mono-meta text-accent">#{String(index + 1).padStart(2, '0')}</span>
                  <ArrowUpRight size={16} className="text-text/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={1.5} />
                </div>
                <h3 className="heading-md !text-base group-hover:text-accent transition-colors mb-3">{post.title}</h3>
                <p className="text-sm-body text-text/60">
                  {post.contentSnippet}{post.contentSnippet.length >= 200 ? '…' : ''}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="mono-meta text-[0.55rem] flex items-center gap-1.5">
                  <Calendar size={10} />
                  {post.pubDate ? new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                </span>
                <span className="mono-meta text-[0.5rem]">wong edan&apos;s</span>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-sm-body text-text/50">
          Subscribe: <a href={WP_FEED} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">RSS feed</a> · <a href={WP_BASE} target="_blank" rel="noopener noreferrer me" className="text-accent hover:underline">Full archive</a>
        </p>
        <p className="mono-meta text-[0.55rem]">{posts.length} articles</p>
      </div>
    </main>
  );
}
