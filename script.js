document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SCROLL PROGRESS
  ========================================= */

  const progressBar =
    document.getElementById("progressBar");

  function updateProgress() {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width =
      `${progress}%`;
  }

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  updateProgress();


  /* =========================================
     TOAST
  ========================================= */

  const toast =
    document.getElementById("toast");

  let toastTimer;

  function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }


  /* =========================================
     DISCOVER BUTTON
  ========================================= */

  const discoverBtn =
    document.getElementById("discoverBtn");

  if (discoverBtn) {

    discoverBtn.addEventListener(
      "click",
      () => {

        const target =
          document.querySelector(".core");

        if (target) {

          target.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  }


  /* =========================================
     COMING SOON BUTTONS
  ========================================= */

  const comingSoonBtn =
    document.getElementById("comingSoonBtn");

  const finalBtn =
    document.getElementById("finalBtn");

  function comingSoon() {

    showToast(
      "NEXA — COMING SOON"
    );

  }

  if (comingSoonBtn) {
    comingSoonBtn.addEventListener(
      "click",
      comingSoon
    );
  }

  if (finalBtn) {
    finalBtn.addEventListener(
      "click",
      comingSoon
    );
  }


  /* =========================================
     CAPABILITY CARDS
  ========================================= */

  const cards =
    document.querySelectorAll(
      ".capability-card"
    );

  cards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        cards.forEach((item) => {
          item.style.transform = "";
        });

        card.style.transform =
          "translateY(-12px)";

        setTimeout(() => {
          card.style.transform = "";
        }, 900);

      }
    );

  });


  /* =========================================
     LANGUAGE CARDS
  ========================================= */

  const languages =
    document.querySelectorAll(
      ".language-card"
    );

  languages.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        languages.forEach((item) => {
          item.classList.remove("active");
        });

        card.classList.add("active");

      }
    );

  });


  /* =========================================
     TERMINAL TYPING EFFECT
  ========================================= */

  const terminal =
    document.querySelector(
      ".terminal-body"
    );

  if (terminal) {

    const lines =
      terminal.querySelectorAll("p");

    lines.forEach(
      (line, index) => {

        line.style.opacity = "0";

        setTimeout(() => {

          line.style.transition =
            "opacity .5s ease";

          line.style.opacity = "1";

        }, 500 + index * 450);

      }
    );

  }


  /* =========================================
     INTERSECTION OBSERVER
  ========================================= */

  const sections =
    document.querySelectorAll(
      ".section"
    );

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.style.opacity =
                "1";

              entry.target.style.transform =
                "translateY(0)";

            }

          }
        );

      },
      {
        threshold: 0.08
      }
    );

  sections.forEach((section) => {

    section.style.opacity = "0";

    section.style.transform =
      "translateY(25px)";

    section.style.transition =
      "opacity .8s ease, transform .8s ease";

    observer.observe(section);

  });


  /* =========================================
     MOUSE PARALLAX
  ========================================= */

  const core =
    document.querySelector(
      ".ai-core"
    );

  if (
    core &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    document.addEventListener(
      "mousemove",
      (event) => {

        const x =
          (event.clientX /
            window.innerWidth -
            0.5) * 12;

        const y =
          (event.clientY /
            window.innerHeight -
            0.5) * 12;

        core.style.transform =
          `translate(${x}px, ${y}px)`;

      }
    );

  }


  /* =========================================
     CHAT INPUT FAKE INTERACTION
  ========================================= */

  const chatInput =
    document.querySelector(
      ".chat-input"
    );

  if (chatInput) {

    chatInput.addEventListener(
      "click",
      () => {

        showToast(
          "NEXA CORE — COMING SOON"
        );

      }
    );

  }

});
