import { NextResponse } from 'next/server';
import { getAdminApiContext } from '@/utils/admin-api';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    const { user, isAdmin } = await getAdminApiContext();
    if (!user || !isAdmin) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }
  }

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    hasSiteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()),
    hasAdminEmails: Boolean(process.env.NEXT_PUBLIC_ADMIN_EMAILS?.trim()),
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()),
    hasSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()),
    hasSupabaseServiceRoleKey: Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    )
  });
}
