// 2

// Typing effect for paragraph
const paraText =
  "I commonly go by the formal nickname Rence. I was born on April 2, 2000, and I live at Janet Extension, Tandang Sora, Quezon City. I graduated from New Era University with a Bachelor of Science in Information Technology. Here’s my latest photo along with a baby picture. By the way, my favorite colors are orange and yellow.";
let j = 0;

function typeParagraph() {
  if (j < paraText.length) {
    document.querySelector(".p_me").innerHTML += paraText.charAt(j);
    j++;
    setTimeout(typeParagraph, 50);
  }
}

// Run both on load
window.onload = () => {
  typeParagraph();
};

// Card fade-in
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  setTimeout(() => {
    card.style.transition = "all 1s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 200);
});

const mainPhoto = document.querySelector(".photo img");
const smallPhoto = document.querySelector(".small-photo img");
const smallPhotoBox = document.querySelector(".small-photo");

// Hover in → flip forward + swap
smallPhotoBox.addEventListener("mouseenter", () => {
  smallPhotoBox.classList.remove("flipping-backward");
  smallPhotoBox.classList.add("flipping-forward");

  let tempSrc = mainPhoto.src;
  mainPhoto.src = smallPhoto.src;
  smallPhoto.src = tempSrc;

  setTimeout(() => {
    smallPhotoBox.classList.remove("flipping-forward");
  }, 600);
});

// Hover out → flip backward + swap back
smallPhotoBox.addEventListener("mouseleave", () => {
  smallPhotoBox.classList.remove("flipping-forward");
  smallPhotoBox.classList.add("flipping-backward");

  let tempSrc = mainPhoto.src;
  mainPhoto.src = smallPhoto.src;
  smallPhoto.src = tempSrc;

  setTimeout(() => {
    smallPhotoBox.classList.remove("flipping-backward");
  }, 600);
});

//3

// script.js
const elements = document.querySelectorAll(".h2-me, .h3-me, li");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  let direction = st > lastScrollTop ? "down" : "up"; // detect direction
  lastScrollTop = st <= 0 ? 0 : st;

  elements.forEach((el, index) => {
    const rect = el.getBoundingClientRect();

    // kapag visible sa screen
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      // timeout para sequence effect
      setTimeout(() => {
        elements.forEach(e => e.classList.remove("active"));
        el.classList.add("active");
      }, index * 150); // delay depende sa index
    }
  });
});

//4

// Generate snowflakes
const snowContainer = document.querySelector(".snow");

for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Random size
    const size = Math.random() * 6 + 4; // 4px - 10px
    snowflake.style.width = size + "px";
    snowflake.style.height = size + "px";

    // Random position
    snowflake.style.left = Math.random() * 100 + "vw";

    // Random animation speed + delay
    snowflake.style.animationDuration = Math.random() * 5 + 5 + "s"; 
    snowflake.style.animationDelay = Math.random() * 5 + "s";

    snowContainer.appendChild(snowflake);
}

// Scroll-based animation (parallax effect with clamp)
window.addEventListener("scroll", () => {
    const banner = document.querySelector(".banner-2");
    const rect = banner.getBoundingClientRect();

    // progress 0 (top) → 1 (bottom)
    let progress = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
    progress = Math.min(Math.max(progress, 0), 1);

    const root = document.querySelector(".banner-2");

    // Max offsets
    const maxProductMove = 40;
    const maxRock1Move = 50;
    const maxRock2Move = 70;
    const maxRock3Move = 70;

    // Update CSS variables
    root.style.setProperty("--scrollY", progress * maxProductMove + "px");
    root.style.setProperty("--scrollRock1", progress * maxRock1Move + "px");
    root.style.setProperty("--scrollRock2X", progress * -maxRock2Move + "px");
    root.style.setProperty("--scrollRock2Y", progress * maxRock2Move + "px");
    root.style.setProperty("--scrollRock3X", progress * maxRock3Move + "px");
    root.style.setProperty("--scrollRock3Y", progress * maxRock3Move + "px");
});

const text = `If I were a superhero, I would be Captain America. He inspires me because he stands for courage, leadership, and doing what’s right even when it’s difficult. 

What super powers will you have? And why? 

The superpowers I would have would be enhanced strength, agility, and an unbreakable shield. These powers would allow me to protect others, fight for justice, and give hope to people who feel weak or powerless. Why? Because Captain America shows that being a hero is not just about powers—it’s about having the heart to stand up for what’s right and to protect people, no matter the odds.`;

