(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hide = (id) => $(id) && ($(id).hidden = true);
  const caseUrl = (p) => `case.html#${encodeURIComponent(p.id)}`;

  // ---------- 공통: 회사 정보, 전화 버튼 ----------
  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.textContent = COMPANY[el.dataset.bind] || "";
  });
  if ($("year")) $("year").textContent = new Date().getFullYear();
  if (!COMPANY.address) hide("address-item");
  if (!COMPANY.bizNumber) hide("biz-item");
  const tel = "tel:" + COMPANY.phone.replace(/[^0-9+]/g, "");
  if ($("float-call")) $("float-call").href = tel;

  // ---------- 공통: 시공 사례 그리기 ----------
  function pairsHTML(p) {
    return p.pairs
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
            <button type="button" class="shot" data-full="${esc(x.src)}" data-label="${esc(x.caption)}">
              <img src="${esc(x.src)}" alt="${esc(x.caption)}" loading="lazy" />
            </button>
            <figcaption>${esc(x.caption)}</figcaption>
          </figure>`
          )
          .join("")}
      </div>`;
  }

  function caseHTML(p, headingTag) {
    const meta = [p.client, p.location, p.work].filter(Boolean);
    const h = headingTag || "h3";
    return `
      <article class="case">
        <div class="case-head">
          <${h}>${esc(p.title)}</${h}>
          <ul class="case-meta">${meta.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
          <p>${esc(p.desc)}</p>
        </div>
        <div class="pairs">${pairsHTML(p)}</div>
        ${progressHTML(p)}
      </article>`;
  }

  function cardHTML(p) {
    const cover = p.cover || p.pairs[0].after;
    const count =
      `작업 전·후 ${p.pairs.length}쌍` + (p.progress && p.progress.length ? ` · 작업 과정 ${p.progress.length}장` : "");
    return `
      <a class="case-card" href="${caseUrl(p)}">
        <div class="case-card-img">
          <img src="${esc(cover)}" alt="${esc(p.title)}" loading="lazy" />
          <span class="tag after">작업 후</span>
        </div>
        <div class="case-card-body">
          <h3>${esc(p.title)}</h3>
          <p class="case-card-work">${esc(p.work)}</p>
          <p class="case-card-count">${esc(count)}</p>
          <span class="case-card-more">자세히 보기 →</span>
        </div>
      </a>`;
  }

  // ---------- 첫 화면 ----------
  if ($("featured")) {
    document.title = `${COMPANY.name} | ${COMPANY.slogan}`;
    $("licenses").innerHTML = COMPANY.licenses.map((l) => `<li>✔ ${esc(l)}</li>`).join("");

    $("featured").innerHTML = caseHTML(PROJECTS[0]);
    $("all-cases-link").textContent = `시공사례 전체 보기 (${PROJECTS.length}곳) →`;

    if (STATS.length) {
      $("stats").innerHTML = STATS.map(
        (s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`
      ).join("");
    } else hide("stats-section");

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

    $("phone-link").href = tel;
    $("phone-link").textContent = COMPANY.phone;
    $("email-link").href = "mailto:" + COMPANY.email;
    $("email-link").textContent = COMPANY.email;
    if (COMPANY.kakao) {
      $("kakao-item").hidden = false;
      $("kakao-link").href = COMPANY.kakao;
    }

    // 상담 신청 폼 → 메일 앱으로 전달
    $("type-select").innerHTML = ["호텔·상업시설", "아파트·단지", "학교·공공시설", "주택정원", "정기 관리", "기타"]
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
  }

  // ---------- 시공사례 목록 ----------
  if ($("case-list")) {
    document.title = `시공사례 | ${COMPANY.name}`;
    $("case-count").textContent = `직접 작업한 현장 ${PROJECTS.length}곳입니다. 현장을 누르면 작업 전·후 사진을 볼 수 있습니다.`;
    $("case-list").innerHTML = PROJECTS.map(cardHTML).join("");
  }

  // ---------- 현장별 상세 ----------
  if ($("case-detail")) {
    const render = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];
      document.title = `${p.title} | ${COMPANY.name}`;
      $("case-detail").innerHTML = caseHTML(p, "h1");
      $("other-cases").innerHTML = PROJECTS.filter((x) => x !== p).map(cardHTML).join("");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", render);
    render();
  }

  // ---------- 공통: 사진을 누르면 크게 보기 ----------
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
})();
