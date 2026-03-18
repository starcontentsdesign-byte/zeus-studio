export default function EnvCheckPage() {
  const checks = [
    {
      label: 'NEXT_PUBLIC_SUPABASE_URL',
      ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
    },
    {
      label: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    },
    {
      label: 'SUPABASE_SERVICE_ROLE_KEY',
      ok: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
    },
    {
      label: 'NEXT_PUBLIC_SITE_URL',
      ok: Boolean(process.env.NEXT_PUBLIC_SITE_URL)
    }
  ];

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Env Check</h1>
      <ul>
        {checks.map((item) => (
          <li key={item.label}>
            {item.label}: {item.ok ? 'detected' : 'missing'}
          </li>
        ))}
      </ul>
      <p>Open /api/env-check to verify the minimal Supabase deployment env set.</p>
    </div>
  );
}