const heroText = document.getElementById('heroText');
let index = 0; // loop variable

// Keywords to bold
const keywords = [
  "Captain America",
  "courage",
  "leadership",
  "doing what’s right even when it’s difficult",
  "enhanced strength",
  "agility",
  "unbreakable shield",
  "protect others",
  "fight for justice",
  "give hope to people who feel weak or powerless",
  "Captain America shows that being a hero is not just about powers—it’s about having the heart to stand up for what’s right and to protect people, no matter the odds"
];

//5

function typeEffect() {
  if (index < text.length) {
    // Check if current text matches a keyword
    let matchedKeyword = keywords.find(word => text.substring(index, index + word.length) === word);

    if (matchedKeyword) {
      heroText.innerHTML += `<b>${matchedKeyword}</b>`;
      index += matchedKeyword.length;
    } else {
      heroText.innerHTML += text.charAt(index);
      index++;
    }

    setTimeout(typeEffect, 50);
  }
}

window.addEventListener('DOMContentLoaded', typeEffect);

// Apply stacked shadow for 3D extrusion effect
// Stacked shadow extrusion with gold depth
document.querySelectorAll('.iso-text').forEach(text => {
  let shadow = "";
  for (let i = 0; i < 40; i++) {
    shadow += (shadow ? ',' : '') + -i * 1 + 'px ' + i * 1 + 'px 0 #c97d0d';
  }
  text.style.textShadow = shadow;
});


  // Generic scroll-based animator
  function makeScrollAnimator(el, direction = 1) {
    let posVw = 0;
    let targetVw = 0;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let rafId = null;

    const sensitivity = 0.3;
    const clampVw = 25;

    function onScroll(){
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if(!inView){
        el.style.opacity = 0;
        return;
      } else {
        el.style.opacity = 1;
      }

      const st = window.pageYOffset || document.documentElement.scrollTop;
      const delta = st - lastScrollTop;
      lastScrollTop = st;

      targetVw += direction * delta * sensitivity / window.innerWidth * 100;
      if(targetVw > clampVw) targetVw = clampVw;
      if(targetVw < -clampVw) targetVw = -clampVw;

      if(!rafId) rafId = requestAnimationFrame(tick);
    }

    function tick(){
      posVw += (targetVw - posVw) * 0.15;
      el.style.transform = `rotate(-22deg) skew(25deg) translateX(${posVw}vw)`;

      targetVw += (0 - targetVw) * 0.05; // auto balik sa gitna

      if(Math.abs(targetVw) < 0.01 && Math.abs(posVw) < 0.01){
        rafId = null;
        posVw = 0;
        targetVw = 0;
        el.style.transform = `rotate(-22deg) skew(25deg) translateX(0vw)`;
        return;
      }
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Assign different directions
  makeScrollAnimator(document.getElementById('calibr8'), -1);  // opposite
  makeScrollAnimator(document.getElementById('thankText'),  1); // normal
  makeScrollAnimator(document.getElementById('knowMe'), -1);   // opposite

  gsap
  .timeline({
    scrollTrigger:{
      trigger:'.scrollDist',
      start:'0 0',
      end:'100% 100%',
      scrub:1
    }})
  .fromTo('.sky', {y:0},{y:-200}, 0)
  .fromTo('.cloud1', {y:100},{y:-800}, 0)
  .fromTo('.cloud2', {y:-150},{y:-500}, 0)
  .fromTo('.cloud3', {y:-50},{y:-650}, 0)
  .fromTo('.mountBg', {y:-10},{y:-100}, 0)
  .fromTo('.mountMg', {y:-30},{y:-250}, 0)
  .fromTo('.mountFg', {y:-50},{y:-600}, 0)


const arrowBtn = document.querySelector('#arrow-btn')

arrowBtn.addEventListener('mouseenter', ()=>{
 gsap.to('.arrow', {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}) 
})

arrowBtn.addEventListener('mouseleave', ()=> {
  gsap.to('.arrow', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'}) 
})

arrowBtn.addEventListener('click', ()=> {
  gsap.to(window, {scrollTo:innerHeight, duration:1.5, ease:'power1.inOut'})
})