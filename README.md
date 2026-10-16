# 조경 홍보 홈페이지

조경 시공 사례를 보여주고 상담·견적 문의를 받아 계약으로 연결하기 위한 한 페이지짜리 홈페이지입니다.
별도 서버 없이 HTML 파일만으로 동작합니다.

## 구성

| 영역 | 역할 |
| --- | --- |
| 메인 배너 | 회사 슬로건, 면허·보증 배지, 상담 버튼 |
| 실적 숫자 | 누적 현장 수, 업력 등 신뢰 지표 |
| 시공 사례 | 분야(학교·공공시설·호텔·상업시설·주택·빌라) 필터가 있는 포트폴리오 |
| 시공 전·후 비교 | 슬라이더로 변화를 직접 비교 |
| 서비스 / 진행 과정 / 고객 후기 | 계약 전 궁금한 점 해소 |
| 상담 신청 폼 | 메일로 문의 내용 전달, 전화 버튼 상시 노출 |

## 내용 바꾸는 법

**`assets/data.js` 파일을 고친 뒤 `node build.mjs`를 한 번 실행합니다.**
(검색 로봇이 내용을 읽을 수 있도록 `index.html`, `works.html`, `cases/*.html`, `sitemap.xml`을 미리 만들어 두는 과정입니다.
템플릿은 `templates/`, 화면 조각은 `assets/render.js`에 있습니다. 만들어진 파일은 직접 고치지 말고 data.js와 템플릿을 고쳐 주세요.)

- `COMPANY`: 회사명, 전화번호, 이메일, 주소, 카카오톡 상담 주소
- `STATS`: 실적 숫자
- `PROJECTS`: 시공 사례 (제목, 분야 `category`, 설명, 작업 전·후 사진 `pairs`, 작업 과정 사진 `progress`, 영상 `video`)
- `BEFORE_AFTER`: 시공 전·후 사진
- `REVIEWS`: 고객 후기
- `FAQ`: 자주 묻는 질문 (검색 노출에 도움이 됩니다)
- `region`, `serviceArea`, `siteUrl`, `seoTitle`, `seoDescription`, `keywords`: 검색 노출 설정
- `naverVerify`, `googleVerify`: 네이버 서치어드바이저·구글 서치콘솔 소유확인 값

### 사진 넣기

1. 사진을 `images/` 폴더에 넣습니다. (가로 1600px 정도의 JPG면 충분합니다)
2. `data.js`에서 `image: "images/파일이름.jpg"`처럼 경로를 적습니다.
3. 메인 배너 배경은 `images/hero.jpg` 이름으로 넣으면 자동 적용됩니다.

### 한글(hwp) 작업보고서에서 사진 꺼내기

작업 전·후 사진이 들어 있는 한글 문서를 주시면, 문서 순서대로 사진을 꺼내 `images/현장-번호-before.jpg`, `images/현장-번호-after.jpg` 이름으로 저장하고 `data.js`에 사례를 추가합니다.
(문서 안 사진은 저장 순서와 보이는 순서가 다를 수 있어, 문서를 읽어 실제 배치 순서로 맞춥니다.)

### 영상 넣기

`video/` 폴더에 20~30초, 10MB 이하로 줄인 mp4를 넣고 `data.js`의 해당 사례에 `video: { src, poster, caption }`을 적습니다.
원본 영상(수백 MB)은 GitHub에 올라가지 않으니 반드시 줄여서 넣어 주세요.

## 미리 보기

`index.html`을 브라우저로 열면 바로 보입니다. 시공사례 목록은 `works.html`, 현장별 상세는 `case.html#현장id` 입니다.

## 인터넷에 공개하기 (무료, GitHub Pages)

1. GitHub 저장소 → **Settings → Pages**
2. Source를 `Deploy from a branch`, 브랜치는 `main` / `/ (root)` 선택
3. 몇 분 뒤 `https://<아이디>.github.io/smart/` 주소로 접속됩니다.

## 네이버·구글 검색에 등록하기 (공개한 뒤)

1. **네이버 서치어드바이저** (searchadvisor.naver.com) → 웹마스터 도구 → 사이트 등록에 위 주소 입력
   → "HTML 태그" 방식의 `content` 값을 `data.js`의 `naverVerify`에 넣고 `node build.mjs` → 올린 뒤 소유확인
   → 요청 → 사이트맵 제출에 `sitemap.xml` 주소 입력, RSS 없이 진행
2. **구글 서치콘솔** (search.google.com/search-console) → URL 접두어로 등록
   → "HTML 태그"의 `content` 값을 `googleVerify`에 넣고 같은 방법으로 확인 → Sitemaps에 `sitemap.xml` 제출
3. **네이버 스마트플레이스**(지도)에 업체 등록 후 홈페이지 주소를 넣으면 지역 검색("부산 조경업체")에 함께 뜹니다.
4. 등록 후 1~2주 지나 네이버에서 `site:` 주소로 검색해 수집됐는지 확인합니다.

공개한 뒤에는 이렇게 알리면 좋습니다.
네이버 스마트플레이스와 블로그, 명함 QR코드, 견적서 하단, 관리사무소·건설사에 보내는 제안 메일에 이 주소를 넣으세요.
