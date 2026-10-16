// =============================================================
//  이 파일만 고치면 사이트 내용이 바뀝니다.
//  사진은 images/ 폴더에 넣고 경로를 적어 주세요. (예: "images/apt-1.jpg")
//  비워 둔 항목("" 또는 [])은 사이트에 표시되지 않습니다.
// =============================================================

const COMPANY = {
  name: "스마트조경",
  slogan: "다듬을수록 가치가 드러나는 조경",
  intro:
    "부산의 학교, 공공기관, 호텔, 기업 사옥, 빌라 단지에서 수목 전정과 화단 조성을 해 왔습니다. 다듬고 나면 건물의 첫인상이 달라집니다.",

  // ---- 검색 노출(SEO) 설정 ----
  region: "부산",                                   // 주 활동 지역 (검색어에 붙습니다)
  serviceArea: "부산 전역 (그 밖의 지역도 문의 가능)",   // 작업 가능 지역 안내문
  siteUrl: "https://ilovelybeari00-lab.github.io/smart/", // GitHub Pages 주소 (끝에 / 포함)
  seoTitle: "부산 조경업체 스마트조경 | 수목 전정·가지치기·화단 조성",
  seoDescription:
    "부산 조경업체 스마트조경. 학교·공공기관·호텔·아파트 수목 전정, 소나무 가지치기, 생울타리 정리, 화단 조성, 묘지·산소 벌초 대행. 현장별 작업 전·후 사진 공개, 무료 현장 상담.",
  keywords: ["부산 조경업체", "부산 수목 전정", "부산 가지치기 업체", "소나무 전정", "학교 조경 관리", "아파트 조경 관리", "화단 조성", "생울타리 정리", "고사목 제거", "부산 벌초 대행", "묘지 관리", "산소 관리"],
  naverVerify: "",  // 네이버 서치어드바이저 사이트 소유확인 meta content 값
  googleVerify: "", // 구글 서치콘솔 HTML 태그 content 값
  phone: "010-0000-0000",        // ← 실제 번호로 바꿔 주세요
  email: "contact@example.com",  // ← 실제 메일로 바꿔 주세요
  kakao: "", // 카카오톡 오픈채팅 주소가 있으면 입력 (예: "https://open.kakao.com/o/xxxx")
  address: "",
  bizNumber: "",
  licenses: [], // 예: ["조경공사업 등록", "조경기사 보유"]
};

// 숫자로 보여주는 실적. 사실인 숫자만 적어 주세요. (비워 두면 숨겨집니다)
// 예: { value: "120+", label: "누적 시공 현장" }
const STATS = [];

const SERVICES = [
  { icon: "🌲", title: "수목 전정·수형 관리", desc: "소나무, 향나무 등 조경수의 수형을 살려 단정하고 품격 있게 다듬습니다." },
  { icon: "🌿", title: "관목·생울타리 정리", desc: "웃자란 관목과 생울타리를 정리해 건물 입구와 간판이 잘 보이게 합니다." },
  { icon: "🌸", title: "화단 조성·정비", desc: "빈 공터에 새 화단을 만들고, 기존 화단의 잡초와 고사목을 정리합니다." },
  { icon: "🚜", title: "장비 작업", desc: "굴착기, 고소작업차, 집게차로 큰 나무 제거와 폐목 처리까지 한 번에 합니다." },
  { icon: "🌾", title: "묘지·산소 관리 (벌초 대행)", desc: "산소 벌초와 봉분 주변 잡초·잡목 정리, 묘지 둘레 나무 전정을 대신해 드립니다. 멀리 계시거나 시간 내기 어려운 분들께 작업 전·후 사진을 보내 드립니다." },
];

