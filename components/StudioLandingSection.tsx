'use client';

import Link from 'next/link';

type StudioLandingPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
};

type StudioLandingSectionProps = {
  posts: StudioLandingPost[];
  isAuthenticated: boolean;
};

const formatDate = (value: string | null) => {
  if (!value) return 'Studio Archive';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'Studio Archive';

  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(parsed);
};

const getExcerpt = (value: string) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) return 'ZEUS STUDIO의 작업 컷과 기록을 모아두는 아카이브입니다.';
  if (normalized.length <= 88) return normalized;
  return `${normalized.slice(0, 88).trimEnd()}...`;
};

export default function StudioLandingSection({
  posts,
  isAuthenticated
}: StudioLandingSectionProps) {
  return (
    <section id="studio" className="relative min-h-screen bg-black px-8 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Archive</p>
            <h2 className="mt-3 text-4xl tracking-[0.16em] md:text-5xl">Studio</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
              지금 있는 사진 게시물은 그대로 살리고, 관리자 로그인 이후 사진 추가, 수정, 삭제
              흐름만 따로 붙여둔 상태다. 즉 디자인은 예전 ZEUS 톤, 기능은 최신 운영 흐름으로 간다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/posts"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm tracking-[0.14em] transition hover:bg-white hover:text-black"
            >
              ALL POSTS
            </Link>
            <Link
              href={isAuthenticated ? '/posts/new' : '/signin'}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm tracking-[0.14em] transition hover:bg-white hover:text-black"
            >
              WRITE POST
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={post.id.startsWith('seed-') ? '/posts' : `/posts/${post.id}`}
              className={`group relative overflow-hidden border border-white/10 ${
                index % 4 === 1 || index % 4 === 2 ? 'mt-8 md:mt-12' : ''
              }`}
            >
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full min-h-[16rem] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex min-h-[16rem] items-center justify-center bg-white/5 text-xs uppercase tracking-[0.3em] text-white/35">
                  No Image
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/55">
                  {formatDate(post.createdAt)}
                </p>
                <p className="mt-2 text-lg tracking-[0.08em] text-white md:text-xl">{post.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{getExcerpt(post.content)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
