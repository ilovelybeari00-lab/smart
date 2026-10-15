(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hide = (id) => ($(id).hidden = true);

  // 회사 기본 정보
  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.textContent = COMPANY[el.dataset.bind] || "";
  });
  document.title = `${COMPANY.name} | ${COMPANY.slogan}`;
  $("year").textContent = new Date().getFullYear();
  $("licenses").innerHTML = COMPANY.licenses.map((l) => `<li>✔ ${esc(l)}</li>`).join("");
  if (!COMPANY.address) hide("address-item");
  if (!COMPANY.bizNumber) hide("biz-item");

  const tel = "tel:" + COMPANY.phone.replace(/[^0-9+]/g, "");
  $("phone-link").href = tel;
  $("phone-link").textContent = COMPANY.phone;
  $("float-call").href = tel;
  $("email-link").href = "mailto:" + COMPANY.email;
  $("email-link").textContent = COMPANY.email;
  if (COMPANY.kakao) {
    $("kakao-item").hidden = false;
    $("kakao-link").href = COMPANY.kakao;
  }

  // 실적 숫자
  if (STATS.length) {
    $("stats").innerHTML = STATS.map(
      (s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`
    ).join("");
  } else hide("stats-section");

  // 시공 사례: 프로젝트마다 개요 + 시공 전·후 비교 슬라이더
  $("projects").innerHTML = PROJECTS.map((p) => {
    const meta = [p.client, p.location, p.date, p.work].filter(Boolean);
    return `
      <article class="case">
        <div class="case-head">
          <h3>${esc(p.title)}</h3>
          <ul class="case-meta">${meta.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
          <p>${esc(p.desc)}</p>
        </div>
        <div class="pairs">
          ${p.pairs
            .map(
              (x, i) => `
            <figure class="pair">
              <figcaption><span class="num">${String(i + 1).padStart(2, "0")}</span>${esc(x.caption)}</figcaption>
              <div class="pair-imgs">
                <button type="button" class="shot" data-full="${esc(x.before)}" data-label="${esc(x.caption)} · 작업 전">
                  <img src="${esc(x.before)}" alt="${esc(x.caption)} 작업 전" loading="lazy" />
                  <span class="tag before">작업 전</span>
                </button>
                <button type="button" class="shot" data-full="${esc(x.after)}" data-label="${esc(x.caption)} · 작업 후">
                  <img src="${esc(x.after)}" alt="${esc(x.caption)} 작업 후" loading="lazy" />
                  <span class="tag after">작업 후</span>
                </button>
              </div>
            </figure>`
            )
            .join("")}
        </div>
        ${
          p.progress && p.progress.length
            ? `<h4 class="progress-title">작업 과정</h4>
        <div class="progress">
          ${p.progress
            .map(
              (x) => `
            <figure>
              <button type="button" class="shot" data-full="${esc(x.src)}" data-label="${esc(x.caption)}">
                <img src="${esc(x.src)}" alt="${esc(x.caption)}" loading="lazy" />
              </button>
              <figcaption>${esc(x.caption)}</figcaption>
            </figure>`
            )
            .join("")}
        </div>`
            : ""
        }
      </article>`;
  }).join("");

  // 사진을 누르면 크게 보기
  const box = $("lightbox");
  document.addEventListener("click", (e) => {
    const shot = e.target.closest(".shot");
    if (shot) {
      $("lightbox-img").src = shot.dataset.full;
      $("lightbox-cap").textContent = shot.dataset.label;
      box.hidden = false;
    } else if (!box.hidden && e.target.closest("#lightbox")) {
      box.hidden = true;
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") box.hidden = true;
  });

  // 서비스, 진행과정, 후기
  $("services-list").innerHTML = SERVICES.map(
    (s) => `<div class="card"><div class="icon">${s.icon}</div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`
  ).join("");
  $("process-list").innerHTML = PROCESS.map(
    (p) => `<li><strong>${esc(p.step)}</strong><p>${esc(p.desc)}</p></li>`
  ).join("");
  if (REVIEWS.length) {
    $("reviews").innerHTML = REVIEWS.map(
      (r) => `<blockquote class="review"><p>“${esc(r.text)}”</p><cite>${esc(r.who)}</cite></blockquote>`
    ).join("");
  } else hide("reviews-section");

  // 상담 신청 폼 → 메일 앱으로 전달
  $("type-select").innerHTML = ["호텔·상업시설", "아파트·단지", "공공시설", "주택정원", "정기 관리", "기타"]
    .map((c) => `<option>${esc(c)}</option>`)
    .join("");
  $("inquiry").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `[상담 신청] ${f.get("name")} - ${f.get("type")}`;
    const body = [
      `성함/업체명: ${f.get("name")}`,
      `연락처: ${f.get("phone")}`,
      `현장 유형: ${f.get("type")}`,
      `현장 위치: ${f.get("location")}`,
      `면적/예산: ${f.get("budget")}`,
      "",
      `${f.get("message")}`,
    ].join("\n");
    location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
