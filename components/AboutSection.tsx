'use client';

import { ArrowUp } from 'lucide-react';

export default function AboutSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative min-h-screen bg-black py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-12">About</h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="aspect-[3/4] w-full">
              <img
                src="https://images.unsplash.com/photo-1769509068789-f242b5a6fc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW8lMjBlcXVpcG1lbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwMjU4NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Studio Equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed">
            <div className="space-y-2">
              <p>제우스 스튜디오는</p>
              <p>전문적인 오디오 작업과 다양한 서비스로</p>
              <p>최고의 서비스를 제공하기 위해 노력하고 있습니다.</p>
            </div>

            <div className="space-y-2">
              <p>제우스 스튜디오의 전문적인 제작자들과 체험한 있는 매니저들이</p>
              <p>콘텐츠에 매우 적합한 결과물과 환경한 서비스를 약속드립니다.</p>
            </div>

            <div className="space-y-2">
              <p>항상 최신을 다하여 최고의 퀄리티를 줄 수 있도록 노력하겠습니다.</p>
              <p>언제나 여러분의 소중한 작품에 최선을 다하겠습니다.</p>
            </div>

            <div className="pt-4 space-y-3 border-t border-white/20 text-xs">
              <p className="opacity-80">
                ZEUS STUDIO provides high-quality sound works and the best
                services on sound production & mixing, dubbing etc.
              </p>
              
              <p className="opacity-80">
                We promise that our professional sound engineers and reliable
                project managers do our best to support your project and
                expand your content business with outstanding sound works.
              </p>
              
              <p className="opacity-80">
                ZEUS STUDIO will be your capable production partner of your
                future business.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="맨 위로 이동"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </section>
  );
}
