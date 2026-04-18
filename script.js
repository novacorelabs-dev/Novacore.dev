// кнопка копирования email
const copyBtns = document.querySelectorAll(".copy-btn");
const toast = document.getElementById("toast");

function showToast(message = "Скопировано!") {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

copyBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const email = btn.getAttribute("data-email");
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      showToast("Скопировано!");
    } catch (err) {
      showToast("Не удалось скопировать");
    }
  });
});

// плавный скролл
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ========== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ ==========
function addFadeUpAnimation() {
  // добавляем классы для анимации всем элементам
  const elementsToAnimate = [
    { selector: ".hero h1", delay: 0 },
    { selector: ".hero-subtitle", delay: 0 },
    { selector: ".btn-primary", delay: 0 },
    { selector: ".service-card", delay: 0, addDelayClass: true },
    { selector: ".card", delay: 0, addDelayClass: true },
    { selector: ".about-text", delay: 0 },
    { selector: ".about-stats", delay: 0 },
    { selector: ".mission", delay: 0 },
    { selector: ".goal", delay: 0 },
    { selector: ".contact", delay: 0 },
  ];

  elementsToAnimate.forEach((item) => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach((el, index) => {
      el.classList.add("fade-up");
      if (item.addDelayClass) {
        const delayClass = `delay-${(index % 4) + 1}`;
        el.classList.add(delayClass);
      }
    });
  });
}

// проверка видимости элементов
function checkVisibility() {
  const fadeElements = document.querySelectorAll(".fade-up");
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isVisible = rect.top < windowHeight - 80;

    if (isVisible) {
      el.classList.add("visible");
    }
  });
}

// запускаем анимацию
addFadeUpAnimation();
checkVisibility();

// слушаем событие скролла
window.addEventListener("scroll", checkVisibility);
// также проверяем при загрузке и изменении размера окна
window.addEventListener("resize", checkVisibility);