// 시공 사례. 맨 위 사례가 첫 화면의 대표 사례로 나옵니다.
// id 는 상세 페이지 주소에 쓰입니다. (영문 소문자)
// category 는 목록 페이지의 분야 필터에 쓰입니다. (학교 / 공공시설 / 호텔·상업시설 / 주택·빌라)
// video 를 넣으면 상세 페이지에 영상이 나옵니다. (예: { src: "video/xxx.mp4", poster: "images/xxx.jpg", caption: "..." })
// cover 는 목록 카드 사진입니다. (비우면 첫 번째 작업 후 사진)
// pairs 에 시공 전·후 사진을 짝지어 넣습니다.
const PROJECTS = [
  {
    id: "pond-garden",
    title: "주택 정원 연못·분수 조성",
    cover: "images/pond-1.jpg",
    client: "개인 주택",
    category: "주택·빌라",
    work: "자연석 연못 조성 · 분수 설치 · 수생식물·초화류 식재",
    desc:
      "잔디 마당 한쪽에 자연석을 둘러 연못을 만들고 분수를 설치했습니다. 연못 둘레에는 수생식물과 꽃을 심고 석등과 조명을 놓아 저녁에도 보기 좋은 정원이 되도록 했습니다.",
    video: { src: "video/pond-2014.mp4", poster: "images/pond-1.jpg", caption: "연못 조성 마무리 작업 영상" },
    pairs: [],
    progress: [
      { caption: "자연석 연못과 분수", src: "images/pond-1.jpg" },
      { caption: "연못 둘레 수생식물 식재", src: "images/pond-2.jpg" },
      { caption: "마당 쪽에서 본 연못 정원", src: "images/pond-3.jpg" },
    ],
  },
  {
    id: "busan-science-2021",
    title: "국립부산과학관 전체 수목 전정",
    cover: "images/sci2021-3-after.jpg",
    client: "국립부산과학관",
    category: "공공시설",
    work: "입구·정문·천체투영관 일대 수목 전정 · 고사목 제거",
    desc:
      "과학관 입구와 정문, 천체투영관, 본관 둘레의 소나무, 느티나무, 후박나무, 팽나무 등 큰 나무를 한 번에 정비했습니다. 겨울 동안 웃자란 가지를 잘라 수형을 바로잡고, 상한 은행나무 한 그루는 제거해 봄에 새순이 고르게 나도록 했습니다.",
    pairs: [
      { caption: "입구 소나무 전정", before: "images/sci2021-1-before.jpg", after: "images/sci2021-1-after.jpg" },
      { caption: "입구 소나무 수형 다듬기", before: "images/sci2021-2-before.jpg", after: "images/sci2021-2-after.jpg" },
      { caption: "정문 느티나무 전정", before: "images/sci2021-3-before.jpg", after: "images/sci2021-3-after.jpg" },
      { caption: "정문 구실잣밤나무 전정 · 은행나무 1그루 제거", before: "images/sci2021-4-before.jpg", after: "images/sci2021-4-after.jpg" },
      { caption: "정문 후박나무 전정", before: "images/sci2021-5-before.jpg", after: "images/sci2021-5-after.jpg" },
      { caption: "정문 팽나무 전정", before: "images/sci2021-6-before.jpg", after: "images/sci2021-6-after.jpg" },
      { caption: "야외전시장 단풍나무 전정", before: "images/sci2021-7-before.jpg", after: "images/sci2021-7-after.jpg" },
      { caption: "천체투영관 홍가시나무 정리", before: "images/sci2021-8-before.jpg", after: "images/sci2021-8-after.jpg" },
      { caption: "천체투영관 후박나무 전정", before: "images/sci2021-9-before.jpg", after: "images/sci2021-9-after.jpg" },
      { caption: "천체투영관 팽나무 전정", before: "images/sci2021-10-before.jpg", after: "images/sci2021-10-after.jpg" },
      { caption: "천체투영관 느티나무 전정", before: "images/sci2021-11-before.jpg", after: "images/sci2021-11-after.jpg" },
      { caption: "천체투영관 소나무 전정", before: "images/sci2021-12-before.jpg", after: "images/sci2021-12-after.jpg" },
      { caption: "본관 옆 느티나무 전정", before: "images/sci2021-13-before.jpg", after: "images/sci2021-13-after.jpg" },
      { caption: "도로 좌우 벚나무 전정", before: "images/sci2021-14-before.jpg", after: "images/sci2021-14-after.jpg" },
    ],
  },
  {
    id: "busan-science-2025",
    title: "국립부산과학관 소나무 전정 (재의뢰)",
    cover: "images/sci2025-2-after.jpg",
    client: "국립부산과학관",
    category: "공공시설",
    work: "입구·천체투영관·캠프관 소나무 전정",
    desc:
      "다시 맡겨 주신 현장입니다. 입구 생울타리 위 소나무와 천체투영관 뒤, 캠프관 옆 소나무의 묵은 가지를 솎아 층이 보이는 단정한 수형으로 다듬었습니다. 한 번 맡긴 현장을 다시 찾아 주시는 것이 저희의 자부심입니다.",
    pairs: [
      { caption: "입구 생울타리 위 소나무 전정", before: "images/sci2025-1-before.jpg", after: "images/sci2025-1-after.jpg" },
      { caption: "입구 소나무 수형 다듬기", before: "images/sci2025-2-before.jpg", after: "images/sci2025-2-after.jpg" },
      { caption: "천체투영관 뒤 소나무 전정", before: "images/sci2025-3-before.jpg", after: "images/sci2025-3-after.jpg" },
      { caption: "과학관 뒤 캠프관 옆 수목 전정", before: "images/sci2025-4-before.jpg", after: "images/sci2025-4-after.jpg" },
    ],
  },
  {
    id: "bugok",
    title: "부곡여자중학교 교정 수목 정비",
    cover: "images/bugok-5-after.jpg",
    client: "부곡여자중학교",
    category: "학교",
    work: "느티나무·은행나무 큰 나무 전정 · 화단 정원수 다듬기",
    desc:
      "후문과 운동장 모서리의 큰 느티나무가 도로와 담장 밖으로 뻗어 있던 것을 정리하고, 정문 은행나무와 경비실 옆 파고라 주변 나무를 다듬었습니다. 정문 화단의 산호수, 교장실 앞 모과나무, 화단 단풍나무까지 학교 전체 조경수를 한 번에 손봤습니다.",
    pairs: [
      { caption: "후문 앞 느티나무 전정", before: "images/bugok-1-before.jpg", after: "images/bugok-1-after.jpg" },
      { caption: "후문 앞 느티나무 · 도로 방향 가지 정리", before: "images/bugok-2-before.jpg", after: "images/bugok-2-after.jpg" },
      { caption: "운동장 모서리 느티나무 전정", before: "images/bugok-3-before.jpg", after: "images/bugok-3-after.jpg" },
      { caption: "운동장 모서리 느티나무 · 도로 방향 가지 정리", before: "images/bugok-4-before.jpg", after: "images/bugok-4-after.jpg" },
      { caption: "정문 은행나무 전정", before: "images/bugok-5-before.jpg", after: "images/bugok-5-after.jpg" },
      { caption: "경비실 옆 파고라 주변 편백나무 정리", before: "images/bugok-6-before.jpg", after: "images/bugok-6-after.jpg" },
      { caption: "파고라 뒤 벚나무·은행나무 전정", before: "images/bugok-7-before.jpg", after: "images/bugok-7-after.jpg" },
      { caption: "정문 화단 산호수 다듬기", before: "images/bugok-8-before.jpg", after: "images/bugok-8-after.jpg" },
      { caption: "교장실 앞 모과나무 전정", before: "images/bugok-9-before.jpg", after: "images/bugok-9-after.jpg" },
      { caption: "화단 단풍나무 전정", before: "images/bugok-10-before.jpg", after: "images/bugok-10-after.jpg" },
    ],
  },
  {
    id: "webs",
    title: "㈜웹스 사옥 테라스 정원 관리",
    cover: "images/webs-8-after.jpg",
    client: "㈜웹스",
    category: "호텔·상업시설",
    work: "9~11층 테라스 소나무·향나무 전정 · 화단 정리",
    desc:
      "건물 9층부터 11층까지 층마다 있는 테라스 정원을 관리했습니다. 바람을 많이 받는 옥상 소나무와 섬잣나무의 수형을 잡고, 웃자란 대나무와 향나무를 정리해 사무실 창밖 풍경을 단정하게 바꿨습니다.",
    pairs: [
      { caption: "11층 화단 소나무 전정", before: "images/webs-1-before.jpg", after: "images/webs-1-after.jpg" },
      { caption: "11층 대나무 화단 정리", before: "images/webs-2-before.jpg", after: "images/webs-2-after.jpg" },
      { caption: "11층 섬잣나무 전정", before: "images/webs-3-before.jpg", after: "images/webs-3-after.jpg" },
      { caption: "11층 화단 정리", before: "images/webs-4-before.jpg", after: "images/webs-4-after.jpg" },
      { caption: "10층 소나무 전정", before: "images/webs-5-before.jpg", after: "images/webs-5-after.jpg" },
      { caption: "10층 화단 정리", before: "images/webs-6-before.jpg", after: "images/webs-6-after.jpg" },
      { caption: "9층 향나무·화단 정리", before: "images/webs-7-before.jpg", after: "images/webs-7-after.jpg" },
      { caption: "9층 향나무 수형 다듬기", before: "images/webs-8-before.jpg", after: "images/webs-8-after.jpg" },
    ],
  },
  {
    id: "bohyeon",
    title: "보현빌리지 단지 조경수 전정",
    cover: "images/bohyeon-7-after.jpg",
    client: "보현빌리지",
    category: "주택·빌라",
    work: "진입로·담장·주차장 입구 소나무 전정 · 생울타리 정리",
    desc:
      "빌라 진입로와 담장을 따라 심어진 소나무, 향나무, 정원수가 몇 해 동안 웃자라 건물을 가리고 있었습니다. 겨울에 가지를 솎아 수형을 살리고 담장 생울타리를 가지런히 깎아 단지 입구가 환해졌습니다.",
    pairs: [
      { caption: "진입로 소나무·정원수 전정", before: "images/bohyeon-1-before.jpg", after: "images/bohyeon-1-after.jpg" },
      { caption: "담장 위 정원수 전정", before: "images/bohyeon-2-before.jpg", after: "images/bohyeon-2-after.jpg" },
      { caption: "도로변 담장 수목 전정", before: "images/bohyeon-3-before.jpg", after: "images/bohyeon-3-after.jpg" },
      { caption: "정문 옆 정원수 수형 다듬기", before: "images/bohyeon-4-before.jpg", after: "images/bohyeon-4-after.jpg" },
      { caption: "모퉁이 향나무·소나무 전정", before: "images/bohyeon-5-before.jpg", after: "images/bohyeon-5-after.jpg" },
      { caption: "담장 생울타리 정리", before: "images/bohyeon-6-before.jpg", after: "images/bohyeon-6-after.jpg" },
      { caption: "주차장 입구 소나무 전정", before: "images/bohyeon-7-before.jpg", after: "images/bohyeon-7-after.jpg" },
      { caption: "담장 위 소나무·관목 정리", before: "images/bohyeon-8-before.jpg", after: "images/bohyeon-8-after.jpg" },
    ],
  },
  {
    id: "minrak",
    category: "공공시설",
    title: "민락주민자치 화단조성",
    client: "민락 주민자치",
    location: "",
    work: "화단 신규 조성 · 관목 식재",
    desc:
      "도로변 빈 공터와 건물 앞 빈 화단에 흙을 채우고 관목을 새로 심어 화단을 만들었습니다. 흙먼지 날리던 자리가 동네의 녹지 공간이 되었습니다.",
    pairs: [
      { caption: "도로변 빈 공터 → 화단 조성", before: "images/minrak-1-before.jpg", after: "images/minrak-1-after.jpg" },
      { caption: "건물 앞 빈 화단 → 관목 식재", before: "images/minrak-2-before.jpg", after: "images/minrak-2-after.jpg" },
    ],
  },
  {
    id: "gijang",
    category: "학교",
    title: "기장중학교 운동장 주변 녹지 정비",
    client: "기장중학교",
    location: "",
    work: "대나무·잡목 제거 · 수목 식재 · 화단 정비 · 폐목 처리",
    desc:
      "운동장 둘레를 뒤덮은 대나무숲과 잡목을 굴착기로 걷어내고, 그 자리에 나무를 새로 심어 지주목을 세웠습니다. 화단도 정리하고, 나온 폐목은 집게차로 실어 깨끗하게 처리했습니다.",
    pairs: [
      { caption: "운동장 옆 녹지 정비 · 수목 식재", before: "images/grounds-1-before.jpg", after: "images/grounds-1-after.jpg" },
      { caption: "건물 옆 잡초밭 → 수목 식재", before: "images/grounds-2-before.jpg", after: "images/grounds-2-after.jpg" },
      { caption: "대나무숲 제거 · 산책길 확보", before: "images/grounds-3-before.jpg", after: "images/grounds-3-after.jpg" },
      { caption: "방음벽 앞 대나무 경사지 정리", before: "images/grounds-4-before.jpg", after: "images/grounds-4-after.jpg" },
      { caption: "트랙 옆 잡목 제거", before: "images/grounds-5-before.jpg", after: "images/grounds-5-after.jpg" },
      { caption: "건물 앞 화단 정리", before: "images/grounds-6-before.jpg", after: "images/grounds-6-after.jpg" },
      { caption: "담장 화단 수목 식재", before: "images/grounds-7-before.jpg", after: "images/grounds-7-after.jpg" },
    ],
    progress: [
      { caption: "굴착기로 잡목 걷어내기", src: "images/grounds-work-1.jpg" },
      { caption: "대나무 벌채", src: "images/grounds-work-2.jpg" },
      { caption: "대나무 뿌리 제거", src: "images/grounds-work-3.jpg" },
      { caption: "수목 굴취", src: "images/grounds-work-4.jpg" },
      { caption: "수목 운반", src: "images/grounds-work-5.jpg" },
      { caption: "집게차로 폐목 처리", src: "images/grounds-work-6.jpg" },
    ],
  },
  {
    id: "sajik",
    title: "사직중학교 화단 정원수 전정",
    cover: "images/sajik-2-after.jpg",
    client: "사직중학교",
    category: "학교",
    work: "화단 정원수 전정 · 둥근 수형 다듬기 · 관목 정리",
    desc:
      "교사 앞뒤 화단과 도로변 화단의 향나무, 소나무, 둥근 정원수를 다듬었습니다. 덩어리져 있던 나무를 층층이 솎아 내 수형을 살리고, 경사 화단의 관목은 낮게 정리해 건물이 또렷하게 보이도록 했습니다.",
    pairs: [
      { caption: "건물 옆 화단 둥근 정원수 전정", before: "images/sajik-1-before.jpg", after: "images/sajik-1-after.jpg" },
      { caption: "도로변 화단 향나무 수형 다듬기", before: "images/sajik-2-before.jpg", after: "images/sajik-2-after.jpg" },
      { caption: "교사 앞 화단 정원수 전정", before: "images/sajik-3-before.jpg", after: "images/sajik-3-after.jpg" },
      { caption: "뒤뜰 화단 관목 정리", before: "images/sajik-4-before.jpg", after: "images/sajik-4-after.jpg" },
      { caption: "모퉁이 화단 소나무·관목 전정", before: "images/sajik-5-before.jpg", after: "images/sajik-5-after.jpg" },
      { caption: "계단 옆 경사 화단 관목 정리", before: "images/sajik-6-before.jpg", after: "images/sajik-6-after.jpg" },
    ],
  },
  {
    id: "dangpyeong",
    category: "학교",
    title: "당평 초등학교 조경작업",
    cover: "images/school-5-after.jpg",
    client: "당평 초등학교",
    location: "",
    work: "교내 수목 전정 · 수형 다듬기",
    desc:
      "학교 건물 주변, 아치 통로, 운동장 펜스를 따라 심어진 향나무와 정원수를 전정했습니다. 웃자란 가지를 정리해 둥근 수형을 살리고 통로를 넓고 밝게 만들었습니다.",
    pairs: [
      { caption: "건물 옆 화단 정원수 전정", before: "images/school-1-before.jpg", after: "images/school-1-after.jpg" },
      { caption: "아치 통로 옆 소나무 수형 다듬기", before: "images/school-2-before.jpg", after: "images/school-2-after.jpg" },
      { caption: "운동장 펜스 옆 수목 전정", before: "images/school-3-before.jpg", after: "images/school-3-after.jpg" },
      { caption: "동백나무·향나무 통로 정비", before: "images/school-4-before.jpg", after: "images/school-4-after.jpg" },
      { caption: "운동장 계단 옆 수목 전정", before: "images/school-5-before.jpg", after: "images/school-5-after.jpg" },
      { caption: "건물 뒤뜰 향나무 전정", before: "images/school-6-before.jpg", after: "images/school-6-after.jpg" },
    ],
  },
  {
    id: "illua",
    category: "호텔·상업시설",
    title: "ILLUA호텔 조경작업",
    cover: "images/illua-3-after.jpg",
    client: "호텔 일루아 (HOTEL UNDER THE MOON ILLUA)",
    location: "",           // 예: "부산 해운대구"
    work: "수목 전정 · 관목 정리 · 화단 정비",
    desc:
      "호텔 진입로, 정문, 주차장, 담장 주변 조경수를 정비했습니다. 웃자란 소나무와 관목의 수형을 다듬어 호텔 간판과 입구가 한눈에 들어오도록 했습니다.",
    pairs: [
      { caption: "진입로 간판 화단 정비", before: "images/illua-1-before.jpg", after: "images/illua-1-after.jpg" },
      { caption: "석등 정원 수형 다듬기", before: "images/illua-2-before.jpg", after: "images/illua-2-after.jpg" },
      { caption: "도로변 경사 화단 전정", before: "images/illua-3-before.jpg", after: "images/illua-3-after.jpg" },
      { caption: "담장 소나무 전정", before: "images/illua-4-before.jpg", after: "images/illua-4-after.jpg" },
      { caption: "호텔 정문 관목 화단 정리", before: "images/illua-5-before.jpg", after: "images/illua-5-after.jpg" },
      { caption: "주차장 입구 소나무 전정", before: "images/illua-6-before.jpg", after: "images/illua-6-after.jpg" },
    ],
  },
  {
    id: "school",
    category: "학교",
    title: "학교 교정 조경작업",
    client: "",
    location: "",
    work: "교정 수목 전정 · 수형 다듬기",
    desc:
      "학교 진입로와 건물 앞 화단, 교정 정원의 소나무, 향나무, 관목을 다듬었습니다. 웃자란 가지를 정리해 나무마다 단정한 수형을 살렸습니다.",
    pairs: [
      { caption: "학교 진입로 소나무·관목 정리", before: "images/school2-1-before.jpg", after: "images/school2-1-after.jpg" },
      { caption: "건물 앞 향나무 화단 전정", before: "images/school2-2-before.jpg", after: "images/school2-2-after.jpg" },
      { caption: "교정 정원 향나무 수형 다듬기", before: "images/school2-3-before.jpg", after: "images/school2-3-after.jpg" },
      { caption: "건물 옆 화단 관목 전정", before: "images/school2-4-before.jpg", after: "images/school2-4-after.jpg" },
    ],
  },
];

