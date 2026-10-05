import { useEffect, useMemo } from "react";
import { Header, Footer } from "../editorial/SiteChrome";
import { COPY } from "../editorial/copy";
import { cn } from "../lib/utils";
import type { BlogPost } from "./types";
import rawContent from "./generated/content.json";

const CONTENT = rawContent as unknown as Record<string, BlogPost>;
const copy = COPY["zh-CN"];

type BlogEntry = BlogPost & { slug: string };

// 按日期倒序，新文章在前。
const POSTS: BlogEntry[] = Object.entries(CONTENT)
  .map(([slug, post]) => ({ slug, ...post }))
  .sort((a, b) => b.date.localeCompare(a.date));

function currentSlug(): string {
  return window.location.pathname.replace(/^\/blog\/?/, "").replace(/\/+$/, "");
}

function blogHref(slug: string): string {
  return `/blog/${slug}/`;
}

function Tags({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <span className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-mist px-2.5 py-1 text-[13px] leading-none text-muted"
        >
          {tag}
        </span>
      ))}
    </span>
  );
}

function BlogIndex() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">博客</h1>
      <p className="mt-3 text-base leading-7 text-muted">
        版本更新说明、本地推理技术笔记与功能设计背景。
      </p>
      <div className="mt-10 flex flex-col gap-4">
        {POSTS.map((post) => (
          <a
            key={post.slug}
            href={blogHref(post.slug)}
            className="group flex flex-col gap-2.5 rounded-2xl border border-hairline bg-ground p-6 transition-shadow duration-200 hover:shadow-[0_8px_30px_rgb(12_18_34/0.08)]"
          >
            <time
              dateTime={post.date}
              className="tnum font-mono text-[13px] text-muted"
            >
              {post.date}
            </time>
            <span className="text-xl font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
              {post.title}
            </span>
            {post.description ? (
              <span className="text-sm leading-6 text-muted">
                {post.description}
              </span>
            ) : null}
            <Tags tags={post.tags} className="mt-1" />
          </a>
        ))}
      </div>
    </div>
  );
}

function PostView({ post, index }: { post: BlogEntry; index: number }) {
  // POSTS 新在前：上一篇是更早的一篇，下一篇是更新的一篇。
  const prev = POSTS[index + 1];
  const next = POSTS[index - 1];
  const card =
    "group flex flex-col gap-1 rounded-xl border border-hairline bg-ground px-4 py-3 transition-colors duration-200 hover:bg-mist";
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <time
          dateTime={post.date}
          className="tnum font-mono text-[13px] text-muted"
        >
          {post.date}
        </time>
        <Tags tags={post.tags} />
      </div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
        {post.title}
      </h1>
      {post.description ? (
        <p className="mt-3 text-base leading-7 text-muted">
          {post.description}
        </p>
      ) : null}
      <article
        className="docs-prose prose mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <nav
        aria-label="博客文章导航"
        className="mt-14 border-t border-hairline pt-8"
      >
        <a
          href="/blog/"
          className="text-sm text-accent transition-colors duration-200 hover:underline"
        >
          ← 返回博客列表
        </a>
        {prev || next ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <a href={blogHref(prev.slug)} className={card}>
                <span className="text-[13px] text-muted">上一篇</span>
                <span className="text-sm font-medium text-ink group-hover:text-accent">
                  {prev.title}
                </span>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a href={blogHref(next.slug)} className={cn(card, "sm:text-right")}>
                <span className="text-[13px] text-muted">下一篇</span>
                <span className="text-sm font-medium text-ink group-hover:text-accent">
                  {next.title}
                </span>
              </a>
            ) : null}
          </div>
        ) : null}
      </nav>
    </div>
  );
}

export function BlogApp() {
  const slug = useMemo(currentSlug, []);
  const index = POSTS.findIndex((post) => post.slug === slug);
  const post = index >= 0 ? POSTS[index] : undefined;

  useEffect(() => {
    if (post) document.title = `${post.title} · 知远博客`;
  }, [post]);

  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.getElementById(
      decodeURIComponent(window.location.hash.slice(1)),
    );
    target?.scrollIntoView();
  }, [slug]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale="zh-CN" page="home" copy={copy} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 pb-20 pt-24">
        {post ? <PostView post={post} index={index} /> : <BlogIndex />}
      </main>
      <Footer locale="zh-CN" copy={copy} release={null} releaseStatus="unavailable" />
    </div>
  );
}
