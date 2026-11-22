// Theme toggle for the article pages (the home page has its own copy that also reloads Disqus).
{
  const btn = document.getElementById("theme");
  const sun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></g></svg>';
  const moon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.5A9 9 0 0 1 9.5 3a9 9 0 1 0 11.5 11.5z"/></svg>';
  let theme = null;
  try { theme = localStorage.getItem("lotto645-theme"); } catch (e) {}
  const sysDark = () => { try { return matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) { return false; } };
  function apply() {
    const t = theme || (sysDark() ? "dark" : "light");
    document.documentElement.dataset.theme = t;
    if (!btn) return;
    btn.innerHTML = t === "dark" ? sun + "화이트 모드" : moon + "다크 모드";
    btn.setAttribute("aria-label", t === "dark" ? "화이트 모드로 바꾸기" : "다크 모드로 바꾸기");
  }
  if (btn) btn.addEventListener("click", () => {
    theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("lotto645-theme", theme); } catch (e) {}
    apply();
  });
  try {
    const mq = matchMedia("(prefers-color-scheme: dark)"), on = () => { if (!theme) apply(); };
    if (mq.addEventListener) mq.addEventListener("change", on); else mq.addListener(on);
  } catch (e) {}
  apply();

  // Label each cell of stacked tables with its column heading (used on narrow screens).
  document.querySelectorAll("table.stack").forEach(tb => {
    const heads = [...tb.querySelectorAll("thead th")].map(th => th.textContent);
    tb.querySelectorAll("tbody tr").forEach(tr => [...tr.children].forEach((td, i) => td.setAttribute("data-l", heads[i] || "")));
  });
}