// 자주 묻는 질문. 검색에 잘 걸리도록 손님이 실제로 검색하는 말로 적어 주세요.
const FAQ = [
  { q: "부산 수목 전정·가지치기 비용은 어떻게 정해지나요?", a: "나무의 수(그루 수)와 크기, 고소작업차·굴착기 같은 장비 필요 여부, 폐목 처리량으로 정해집니다. 현장을 보고 항목별로 견적을 드리며 상담과 현장 방문은 무료입니다." },
  { q: "작업은 얼마나 걸리나요?", a: "전정 작업은 작업 범위에 따라 달라집니다. 나무의 수와 크기, 장비 필요 여부를 현장에서 보고 일정을 알려드립니다." },
  { q: "잘라낸 가지와 폐목은 어떻게 하나요?", a: "작업 완료와 동시에 처리합니다." },
  { q: "학교·공공기관도 가능한가요?", a: "국립부산과학관, 중학교, 초등학교 등 공공기관과 학교 현장을 여러 곳 작업했습니다. 작업이 끝나면 작업 전·후 사진 보고서를 드립니다." },
  { q: "어느 지역까지 오시나요?", a: "부산 전역에서 작업합니다. 그 밖의 지역도 가능하니 문의해 주세요." },
  { q: "묘지·산소 벌초도 해 주시나요?", a: "네, 벌초 대행과 산소 주변 잡초·잡목 정리, 묘지 둘레 나무 전정을 합니다. 멀리 계셔서 직접 오기 어려운 분께는 작업 전·후 사진을 보내 드립니다." },
  { q: "정기 관리도 하나요?", a: "봄·가을 전정, 여름 생울타리 정리처럼 연 2~3회 정기 관리 계약이 가능합니다. 호텔·사옥·아파트 단지에 알맞습니다." },
];

const PROCESS = [
  { step: "상담·현장 방문", desc: "현장을 보고 원하시는 방향과 일정을 듣습니다." },
  { step: "견적", desc: "작업 범위와 항목별 비용을 정리해 드립니다." },
  { step: "작업", desc: "필요한 장비와 인력으로 약속한 일정에 작업합니다." },
  { step: "작업 보고서", desc: "작업 전·후 사진을 담은 보고서를 드립니다." },
];

// 고객 후기. 실제로 받은 후기만 적어 주세요. (비워 두면 숨겨집니다)
// 예: { text: "입구가 훨씬 깔끔해졌습니다.", who: "OO호텔 시설팀" }
const REVIEWS = [];
