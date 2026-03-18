import { NextResponse } from 'next/server';
import { getAdminApiContext } from '@/utils/admin-api';
import { DEFAULT_STUDIO_POST_SEEDS } from '@/utils/studio-default-posts';

export async function POST() {
  const { user, isAdmin, adminClient } = await getAdminApiContext();

  if (!user) {
    return NextResponse.json({ message: '로그인이 필요합니다.' }, { status: 401 });
  }

  if (!isAdmin || !adminClient) {
    return NextResponse.json({ message: '관리자 권한이 없습니다.' }, { status: 403 });
  }

  const existingQuery = await (adminClient as any)
    .from('studio_posts')
    .select('image_url');

  if (existingQuery.error) {
    return NextResponse.json(
      { message: existingQuery.error.message || '기존 게시물 조회에 실패했습니다.' },
      { status: 500 }
    );
  }

  const existingImageUrls = new Set(
    Array.isArray(existingQuery.data)
      ? existingQuery.data
          .map((row: Record<string, unknown>) =>
            typeof row.image_url === 'string' ? row.image_url.trim() : ''
          )
          .filter(Boolean)
      : []
  );

  const rowsToInsert = DEFAULT_STUDIO_POST_SEEDS.filter(
    (seed) => !existingImageUrls.has(seed.imageUrl)
  ).map((seed) => ({
    title: seed.title,
    content: seed.content,
    image_url: seed.imageUrl,
    user_id: user.id,
    required_membership_level: seed.requiredMembershipLevel
  }));

  if (rowsToInsert.length === 0) {
    return NextResponse.json({ ok: true, inserted: 0, skipped: true });
  }

  const insertQuery = await (adminClient as any)
    .from('studio_posts')
    .insert(rowsToInsert)
    .select('id');

  if (insertQuery.error) {
    return NextResponse.json(
      { message: insertQuery.error.message || '기본 게시물 생성에 실패했습니다.' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    inserted: Array.isArray(insertQuery.data) ? insertQuery.data.length : rowsToInsert.length
  });
}
