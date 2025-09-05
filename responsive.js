// ✅ Responsive Enhancements

// Detect if mobile
const isMobile = window.innerWidth < 768;

/* -----------------------------
   PARALLAX MULTIPLIER ADJUSTMENT
------------------------------ */
function getParallaxMultiplier() {
  return window.innerWidth < 768 ? 0.15 : 0.4; // mas maliit ang galaw sa mobile
}

let lastScrollY = 0;
let ticking = false;

window.addEventListener("scroll", function () {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const hero = document.querySelector(".hero");
      const content = document.querySelector(".content");

      let multiplier = getParallaxMultiplier();

      if (hero) {
        hero.style.backgroundPosition = `center ${lastScrollY * multiplier}px`;
      }

      if (content) {
        content.style.transform = `translate(-50%, calc(-50% + ${lastScrollY * (multiplier - 0.1)}px))`;
      }

      ticking = false;
    });
    ticking = true;
  }
});

/* -----------------------------
   LEAVES DENSITY
------------------------------ */
if (typeof createLeaf === "function") {
  if (!isMobile) {
    setInterval(createLeaf, 500);
  } else {
    setInterval(createLeaf, 1200); // bawasan leaves sa mobile
  }
}

/* -----------------------------
   SNOWFLAKES DENSITY
------------------------------ */
const snowContainer = document.querySelector(".snow");
if (snowContainer) {
  const snowCount = isMobile ? 20 : 50;

  for (let i = 0; i < snowCount; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    const size = Math.random() * 6 + 4; // 4px - 10px
    snowflake.style.width = size + "px";
    snowflake.style.height = size + "px";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
    snowflake.style.animationDelay = Math.random() * 5 + "s";

    snowContainer.appendChild(snowflake);
  }
}

/* -----------------------------
   GENERIC SCROLL ANIMATOR (Responsive)
------------------------------ */
function makeScrollAnimator(el, direction = 1) {
  let posVw = 0;
  let targetVw = 0;
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let rafId = null;

  const sensitivity = window.innerWidth < 768 ? 0.15 : 0.3; // mas mababa sa mobile
  const clampVw = window.innerWidth < 768 ? 10 : 25;

  function onScroll() {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (!inView) {
      el.style.opacity = 0;
      return;
    } else {
      el.style.opacity = 1;
    }

    const st = window.pageYOffset || document.documentElement.scrollTop;
    const delta = st - lastScrollTop;
    lastScrollTop = st;

    targetVw += direction * delta * sensitivity / window.innerWidth * 100;
    if (targetVw > clampVw) targetVw = clampVw;
    if (targetVw < -clampVw) targetVw = -clampVw;

    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick() {
    posVw += (targetVw - posVw) * 0.15;
    el.style.transform = `rotate(-22deg) skew(25deg) translateX(${posVw}vw)`;

    targetVw += (0 - targetVw) * 0.05; // balik sa gitna

    if (Math.abs(targetVw) < 0.01 && Math.abs(posVw) < 0.01) {
      rafId = null;
      posVw = 0;
      targetVw = 0;
      el.style.transform = `rotate(-22deg) skew(25deg) translateX(0vw)`;
      return;
    }
    rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

// Apply scroll animator kung may elements
if (document.getElementById('calibr8')) makeScrollAnimator(document.getElementById('calibr8'), -1);
if (document.getElementById('thankText')) makeScrollAnimator(document.getElementById('thankText'), 1);
if (document.getElementById('knowMe')) makeScrollAnimator(document.getElementById('knowMe'), -1);

/* -----------------------------
   DARK MODE ADJUSTMENTS for Shadows
------------------------------ */
document.querySelectorAll('.iso-text').forEach(text => {
  let shadow = "";
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const maxLayers = (isMobile || isDark) ? 20 : 40; // bawas layers sa mobile/dark

  for (let i = 0; i < maxLayers; i++) {
    shadow += (shadow ? ',' : '') + -i * 1 + 'px ' + i * 1 + 'px 0 ' + (isDark ? '#444' : '#d9d9d9');
  }
  text.style.textShadow = shadow;
});
