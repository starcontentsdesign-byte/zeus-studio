'use client';

import Link from 'next/link';

type CommunityLandingPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string | null;
  isNotice: boolean;
};

type CommunityLandingSectionProps = {
  posts: CommunityLandingPost[];
  isAuthenticated: boolean;
};

const formatDate = (value: string | null) => {
  if (!value) return 'Waiting';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'Waiting';

  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(parsed);
};

const excerpt = (value: string) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) return '아직 작성된 내용이 없습니다.';
  if (normalized.length <= 96) return normalized;
  return `${normalized.slice(0, 96).trimEnd()}...`;
};

export default function CommunityLandingSection({
  posts,
  isAuthenticated
}: CommunityLandingSectionProps) {
  return (
    <section id="community" className="border-t border-white/10 bg-black px-8 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Board</p>
            <h2 className="mt-3 text-4xl tracking-[0.16em] md:text-5xl">Community</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
              커뮤니티 보드는 별도 화면으로 분리해서 기능은 그대로 두고, 메인 랜딩은 처음 ZEUS
              분위기를 유지하게 바꿨다.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/community"
              className="inline-flex items-center justify-center py-2 text-sm tracking-[0.22em] text-white/78 transition-opacity hover:opacity-70"
            >
              OPEN BOARD
            </Link>
            <Link
              href={isAuthenticated ? '/community' : '/signin'}
              className="inline-flex items-center justify-center py-2 text-sm tracking-[0.22em] text-white/78 transition-opacity hover:opacity-70"
            >
              WRITE IN BOARD
            </Link>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href="/community"
                className="group border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em] text-white/45">
                  <span>{post.isNotice ? 'Notice' : 'Community'}</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <h3 className="mt-4 text-xl tracking-[0.08em] text-white transition group-hover:text-white/80">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/68">{excerpt(post.content)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-white/10 bg-white/[0.03] p-8 text-sm leading-relaxed text-white/65">
            아직 커뮤니티 글이 많지 않다. 그래도 기능은 살아 있으니 보드에서 바로 작성하면 된다.
          </div>
        )}
      </div>
    </section>
  );
}
