(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // 사진이 없을 때 보여줄 임시 배경
  const PLACEHOLDERS = [
    "linear-gradient(135deg,#3f7d4e,#9cc89a)",
    "linear-gradient(135deg,#2f5d50,#7fb3a0)",
    "linear-gradient(135deg,#5b7d3a,#c4d88b)",
    "linear-gradient(135deg,#46684a,#a7c4a0)",
  ];
  const bg = (img, i) => (img ? `url("${img}") center/cover no-repeat` : PLACEHOLDERS[i % PLACEHOLDERS.length]);

  // 회사 기본 정보
  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.textContent = COMPANY[el.dataset.bind] || "";
  });
  document.title = `${COMPANY.name} | ${COMPANY.slogan}`;
  $("year").textContent = new Date().getFullYear();
  $("licenses").innerHTML = COMPANY.licenses.map((l) => `<li>✔ ${esc(l)}</li>`).join("");

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
  $("stats").innerHTML = STATS.map(
    (s) => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`
  ).join("");

  // 포트폴리오 + 필터
  let current = "전체";
  function renderProjects() {
    const list = PROJECTS.filter((p) => current === "전체" || p.category === current);
    $("projects").innerHTML = list.length
      ? list
          .map(
            (p, i) => `
        <article class="project">
          <div class="thumb" style='background:${bg(p.image, i)}'>
            ${p.image ? "" : '<span class="ph">사진 준비 중</span>'}
            <span class="chip">${esc(p.category)}</span>
          </div>
          <div class="body">
            <h3>${esc(p.title)}</h3>
            <p class="meta">${esc(p.location)} · ${esc(p.year)} · ${esc(p.area)}</p>
            <p>${esc(p.desc)}</p>
          </div>
        </article>`
          )
          .join("")
      : '<p class="empty">해당 분야 사례를 준비 중입니다.</p>';
  }
  $("filters").innerHTML = CATEGORIES.map(
    (c) => `<button type="button" class="filter${c === current ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`
  ).join("");
  $("filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    current = btn.dataset.cat;
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    renderProjects();
  });
  renderProjects();

  // 시공 전·후 비교
  $("ba-title").textContent = BEFORE_AFTER.title;
  $("ba-before").style.background = BEFORE_AFTER.before
    ? bg(BEFORE_AFTER.before)
    : "linear-gradient(135deg,#8a7a63,#c9b99a)";
  $("ba-after").style.background = bg(BEFORE_AFTER.after, 0);
  const setBA = (v) => {
    $("ba-before").style.clipPath = `inset(0 ${100 - v}% 0 0)`;
    $("ba-handle").style.left = v + "%";
  };
  $("ba-range").addEventListener("input", (e) => setBA(e.target.value));
  setBA(50);

  // 서비스, 진행과정, 후기
  $("services-list").innerHTML = SERVICES.map(
    (s) => `<div class="card"><div class="icon">${s.icon}</div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`
  ).join("");
  $("process-list").innerHTML = PROCESS.map(
    (p) => `<li><strong>${esc(p.step)}</strong><p>${esc(p.desc)}</p></li>`
  ).join("");
  $("reviews").innerHTML = REVIEWS.map(
    (r) => `<blockquote class="review"><p>“${esc(r.text)}”</p><cite>${esc(r.who)}</cite></blockquote>`
  ).join("");

  // 상담 신청 폼 → 메일 앱으로 전달
  $("type-select").innerHTML = CATEGORIES.slice(1)
    .concat(["유지관리", "기타"])
    .map((c) => `<option>${esc(c)}</option>`)
    .join("");
  $("inquiry").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `[상담 신청] ${f.get("name")} - ${f.get("type")}`;
    const body = [
      `성함/업체명: ${f.get("name")}`,
      `연락처: ${f.get("phone")}`,
      `공사 유형: ${f.get("type")}`,
      `현장 위치: ${f.get("location")}`,
      `면적/예산: ${f.get("budget")}`,
      "",
      `${f.get("message")}`,
    ].join("\n");
    location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
