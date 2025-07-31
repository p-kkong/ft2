 // 로딩
    window.addEventListener("load", () => {
      gsap.to(".loader", {
        opacity: 0,
        duration: 1,
        onComplete: () => document.querySelector(".loader").remove()
      });
      AOS.init({ duration: 1000, once: true });
    });

    // 텍스트 애니메이션
    const split = document.querySelector(".split-text");
    const splitText = split.textContent;
    split.innerHTML = "";
    splitText.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      split.appendChild(span);
    });

    gsap.from(".split-text span", {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".hero",
        start: "top center"
      }
    });

    // 커서 따라다니기
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", e => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    });

    // 메뉴 클릭 → 부드럽게 이동
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          gsap.to(window, { scrollTo: target, duration: 0.8, ease: "power2.out" });
        }
        // 모바일 메뉴 닫기
        document.getElementById("mobileMenu").classList.remove("open");
      });
    });

    // 모바일 메뉴 토글
    document.getElementById("menuBtn").addEventListener("click", () => {
      document.getElementById("mobileMenu").classList.toggle("open");
    });

    // TOP 버튼
    document.getElementById("topBtn").addEventListener("click", () => {
      gsap.to(window, { scrollTo: 0, duration: 0.8, ease: "power2.out" });
    });
    const menuLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');

// 섹션마다 active 클래스 적용
document.querySelectorAll('section').forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => activateMenu(section.id),
    onEnterBack: () => activateMenu(section.id)
  });
});

function activateMenu(id) {
  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${id}`) {
      link.classList.add('active');
    }
  });
}

// 메뉴 클릭 시에도 같은 효과
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuLinks.forEach(el => el.classList.remove('active'));
    link.classList.add('active');
  });
});