'use client';

import { ArrowUp } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen bg-black px-8 py-20 text-white md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-12 text-4xl md:text-5xl">About</h2>

        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="aspect-[3/4] w-full overflow-hidden border border-white/10">
              <img
                src="/images/studio/astudiomain.png"
                alt="Studio Equipment"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-white/82">
            <div className="space-y-2">
              <p>제우스 스튜디오는</p>
              <p>전문적인 오디오 작업과 다양한 서비스로</p>
              <p>최고의 결과물을 제공하기 위해 움직입니다.</p>
            </div>

            <div className="space-y-2">
              <p>녹음, 편집, 믹싱, 더빙 같은 핵심 제작 흐름을</p>
              <p>스튜디오 아카이브와 운영 게시물 구조로 함께 묶어</p>
              <p>한 화면에서 관리할 수 있게 정리했습니다.</p>
            </div>

            <div className="space-y-2">
              <p>이번 복구는 디자인을 처음 ZEUS 무드로 되돌리고,</p>
              <p>기능은 게시물/커뮤니티/관리자 라인만 남겨</p>
              <p>운영 동선이 깨지지 않게 맞춘 상태입니다.</p>
            </div>

            <div className="space-y-3 border-t border-white/20 pt-4 text-xs text-white/60">
              <p>
                ZEUS STUDIO provides a focused production environment for recording, sound editing,
                mixing, dubbing, and archive-based content management.
              </p>

              <p>
                The interface is restored to the original ZEUS direction while admin and community
                features stay connected underneath.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="맨 위로 이동"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </section>
  );
}
