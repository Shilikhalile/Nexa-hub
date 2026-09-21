document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SCROLL PROGRESS
  ========================================= */

  const progress =
    document.getElementById("progress");

  function updateProgress() {

    const scrollTop =
      window.scrollY;

    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const value =
      maxScroll > 0
        ? (scrollTop / maxScroll) * 100
        : 0;

    progress.style.width =
      `${value}%`;
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

  function showToast(text) {

    toast.textContent = text;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);
  }


  /* =========================================
     EXPLORE
  ========================================= */

  const exploreBtn =
    document.getElementById("exploreBtn");

  if (exploreBtn) {

    exploreBtn.addEventListener(
      "click",
      () => {

        const reveal =
          document.querySelector(".reveal");

        if (reveal) {

          reveal.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  }


  /* =========================================
     COMING SOON
  ========================================= */

  const comingBtn =
    document.getElementById("comingBtn");

  const finalButton =
    document.getElementById("finalButton");

  function comingSoon() {

    showToast(
      "NEXA — COMING SOON"
    );

  }

  if (comingBtn) {

    comingBtn.addEventListener(
      "click",
      comingSoon
    );

  }

  if (finalButton) {

    finalButton.addEventListener(
      "click",
      comingSoon
    );

  }


  /* =========================================
     REVEAL ANIMATION
  ========================================= */

  const animatedSections =
    document.querySelectorAll(
      ".section"
    );

  animatedSections.forEach((section) => {

    section.style.opacity = "0";

    section.style.transform =
      "translateY(35px)";

    section.style.transition =
      "opacity .9s ease, transform .9s ease";

  });


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

          }

        });

      },
      {
        threshold: 0.08
      }
    );


  animatedSections.forEach(
    section => observer.observe(section)
  );


  /* =========================================
     CORE PARALLAX
  ========================================= */

  const core =
    document.querySelector(
      ".nexa-core"
    );

  if (
    core &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    window.addEventListener(
      "mousemove",
      (event) => {

        const x =
          (event.clientX /
            window.innerWidth -
            .5) * 15;

        const y =
          (event.clientY /
            window.innerHeight -
            .5) * 15;

        core.style.transform =
          `translate(${x}px, ${y}px)`;

      }
    );

  }


  /* =========================================
     TOOL CARDS
  ========================================= */

  document
    .querySelectorAll(".tool-card")
    .forEach((card) => {

      card.addEventListener(
        "click",
        () => {

          card.style.transform =
            "translateY(-10px)";

          setTimeout(() => {

            card.style.transform = "";

          }, 600);

        }
      );

    });


  /* =========================================
     CREATION STEPS
  ========================================= */

  document
    .querySelectorAll(".creation-step")
    .forEach((step) => {

      step.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(".creation-step")
            .forEach(item =>
              item.classList.remove("active")
            );

          step.classList.add("active");

        }
      );

    });


  /* =========================================
     FAKE CHAT
  ========================================= */

  const fakeInput =
    document.querySelector(
      ".fake-input"
    );

  if (fakeInput) {

    fakeInput.addEventListener(
      "click",
      () => {

        showToast(
          "NEXA CORE — COMING SOON"
        );

      }
    );

  }


  /* =========================================
     TERMINAL
  ========================================= */

  const terminalLines =
    document.querySelectorAll(
      ".terminal-body p"
    );

  terminalLines.forEach(
    (line, index) => {

      line.style.opacity = "0";

      setTimeout(() => {

        line.style.transition =
          "opacity .5s ease";

        line.style.opacity = "1";

      }, 500 + index * 500);

    }
  );


  /* =========================================
     KEYBOARD SHORTCUT
  ========================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }

    }
  );

});
