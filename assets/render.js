// 화면 조각을 만드는 함수들. 브라우저(main.js)와 빌드 스크립트(build.mjs)가 같이 씁니다.
(function (root) {
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // base: 페이지 위치에 따른 경로 접두어 ("" 또는 "../")
  function make(base) {
    const u = (p) => base + p;
    const caseUrl = (p) => u(`cases/${encodeURIComponent(p.id)}.html`);

    function pairsHTML(p, limit) {
      return (limit ? p.pairs.slice(0, limit) : p.pairs)
        .map(
          (x, i) => `
      <figure class="pair">
        <figcaption><span class="num">${String(i + 1).padStart(2, "0")}</span>${esc(x.caption)}</figcaption>
        <div class="pair-imgs">
          <button type="button" class="shot" data-full="${esc(u(x.before))}" data-label="${esc(x.caption)} · 작업 전">
            <img src="${esc(u(x.before))}" alt="${esc(p.title)} - ${esc(x.caption)} 작업 전" loading="lazy" />
            <span class="tag before">작업 전</span>
          </button>
          <button type="button" class="shot" data-full="${esc(u(x.after))}" data-label="${esc(x.caption)} · 작업 후">
            <img src="${esc(u(x.after))}" alt="${esc(p.title)} - ${esc(x.caption)} 작업 후" loading="lazy" />
            <span class="tag after">작업 후</span>
          </button>
        </div>
      </figure>`
        )
        .join("");
    }

    function progressHTML(p) {
      if (!p.progress || !p.progress.length) return "";
      return `
      <h4 class="progress-title">작업 과정</h4>
      <div class="progress">
        ${p.progress
          .map(
            (x) => `
          <figure>
            <button type="button" class="shot" data-full="${esc(u(x.src))}" data-label="${esc(x.caption)}">
              <img src="${esc(u(x.src))}" alt="${esc(p.title)} - ${esc(x.caption)}" loading="lazy" />
            </button>
            <figcaption>${esc(x.caption)}</figcaption>
          </figure>`
          )
          .join("")}
      </div>`;
    }

    function videoHTML(p, auto) {
      if (!p.video || !p.video.src) return "";
      const attrs = auto ? 'autoplay muted loop playsinline preload="auto"' : 'controls muted playsinline preload="metadata"';
      return `
      ${auto ? "" : '<h4 class="progress-title">작업 영상</h4>'}
      <figure class="video${auto ? " video-auto" : ""}">
        <video src="${esc(u(p.video.src))}" poster="${esc(u(p.video.poster || ""))}" ${attrs}></video>
        ${p.video.caption ? `<figcaption>${esc(p.video.caption)}</figcaption>` : ""}
      </figure>`;
    }

    function caseHTML(p, headingTag, limit) {
      const meta = [p.client, p.location, p.work].filter(Boolean);
      const h = headingTag || "h3";
      const more =
        limit && p.pairs.length > limit
          ? `<p class="more-pairs"><a href="${caseUrl(p)}" class="btn btn-outline">이 현장 작업 전·후 ${p.pairs.length}쌍 모두 보기 →</a></p>`
          : "";
      return `
      <article class="case">
        <div class="case-head">
          <${h}>${esc(p.title)}</${h}>
          <ul class="case-meta">${meta.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
          <p>${esc(p.desc)}</p>
        </div>
        ${limit ? videoHTML(p, true) : ""}
        <div class="pairs">${pairsHTML(p, limit)}</div>
        ${more}
        ${limit ? (p.pairs.length ? "" : progressHTML(p)) : videoHTML(p) + progressHTML(p)}
      </article>`;
    }

    function cardHTML(p) {
      const cover = p.cover || (p.pairs[0] && p.pairs[0].after) || (p.progress && p.progress[0].src);
      const count = [
        p.pairs.length ? `작업 전·후 ${p.pairs.length}쌍` : "",
        p.progress && p.progress.length ? `사진 ${p.progress.length}장` : "",
        p.video ? "영상" : "",
      ]
        .filter(Boolean)
        .join(" · ");
      return `
      <a class="case-card" href="${caseUrl(p)}" data-category="${esc(p.category || "")}">
        <div class="case-card-img">
          <img src="${esc(u(cover))}" alt="${esc(p.title)} 작업 후" loading="lazy" />
          <span class="tag after">${p.pairs.length ? "작업 후" : "완성"}</span>
        </div>
        <div class="case-card-body">
          ${p.category ? `<p class="case-card-cat">${esc(p.category)}</p>` : ""}
          <h3>${esc(p.title)}</h3>
          <p class="case-card-work">${esc(p.work)}</p>
          <p class="case-card-count">${esc(count)}</p>
          <span class="case-card-more">자세히 보기 →</span>
        </div>
      </a>`;
    }

    const statsHTML = (STATS) =>
      STATS.map((s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("");
    const servicesHTML = (SERVICES) =>
      SERVICES.map((s) => `<div class="card"><div class="icon">${s.icon}</div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`).join("");
    const processHTML = (PROCESS) => PROCESS.map((p) => `<li><strong>${esc(p.step)}</strong><p>${esc(p.desc)}</p></li>`).join("");
    const reviewsHTML = (REVIEWS) =>
      REVIEWS.map((r) => `<blockquote class="review"><p>“${esc(r.text)}”</p><cite>${esc(r.who)}</cite></blockquote>`).join("");
    const faqHTML = (FAQ) =>
      FAQ.map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
    const clientsHTML = (PROJECTS) =>
      [...new Set(PROJECTS.map((p) => p.client).filter(Boolean))].map((c) => `<li>${esc(c)}</li>`).join("");
    const filterHTML = (PROJECTS) => {
      const cats = [...new Set(PROJECTS.map((p) => p.category).filter(Boolean))];
      if (cats.length < 2) return "";
      return ["전체", ...cats]
        .map((c, i) => `<button type="button" class="chip${i === 0 ? " on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
        .join("");
    };

    return { esc, u, caseUrl, pairsHTML, progressHTML, videoHTML, caseHTML, cardHTML, statsHTML, servicesHTML, processHTML, reviewsHTML, faqHTML, clientsHTML, filterHTML };
  }

  const api = { esc, make };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.RENDER = api;
})(typeof window !== "undefined" ? window : globalThis);
