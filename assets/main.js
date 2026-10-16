// 화면 동작만 담당합니다. 내용은 build.mjs 가 미리 HTML로 만들어 둡니다.
(function () {
  const $ = (id) => document.getElementById(id);
  if ($("year")) $("year").textContent = new Date().getFullYear();

  // ---------- 시공사례 목록: 분야 필터 ----------
  const filt = $("case-filter");
  const list = $("case-list");
  if (filt && list) {
    const total = list.querySelectorAll(".case-card").length;
    filt.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      filt.querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === b));
      const cat = b.dataset.cat;
      let shown = 0;
      list.querySelectorAll(".case-card").forEach((card) => {
        const on = cat === "전체" || card.dataset.category === cat;
        card.hidden = !on;
        if (on) shown++;
      });
      if ($("case-count")) {
        $("case-count").textContent =
          cat === "전체"
            ? `${COMPANY.region}에서 직접 작업한 현장 ${total}곳입니다. 현장을 누르면 작업 전·후 사진을 볼 수 있습니다.`
            : `${cat} 현장 ${shown}곳입니다.`;
      }
    });
  }

  // ---------- 상담 신청 폼 → 메일 앱으로 전달 ----------
  const form = $("inquiry");
  if (form) {
    form.addEventListener("submit", (e) => {
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

  // ---------- 사진을 누르면 크게 보기 ----------
  const box = $("lightbox");
  if (box) {
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
  }
})();
