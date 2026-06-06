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
      types: {
        'application/rss+xml': WP_FEED,
      },
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
  const list = {
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
  };
  return JSON.stringify(list);
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
    <main className="min-h-screen pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personJsonLd }}
      />

      <BlogHeader />

      <p className="text-sm font-bold italic text-muted-foreground uppercase tracking-wider mb-12 max-w-3xl">
        Excerpts of long-form essays by{' '}
        <Link href="/about" className="text-accent hover:underline">Azzar Budiyanto</Link>.
        Full articles live on{' '}
        <a
          href={WP_BASE}
          target="_blank"
          rel="noopener noreferrer me"
          className="text-accent hover:underline"
        >
          Wong Edan's ↗
        </a>
        . Updated hourly.
      </p>

      {posts.length === 0 ? (
        <div className="border-4 border-dashed border-foreground/20 p-12 text-center">
          <Newspaper size={48} className="mx-auto mb-4 text-muted-foreground" strokeWidth={2} />
          <p className="text-sm font-bold italic text-muted-foreground uppercase tracking-wider">
            No articles yet. Check back soon, or visit the source feed at{' '}
            <a href={WP_FEED} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              {WP_FEED}
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer me"
              className="group bg-card border-4 border-foreground p-8 shadow-[12px_12px_0px_0px_rgba(42,37,32,1)] flex flex-col justify-between min-h-[300px] hover:-translate-y-1 hover:shadow-[16px_16px_0px_0px_rgba(139,26,26,1)] transition-all duration-200"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-black italic text-accent">
                    #{(index + 1).toString().padStart(2, '0')}
                  </span>
                  <ArrowUpRight size={32} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4 leading-tight">
                  {post.title}
                </h3>
                <p className="text-xs font-bold text-muted-foreground uppercase italic leading-relaxed">
                  {post.contentSnippet}
                  {post.contentSnippet.length >= 200 ? '…' : ''}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t-2 border-foreground/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase italic text-accent flex items-center gap-2">
                  <Calendar size={12} strokeWidth={3} />
                  {post.pubDate ? new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                </span>
                <span className="text-[10px] font-black uppercase italic text-muted-foreground tracking-wider">
                  wong edan's ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-24 pt-12 border-t-2 border-foreground/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="text-xs font-bold italic text-muted-foreground uppercase tracking-wider">
          Subscribe: <a href={WP_FEED} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">RSS feed</a> · <a href={WP_BASE} target="_blank" rel="noopener noreferrer me" className="text-accent hover:underline">Full archive</a>
        </p>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} · canonical: {WP_BASE}
        </p>
      </div>
    </main>
  );
}
