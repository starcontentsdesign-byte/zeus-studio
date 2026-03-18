import { ZeusApp } from '@/components/ZeusApp';
import { DEFAULT_STUDIO_POST_SEEDS } from '@/utils/studio-default-posts';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

type StudioLandingPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
};

type CommunityLandingPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string | null;
  isNotice: boolean;
};

const fallbackStudioPosts: StudioLandingPost[] = DEFAULT_STUDIO_POST_SEEDS.slice(0, 8).map(
  (seed, index) => ({
    id: `seed-${index + 1}`,
    title: seed.title,
    content: seed.content,
    imageUrl: seed.imageUrl,
    createdAt: null
  })
);

export default async function Page() {
  let initialStudioPosts = fallbackStudioPosts;
  let initialCommunityPosts: CommunityLandingPost[] = [];

  const hasSupabaseConfig =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (hasSupabaseConfig) {
    try {
      const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ) as any;
      const [studioResult, communityResult] = await Promise.all([
        supabase
          .from('studio_posts')
          .select('id,title,content,image_url,created_at')
          .order('created_at', { ascending: false })
          .limit(8),
        supabase
          .from('community_posts')
          .select('id,title,content,is_notice,created_at')
          .order('is_notice', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(4)
      ]);

      if (!studioResult.error && Array.isArray(studioResult.data) && studioResult.data.length > 0) {
        initialStudioPosts = studioResult.data.map((post: any) => ({
          id: String(post.id),
          title: typeof post.title === 'string' && post.title.trim() ? post.title.trim() : 'Untitled',
          content: typeof post.content === 'string' ? post.content : '',
          imageUrl: typeof post.image_url === 'string' ? post.image_url : null,
          createdAt: typeof post.created_at === 'string' ? post.created_at : null
        }));
      }

      if (!communityResult.error && Array.isArray(communityResult.data)) {
        initialCommunityPosts = communityResult.data.map((post: any) => ({
          id: String(post.id),
          title: typeof post.title === 'string' && post.title.trim() ? post.title.trim() : '제목 없음',
          content: typeof post.content === 'string' ? post.content : '',
          createdAt: typeof post.created_at === 'string' ? post.created_at : null,
          isNotice: Boolean(post.is_notice)
        }));
      }
    } catch (error) {
      console.error('Landing page data bootstrap failed', error);
    }
  }

  return (
    <ZeusApp
      initialStudioPosts={initialStudioPosts}
      initialCommunityPosts={initialCommunityPosts}
    />
  );
}
