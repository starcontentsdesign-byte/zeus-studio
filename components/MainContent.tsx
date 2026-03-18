'use client';

import Link from 'next/link';

import {
  BRAND_NAME,
  CONTACT_EMAIL,
  DESIGNER_BRAND_URL,
  REPRESENTATIVE_NAME,
  YOUTUBE_URL
} from '@/utils/branding';

const statItems = [
  { label: 'Studio Posts', value: '12+' },
  { label: 'Community Feed', value: '24/7' },
  { label: 'Admin Control', value: 'Live' }
];

const boardNotes = [
  '스튜디오 사진과 기록을 게시물로 전환해 관리자에서 바로 수정/삭제할 수 있습니다.',
  '커뮤니티 게시판으로 사용자 피드백과 작업 대화를 한곳에서 모을 수 있습니다.',
  '관리자 로그인 이후 게시물, 멤버, 미디어 흐름을 한 번에 제어할 수 있습니다.'
];

export default function MainContent() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center px-4 pb-14 pt-28 md:px-8 md:pb-20 md:pt-40"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <video
          className="h-full w-full object-cover opacity-[0.14] grayscale saturate-0 contrast-105"
          src="/images/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,248,255,0.98)_0%,rgba(249,251,255,0.96)_52%,rgba(239,245,255,0.98)_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[24vw] bg-[linear-gradient(180deg,rgba(235,242,255,0.94),rgba(248,251,255,0.22))]" />
      </div>

      <div className="section-shell">
        <div className="grid items-end gap-10 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="animate-rise">
            <p className="section-kicker">Studio Archive · Community · Admin</p>
            <h1 className="display-font text-glow mt-5 text-[clamp(2.8rem,9vw,7.4rem)] font-semibold leading-[0.9] tracking-[0.01em] text-stone-950">
              {BRAND_NAME}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-600 md:text-[0.95rem]">
              <a
                href={DESIGNER_BRAND_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-stone-900/25 underline-offset-4 transition hover:text-stone-950 hover:decoration-stone-900/55"
              >
                Project Repository
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-stone-900/25 underline-offset-4 transition hover:text-stone-950 hover:decoration-stone-900/55"
              >
                GitHub Profile
              </a>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-stone-700 md:text-base">
              {BRAND_NAME}는 스튜디오 작업물, 커뮤니티 피드, 관리자 운영 기능을
              한곳으로 묶은 아카이브형 플랫폼입니다. 기존 이미지 자산을 게시물로
              관리하고, 이후에는 사진 추가/수정/삭제까지 같은 흐름으로 이어갈 수
              있습니다.
            </p>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-1.5">
              <Link
                href="#studio"
                className="y2k-button y2k-button-primary y2k-button-hero-compact y2k-button-fade-micro w-full no-underline sm:w-auto"
              >
                OPEN STUDIO
              </Link>
              <a
                href="#community"
                className="y2k-button y2k-button-accent y2k-button-hero-compact y2k-button-fade-micro w-full no-underline sm:w-auto"
              >
                OPEN COMMUNITY
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {statItems.map((item) => (
                <div
                  key={item.label}
                  className="min-w-0 border-l border-stone-900/12 py-1 pl-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                    {item.label}
                  </p>
                  <p className="mt-2 display-font text-lg font-semibold tracking-[0.03em] text-stone-950 md:text-xl">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="tech-panel scanline animate-rise relative max-w-xl overflow-hidden p-5 [animation-delay:0.15s] lg:max-w-none lg:ml-auto lg:max-w-[30rem]">
            <p className="section-kicker">Creator</p>
            <h2 className="display-font mt-2 text-xl font-semibold tracking-[0.02em] text-stone-950 sm:text-2xl md:text-3xl">
              About
            </h2>

            <div className="mt-6 space-y-4 text-sm text-stone-700">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Solo Studio</p>
                <p className="mt-1 break-words leading-relaxed">
                  {REPRESENTATIVE_NAME} 운영 기준으로 스튜디오 게시물, 커뮤니티,
                  관리자 패널을 통합 관리합니다.
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-1 block break-all leading-relaxed underline decoration-stone-900/20 underline-offset-4 transition hover:text-stone-950 hover:decoration-stone-900/50"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">About</p>
                <div className="mt-2 space-y-2">
                  {boardNotes.map((note, index) => (
                    <div
                      key={note}
                      className="border-l border-stone-900/12 pl-3 text-[13px] leading-relaxed text-stone-700"
                    >
                      <span className="mr-2 text-stone-500">0{index + 1}</span>
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
