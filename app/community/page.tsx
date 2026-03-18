import Link from 'next/link';
import CommunityBoard from '@/components/CommunityBoard';

export const dynamic = 'force-dynamic';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Community</p>
            <h1 className="mt-3 text-4xl tracking-[0.14em] md:text-5xl">BOARD</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/68">
              홈 디자인은 원래 ZEUS 톤으로 되돌리고, 보드 기능은 이 화면에서 따로 쓰게
              분리했다.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm tracking-[0.14em] transition hover:bg-white hover:text-black"
          >
            BACK HOME
          </Link>
        </div>

        <section className="border border-white/10 bg-[#fbfdff] p-4 text-stone-950 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-6">
          <CommunityBoard />
        </section>
      </div>
    </main>
  );
}
