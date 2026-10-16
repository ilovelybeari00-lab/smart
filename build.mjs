// 정적 페이지 빌드: assets/data.js + templates/ → index.html, works.html, cases/*.html, sitemap.xml, robots.txt
// 실행: node build.mjs   (data.js를 고친 뒤 꼭 한 번 실행하고 함께 올려 주세요)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const root = path.dirname(new URL(import.meta.url).pathname);
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const write = (p, s) => {
  fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
  fs.writeFileSync(path.join(root, p), s);
  console.log("wrote", p);
};

// data.js 는 const 선언만 있는 파일이라 함수로 감싸 평가합니다.
const dataSrc = read("assets/data.js");
const D = new Function(dataSrc + "\nreturn { COMPANY, STATS, SERVICES, PROJECTS, PROCESS, REVIEWS, FAQ };")();
const { COMPANY: C, STATS, SERVICES, PROJECTS, PROCESS, REVIEWS, FAQ } = D;
const RENDER = require("./assets/render.js");
const esc = RENDER.esc;
const site = C.siteUrl.replace(/\/?$/, "/");
const tel = "tel:" + C.phone.replace(/[^0-9+]/g, "");
const today = new Date().toISOString().slice(0, 10);

function fill(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : ""));
}

function headHTML({ title, description, url, image, jsonld, base }) {
  const img = image ? site + image : site + "images/hero.jpg";
  return [
    `  <title>${esc(title)}</title>`,
    `  <meta name="description" content="${esc(description)}" />`,
    `  <meta name="keywords" content="${esc(C.keywords.join(", "))}" />`,
    `  <link rel="canonical" href="${esc(url)}" />`,
    `  <meta name="robots" content="index, follow" />`,
    C.naverVerify ? `  <meta name="naver-site-verification" content="${esc(C.naverVerify)}" />` : "",
    C.googleVerify ? `  <meta name="google-site-verification" content="${esc(C.googleVerify)}" />` : "",
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:site_name" content="${esc(C.name)}" />`,
    `  <meta property="og:title" content="${esc(title)}" />`,
    `  <meta property="og:description" content="${esc(description)}" />`,
    `  <meta property="og:url" content="${esc(url)}" />`,
    `  <meta property="og:image" content="${esc(img)}" />`,
    `  <meta property="og:locale" content="ko_KR" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>`,
  ]
    .filter(Boolean)
    .join("\n");
}

const business = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": site + "#business",
  name: C.name,
  description: C.seoDescription,
  url: site,
  telephone: C.phone,
  email: C.email,
  image: site + "images/hero.jpg",
  areaServed: C.serviceArea,
  address: C.address ? { "@type": "PostalAddress", streetAddress: C.address, addressRegion: C.region, addressCountry: "KR" } : { "@type": "PostalAddress", addressRegion: C.region, addressCountry: "KR" },
  makesOffer: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.desc } })),
};

const common = (base) => ({
  base,
  name: esc(C.name),
  region: esc(C.region),
  serviceArea: esc(C.serviceArea),
  tel,
  bizItem: C.bizNumber ? ` · 사업자등록번호 ${esc(C.bizNumber)}` : "",
  footerArea: esc(`${C.region} 조경업체 · 수목 전정 · 가지치기 · 화단 조성 · 묘지·산소 관리 · 작업 지역: ${C.serviceArea}`),
});

