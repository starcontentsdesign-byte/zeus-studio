'use client';

import Link from 'next/link';

type LandingStudioPost = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

type StudioSectionProps = {
  posts?: LandingStudioPost[];
  isLoading?: boolean;
  error?: string | null;
  isAdmin?: boolean;
  onCreatePost?: () => void;
  studioPostIdFromQuery?: string | null;
  queryString?: string;
};

const studioImages = [
  {
    id: 1,
    url: '/images/studio/studio1.png',
    alt: 'ZEUS studio entrance',
    size: 'large',
  },
  {
    id: 2,
    url: '/images/studio/studio2.jpg',
    alt: 'ZEUS recording room',
    size: 'medium',
  },
  {
    id: 3,
    url: '/images/studio/zeusstudio3.png',
    alt: 'ZEUS lounge',
    size: 'medium',
  },
  {
    id: 4,
    url: '/images/studio/studio4.jpg',
    alt: 'ZEUS booth lighting',
    size: 'medium',
  },
  {
    id: 5,
    url: '/images/studio/zeusstudio1.png',
    alt: 'ZEUS control room',
    size: 'medium',
  },
  {
    id: 6,
    url: '/images/studio/studio6.jpg',
    alt: 'ZEUS mix room',
    size: 'medium',
  },
];

const formatPostDate = (value: string) =>
  new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
  }).format(new Date(value));

const trimPostCopy = (value: string) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= 110) return normalized;
  return `${normalized.slice(0, 110)}...`;
};

export default function StudioSection({
  posts = [],
  isLoading = false,
  error = null,
  isAdmin = false,
  onCreatePost,
  studioPostIdFromQuery = null,
}: StudioSectionProps) {
  const sortedPosts = [...posts].sort((left, right) => {
    if (!studioPostIdFromQuery) return 0;
    if (left.id === studioPostIdFromQuery) return -1;
    if (right.id === studioPostIdFromQuery) return 1;
    return 0;
  });

  const hasPosts = sortedPosts.length > 0;

  return (
    <section id="studio" className="zeus-section zeus-studio-section">
      <div className="zeus-section-shell zeus-studio-shell">
        <div className="zeus-section-intro zeus-section-intro--lined">
          <h2 className="zeus-section-heading">Studio</h2>
        </div>

        <div className="zeus-studio-toolbar">
          <div className="zeus-studio-toolbar-actions">
            {isAdmin ? (
              <button
                type="button"
                className="zeus-studio-action zeus-studio-action--button"
                onClick={onCreatePost}
              >
                Write
              </button>
            ) : null}
          </div>
        </div>

        {error ? <p className="zeus-studio-status">{error}</p> : null}
        {isLoading ? (
          <p className="zeus-studio-status">Studio 게시물 불러오는 중...</p>
        ) : null}

        {!isLoading && !error && hasPosts ? (
          <div className="zeus-studio-grid zeus-studio-grid--posts">
            {sortedPosts.map((post, index) => {
              const fallbackImage = studioImages[index % studioImages.length];
              const imageUrl = post.image_url || fallbackImage.url;
              const isFocused = studioPostIdFromQuery === post.id;

              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className={`zeus-studio-post-card${index === 0 ? ' zeus-studio-post-card--hero' : ''}${isFocused ? ' is-focused' : ''}`}
                >
                  <div className="zeus-studio-post-media">
                    <img
                      src={imageUrl}
                      alt={post.title || fallbackImage.alt}
                      className="zeus-studio-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="zeus-studio-post-body">
                    <p className="zeus-studio-post-meta">{formatPostDate(post.created_at)}</p>
                    <h3 className="zeus-studio-post-title">{post.title}</h3>
                    <p className="zeus-studio-post-copy">{trimPostCopy(post.content)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}

        {!isLoading && !error && !hasPosts ? (
          <div className="zeus-studio-empty">
            <div className="zeus-studio-grid">
              {studioImages.map((image) => (
                <div
                  key={image.id}
                  className={`zeus-studio-card zeus-studio-card--${image.size}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="zeus-studio-image"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
