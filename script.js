const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector(".nav");
const carouselTrack = document.querySelector(".carousel-track");
const heroCarousel = document.querySelector(".hero-carousel");
const prevButton = document.querySelector(".carousel-control.prev");
const nextButton = document.querySelector(".carousel-control.next");
const yearEl = document.getElementById("year");
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

const heroImageSources = [
  // Replace these with your own hosted hero images
  "0C0A7430.jpeg",
  "1000053378.jpg",
  "IMG_0761.png",
  "IMG_9457.JPG"
];

// const linkedInPosts = [
//   {
//     embedUrl:
//       "https://www.linkedin.com/feed/update/urn:li:activity:7403713528479649793/",
//     caption: "AWS re:Invent 2025 Highlights!",
//   },
//   {
//     embedUrl:
//       "https://www.linkedin.com/embed/feed/update/urn:li:share:7163333333333333333",
//     caption: "Developer experience wins from our portal rollout.",
//   },
//   {
//     embedUrl:
//       "https://www.linkedin.com/embed/feed/update/urn:li:share:7152222222222222222",
//     caption: "AI copilots for support teams—lessons learned.",
//   },
// ];

const normalizeHeroSrc = (src) => {
  if (!src) return "";
  const trimmed = src.trim();
  if (!trimmed) return "";
  const isAbsolute =
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../") ||
    trimmed.startsWith("data:");
  return isAbsolute ? trimmed : `./${trimmed}`;
};

// const renderPosts = () => {
//   if (!carouselTrack) return;
//   if (!linkedInPosts.length) {
//     const empty = document.createElement("p");
//     empty.className = "carousel-empty";
//     empty.textContent = "LinkedIn posts will appear here when you add embed URLs.";
//     carouselTrack.appendChild(empty);
//     return;
//   }

//   linkedInPosts.forEach((post, index) => {
//     const card = document.createElement("article");
//     card.className = "carousel-card linkedin-embed";

//     const iframe = document.createElement("iframe");
//     iframe.src = `${post.embedUrl}?compact=1`;
//     iframe.title = post.caption || `LinkedIn post ${index + 1}`;
//     iframe.loading = "lazy";
//     iframe.setAttribute("frameborder", "0");
//     iframe.setAttribute("aria-label", iframe.title);

//     card.appendChild(iframe);

//     if (post.caption) {
//       const caption = document.createElement("p");
//       caption.className = "embed-caption";
//       caption.textContent = post.caption;
//       card.appendChild(caption);
//     }

//     carouselTrack.appendChild(card);
//   });
// };

const initHeroCarousel = () => {
  if (!heroCarousel || heroImageSources.length === 0) return;
  const normalizedSources = heroImageSources
    .map(normalizeHeroSrc)
    .filter(Boolean);

  if (normalizedSources.length === 0) return;

  const slides = [];
  let current = 0;

  const activateSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));
    if (slides[index]) {
      slides[index].classList.add("active");
      current = index;
    }
  };

  normalizedSources.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.decoding = "async";
    img.addEventListener("error", () => {
      console.warn(`Hero carousel image failed to load: ${src}`);
      const index = slides.indexOf(img);
      if (index !== -1) {
        const wasActive = img.classList.contains("active");
        slides.splice(index, 1);
        img.remove();
        if (slides.length === 0) return;
        if (current >= slides.length) {
          current = 0;
        } else if (index <= current && current > 0) {
          current -= 1;
        }
        if (wasActive) {
          activateSlide(current);
        }
      }
    });
    heroCarousel.appendChild(img);
    slides.push(img);
  });

  if (slides.length === 0) return;
  activateSlide(0);

  if (slides.length === 1) return;

  setInterval(() => {
    if (slides.length <= 1) return;
    const nextIndex = (current + 1) % slides.length;
    activateSlide(nextIndex);
  }, 6000);
};

const scrollCarousel = (direction) => {
  if (!carouselTrack) return;
  const card = carouselTrack.querySelector(".carousel-card");
  if (!card) return;
  const scrollAmount = card.offsetWidth + 16;
  carouselTrack.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
};

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const closeMobileNav = () => {
  if (navLinks) {
    navLinks.classList.remove("open");
  }
};

const scrollToSection = (target) => {
  if (!target) return;
  const navHeight = nav ? nav.offsetHeight : 0;
  const offset = navHeight + 16;
  const targetPosition =
    target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
};

smoothScrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    event.preventDefault();
    const target = document.querySelector(href);
    scrollToSection(target);
    if (navLinks && navLinks.contains(link)) {
      closeMobileNav();
    }
  });
});

if (prevButton) {
  prevButton.addEventListener("click", () => scrollCarousel(-1));
}

if (nextButton) {
  nextButton.addEventListener("click", () => scrollCarousel(1));
}

// renderPosts();
initHeroCarousel();

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
