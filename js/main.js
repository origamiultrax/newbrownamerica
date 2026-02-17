// Small polish: add a subtle “parallax” nudge to bubbles on mouse move (desktop only).
(function () {
  const bubbles = document.querySelectorAll(".bubble");
  const hero = document.querySelector(".hero");
  if (!hero || bubbles.length === 0) return;

  let raf = null;
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = (e.clientX - cx) / rect.width;   // -0.5..0.5 roughly
    const dy = (e.clientY - cy) / rect.height;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      bubbles.forEach((b, i) => {
        const strength = 10 + (i % 3) * 4;
        b.style.translate = `${dx * strength}px ${dy * strength}px`;
      });
    });
  });

  hero.addEventListener("mouseleave", () => {
    bubbles.forEach((b) => (b.style.translate = "0px 0px"));
  });
})();
