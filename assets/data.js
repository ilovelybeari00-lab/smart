// =============================================================
//  이 파일만 고치면 사이트 내용이 바뀝니다.
//  사진은 images/ 폴더에 넣고 경로를 적어 주세요. (예: "images/apt-1.jpg")
//  비워 둔 항목("" 또는 [])은 사이트에 표시되지 않습니다.
// =============================================================

const COMPANY = {
  name: "스마트조경",
  slogan: "다듬을수록 가치가 드러나는 조경",
  intro:
    "호텔·상가·아파트의 수목 전정과 화단 정비를 전문으로 합니다. 하루 작업으로 건물의 첫인상이 달라집니다.",
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
  { icon: "🌸", title: "화단 정비", desc: "잡초와 고사목을 정리하고 화단 경계를 깔끔하게 정돈합니다." },
  { icon: "🚛", title: "고소작업 장비 보유", desc: "높은 수목도 고소작업차로 안전하게 작업합니다." },
];

// 시공 사례. pairs 에 시공 전·후 사진을 짝지어 넣습니다.
const PROJECTS = [
  {
    title: "ILLUA호텔 조경작업",
    client: "호텔 일루아 (HOTEL UNDER THE MOON ILLUA)",
    location: "",           // 예: "부산 해운대구"
    date: "2017년 7월",
    work: "수목 전정 · 관목 정리 · 화단 정비",
    desc:
      "호텔 진입로, 정문, 주차장, 담장 주변 조경수를 정비했습니다. 웃자란 소나무와 관목의 수형을 다듬어 호텔 간판과 입구가 한눈에 들어오도록 했습니다.",
    pairs: [
      { caption: "주차장 입구 소나무 전정", before: "images/illua-1-before.jpg", after: "images/illua-1-after.jpg" },
      { caption: "호텔 정문 관목 화단 정리", before: "images/illua-2-before.jpg", after: "images/illua-2-after.jpg" },
      { caption: "진입로 간판 화단 정비", before: "images/illua-3-before.jpg", after: "images/illua-3-after.jpg" },
      { caption: "석등 정원 수형 다듬기", before: "images/illua-4-before.jpg", after: "images/illua-4-after.jpg" },
      { caption: "도로변 경사 화단 전정", before: "images/illua-5-before.jpg", after: "images/illua-5-after.jpg" },
      { caption: "담장 소나무 전정", before: "images/illua-6-before.jpg", after: "images/illua-6-after.jpg" },
    ],
  },
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