// ---------- index.html ----------
{
  const R = RENDER.make("");
  const featured = PROJECTS[0];
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const vars = {
    ...common(""),
    head: headHTML({ title: C.seoTitle, description: C.seoDescription, url: site, jsonld: [business, faqLd], base: "" }),
    slogan: esc(C.slogan),
    intro: esc(C.intro),
    licenses: C.licenses.map((l) => `<li>✔ ${esc(l)}</li>`).join(""),
    statsSection: STATS.length ? `<section class="stats" id="stats-section"><div class="wrap stats-grid" id="stats">${R.statsHTML(STATS)}</div></section>` : "",
    featured: R.caseHTML(featured, "h3", 4),
    projectCount: PROJECTS.length,
    clients: R.clientsHTML(PROJECTS),
    services: R.servicesHTML(SERVICES),
    process: R.processHTML(PROCESS),
    faq: R.faqHTML(FAQ),
    reviewsSection: REVIEWS.length ? `<section class="section" id="reviews-section"><div class="wrap"><h2>고객 후기</h2><div class="reviews">${R.reviewsHTML(REVIEWS)}</div></div></section>` : "",
    phone: esc(C.phone),
    email: esc(C.email),
    kakaoItem: C.kakao ? `<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-4.6A8 8 0 1 1 21 12Z"/></svg><a href="${esc(C.kakao)}" target="_blank" rel="noopener">카카오톡 상담</a></li>` : "",
    addressItem: C.address ? `<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>${esc(C.address)}</span></li>` : "",
    typeOptions: ["호텔·상업시설", "아파트·단지", "학교·공공시설", "주택정원", "묘지·산소 관리", "정기 관리", "기타"].map((c) => `<option>${esc(c)}</option>`).join(""),
  };
  write("index.html", fill(read("templates/index.html"), vars));
}

// ---------- works.html ----------
{
  const R = RENDER.make("");
  const title = `${C.region} 조경 시공사례 | ${C.name}`;
  const description = `${C.region} 학교·공공기관·호텔·사옥·빌라 수목 전정과 화단 조성 시공사례. 현장별 작업 전·후 사진을 비교해 보세요.`;
  const ld = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, url: site + "works.html", hasPart: PROJECTS.map((p) => ({ "@type": "WebPage", name: p.title, url: site + R.caseUrl(p) })) };
  const vars = {
    ...common(""),
    head: headHTML({ title, description, url: site + "works.html", image: PROJECTS[0].cover, jsonld: ld, base: "" }),
    projectCount: PROJECTS.length,
    filter: R.filterHTML(PROJECTS),
    cards: PROJECTS.map(R.cardHTML).join(""),
  };
  write("works.html", fill(read("templates/works.html"), vars));
}

// ---------- cases/<id>.html ----------
for (const p of PROJECTS) {
  const R = RENDER.make("../");
  const cover = p.cover || (p.pairs[0] && p.pairs[0].after) || (p.progress && p.progress[0].src);
  const title = `${p.title} | ${C.region} 조경 시공사례 - ${C.name}`;
  const description = `${p.work}. ${p.desc}`.slice(0, 150);
  const url = site + `cases/${encodeURIComponent(p.id)}.html`;
  const ld = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: site },
      { "@type": "ListItem", position: 2, name: "시공사례", item: site + "works.html" },
      { "@type": "ListItem", position: 3, name: p.title, item: url },
    ] },
    { "@context": "https://schema.org", "@type": "Article", headline: p.title, description, image: site + cover, url, author: { "@id": site + "#business" }, publisher: { "@id": site + "#business" }, about: p.work },
  ];
  const vars = {
    ...common("../"),
    head: headHTML({ title, description, url, image: cover, jsonld: ld, base: "../" }),
    caseTitle: esc(p.title),
    caseDetail: R.caseHTML(p, "h1"),
    otherCards: PROJECTS.filter((x) => x !== p).map(R.cardHTML).join(""),
  };
  write(`cases/${p.id}.html`, fill(read("templates/case.html"), vars));
}

// 예전 주소(case.html#id) → 새 주소로 보내기
write(
  "case.html",
  `<!doctype html><html lang="ko"><head><meta charset="utf-8" /><title>${esc(C.name)} 시공사례</title><meta name="robots" content="noindex" />
<script>var id=decodeURIComponent(location.hash.slice(1));location.replace(id?"cases/"+encodeURIComponent(id)+".html":"works.html");</script>
</head><body><a href="works.html">시공사례 목록으로</a></body></html>\n`
);

// ---------- sitemap.xml, robots.txt ----------
const urls = [
  { loc: site, priority: "1.0" },
  { loc: site + "works.html", priority: "0.9" },
  ...PROJECTS.map((p) => ({ loc: site + `cases/${encodeURIComponent(p.id)}.html`, priority: "0.8" })),
];
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join("\n") +
    `\n</urlset>\n`
);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`);
