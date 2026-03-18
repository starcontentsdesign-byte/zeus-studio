import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

import { Database } from '@/types_db';
import { isAdminUserLike } from '@/utils/service-posts';

type PostPayload = {
  title?: string;
  content?: string;
};

const createRouteSupabaseClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const requestedLimit = Number(requestUrl.searchParams.get('limit') ?? '6');
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(12, Math.max(1, Math.floor(requestedLimit)))
    : 6;
  const supabase = await createRouteSupabaseClient();

  const { data, error } = await (supabase as never)
    .from('studio_posts')
    .select('id,title,content,image_url,created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json(
      { message: '게시물 목록을 불러오지 못했습니다.' },
      { status: 500 }
    );
  }

  const posts = Array.isArray(data)
    ? data.map((row) => ({
        id: String(row.id ?? ''),
        title: typeof row.title === 'string' && row.title.trim() ? row.title : '제목 없음',
        content: typeof row.content === 'string' ? row.content : '',
        image_url: typeof row.image_url === 'string' ? row.image_url : null,
        created_at:
          typeof row.created_at === 'string' && row.created_at.trim()
            ? row.created_at
            : new Date().toISOString(),
      }))
    : [];

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const { title, content } = (await request.json()) as PostPayload;

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { message: '제목과 내용을 모두 입력해 주세요.' },
      { status: 400 }
    );
  }

  const supabase = await createRouteSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { message: '로그인이 필요합니다.' },
      { status: 401 }
    );
  }

  if (!isAdminUserLike(user)) {
    return NextResponse.json(
      { message: '관리자만 게시물을 작성할 수 있습니다.' },
      { status: 403 }
    );
  }

  const { error: insertError } = await (supabase as never)
    .from('studio_posts')
    .insert({
      title: title.trim(),
      content: content.trim(),
      user_id: user.id,
    });

  if (insertError) {
    console.error('Studio post insert failed', {
      code: insertError.code,
      message: insertError.message,
      details: insertError.details,
    });
    return NextResponse.json(
      {
        message: '게시글 저장에 실패했습니다.',
        error: {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
        },
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
