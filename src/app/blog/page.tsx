import Parser from 'rss-parser';
import { Newspaper, ArrowUpRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600; // revalidate every hour
export const dynamic = 'force-dynamic';

const parser = new Parser();

async function getBlogPosts() {
  try {
    const feed = await parser.parseURL('https://wp.glassgallery.my.id/feed/');
    return feed.items.map(item => ({
      title: item.title || 'Untitled',
      link: item.link || '#',
      pubDate: item.pubDate || '',
      contentSnippet: (item.contentSnippet || '').substring(0, 200)
    }));
  } catch (error) {
    console.error('Error fetching blog feed:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <section className="mb-24 border-b-[16px] border-foreground pb-16">
        <div className="flex items-center gap-3 text-accent mb-8">
          <Newspaper size={24} strokeWidth={3} />
          <span className="text-xs font-black uppercase tracking-[0.4em] italic underline decoration-4">Editorial_Feed</span>
        </div>
        <h1 className="headline-main mb-12">LATEST<br />THOUGHTS<span className="text-accent">.</span></h1>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {posts.map((post, index) => (
          <a 
            key={index}
            href={post.link}
            target="_blank"
            className="group bg-card border-4 border-foreground p-8 shadow-[12px_12px_0px_0px_rgba(42,37,32,1)] flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-black italic text-accent">#{ (index + 1).toString().padStart(2, '0') }</span>
                <ArrowUpRight size={32} strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">{post.title}</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase italic">{post.contentSnippet}</p>
            </div>
            <div className="mt-8 pt-6 border-t-2 border-foreground/10">
              <span className="text-[10px] font-black uppercase italic text-accent">{post.pubDate}</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
