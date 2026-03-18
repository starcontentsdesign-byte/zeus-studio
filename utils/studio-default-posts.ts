export type DefaultStudioPostSeed = {
  title: string;
  content: string;
  imageUrl: string;
  requiredMembershipLevel: number;
};

const buildSeed = (
  title: string,
  content: string,
  imageUrl: string,
  requiredMembershipLevel: number
): DefaultStudioPostSeed => ({
  title,
  content,
  imageUrl,
  requiredMembershipLevel
});

export const DEFAULT_STUDIO_POST_SEEDS: DefaultStudioPostSeed[] = [
  buildSeed(
    'ZEUS Studio Main Room',
    '메인 룸 전경과 전체 공간 무드를 담은 기본 스튜디오 게시물입니다.',
    '/images/studio/astudiomain.png',
    0
  ),
  buildSeed(
    'ZEUS Recording Booth',
    '보컬 녹음과 나레이션 세션에 어울리는 부스 컷입니다.',
    '/images/studio/studio1.png',
    0
  ),
  buildSeed(
    'ZEUS Console Detail',
    '믹싱 콘솔과 작업 흐름 디테일을 보여주는 스튜디오 게시물입니다.',
    '/images/studio/studio2.jpg',
    0
  ),
  buildSeed(
    'ZEUS Session Cut 01',
    '세션 분위기와 작업 리듬을 담아낸 프리미엄 스냅입니다.',
    '/images/studio/studio3.jpg',
    1
  ),
  buildSeed(
    'ZEUS Session Cut 02',
    '레코딩 현장의 밀도감을 보여주는 멤버십 전용 게시물입니다.',
    '/images/studio/studio4.jpg',
    1
  ),
  buildSeed(
    'ZEUS Session Cut 03',
    '장비와 인물 동선을 함께 보여주는 가로형 게시물용 이미지입니다.',
    '/images/studio/studio5.jpg',
    1
  ),
  buildSeed(
    'ZEUS Shorts Highlight 01',
    '숏폼/비하인드 용으로 쓰기 좋은 클로즈업 스튜디오 컷입니다.',
    '/images/studio/studio6.jpg',
    2
  ),
  buildSeed(
    'ZEUS Artist Room 01',
    '아티스트 무드와 공간 텍스처를 강조한 이미지입니다.',
    '/images/studio/zeusstudio1.png',
    2
  ),
  buildSeed(
    'ZEUS Artist Room 02',
    '브랜드 피드에 바로 쓸 수 있는 스튜디오 아카이브 컷입니다.',
    '/images/studio/zeusstudio2.png',
    2
  ),
  buildSeed(
    'ZEUS Artist Room 03',
    '프리미엄 포토+글 라인업으로 배치할 수 있는 대표 이미지입니다.',
    '/images/studio/zeusstudio3.png',
    3
  ),
  buildSeed(
    'ZEUS Area Code Detail',
    '공간 디테일과 사운드 브랜드 이미지를 함께 전달하는 컷입니다.',
    '/images/studio/arecode.png',
    3
  ),
  buildSeed(
    'ZEUS Area Code Detail 02',
    '스튜디오 아카이브를 채우는 보조 비주얼 게시물입니다.',
    '/images/studio/arecode2.png',
    3
  )
];
