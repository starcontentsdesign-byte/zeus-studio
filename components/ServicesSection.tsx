export default function ServicesSection() {
  return (
    <section id="services" className="relative min-h-screen bg-black py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-12">Services</h2>
        
        <div className="space-y-8">
          <div className="relative mx-auto w-full max-w-2xl">
            <img
              src="https://images.unsplash.com/photo-1724185773486-0b39642e607e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMHdhdmUlMjBhdWRpbyUyMG1peGluZ3xlbnwxfHx8fDE3NzAyNTk0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sound Production"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="mt-12 grid gap-6 text-sm md:grid-cols-2">
            <div className="space-y-3 border border-white/10 p-6">
              <h3 className="text-lg tracking-wide">Recording & Mixing</h3>
              <p className="text-xs leading-relaxed opacity-80">
                최고급 장비와 전문 엔지니어가
                <br />
                완벽한 사운드를 제작합니다
              </p>
            </div>

            <div className="space-y-3 border border-white/10 p-6">
              <h3 className="text-lg tracking-wide">Dubbing & Localization</h3>
              <p className="text-xs leading-relaxed opacity-80">
                다국어 더빙과 현지화 서비스로
                <br />
                글로벌 콘텐츠를 완성합니다
              </p>
            </div>

            <div className="space-y-3 border border-white/10 p-6">
              <h3 className="text-lg tracking-wide">Sound Design</h3>
              <p className="text-xs leading-relaxed opacity-80">
                영상과 게임을 위한
                <br />
                창의적인 사운드 디자인
              </p>
            </div>

            <div className="space-y-3 border border-white/10 p-6">
              <h3 className="text-lg tracking-wide">Audio Post Production</h3>
              <p className="text-xs leading-relaxed opacity-80">
                영화, 드라마, 광고를 위한
                <br />
                전문 오디오 포스트 프로덕션
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
