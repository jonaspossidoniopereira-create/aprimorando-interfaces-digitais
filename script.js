/* ============================================================
   CAMPO & CIDADE 2026
   JavaScript modular e didático
   ============================================================ */


/* ============================================================
   1. DADOS DA APLICAÇÃO
   ------------------------------------------------------------
   Manter os conteúdos em arrays/objetos facilita alterações.
   Para trocar um card, por exemplo, basta editar este arquivo.
   ============================================================ */


/**
 * Cards da seção "Problema".
 */
const problemCards = [
  {
    icon: "🌎",
    title: "Distâncias invisíveis",
    text:
      "Muitas vezes, a rotina urbana esconde os caminhos percorridos pelos alimentos e produtos até chegarem às nossas mãos."
  },

  {
    icon: "🌱",
    title: "Origem esquecida",
    text:
      "Conhecer a origem do que consumimos ajuda a valorizar produtores, comunidades e os recursos naturais."
  },

  {
    icon: "🤝",
    title: "Pouca conexão",
    text:
      "Campo e cidade dependem um do outro. Aproximar essas realidades fortalece comunidades e cria novas possibilidades."
  }
];


/**
 * Itens da galeria.
 *
 * Os elementos visuais abaixo são placeholders.
 * Para usar imagens reais, basta substituir o campo "placeholder"
 * por uma URL e adaptar a função renderGallery().
 */
const galleryItems = [
  {
    title: "Quem planta também faz parte do jogo",
    description:
      "Placeholder para uma fotografia de produtor ou comunidade rural.",
    placeholder: "🌾"
  },

  {
    title: "Alimento que percorre caminhos",
    description:
      "Placeholder para uma imagem mostrando produção, transporte ou feira.",
    placeholder: "🥕"
  },

  {
    title: "Conhecimento que aproxima",
    description:
      "Placeholder para uma atividade educativa entre estudantes e comunidade.",
    placeholder: "📚"
  },

  {
    title: "Cidade que valoriza o campo",
    description:
      "Placeholder para uma cena urbana conectada à produção rural.",
    placeholder: "🏙️"
  }
];


/**
 * Dados e curiosidades.
 *
 * Os textos são apresentados como conteúdo educativo conceitual.
 * Caso o projeto final utilize estatísticas oficiais, substitua
 * estes objetos por dados com suas respectivas fontes.
 */
const dataItems = [
  {
    number: "01",
    title: "Origem",
    text:
      "Grande parte dos alimentos consumidos diariamente começa sua jornada em áreas rurais."
  },

  {
    number: "02",
    title: "Conexão",
    text:
      "Produção, transporte, comércio e consumo formam uma cadeia que aproxima diferentes territórios."
  },

  {
    number: "03",
    title: "Educação",
    text:
      "Aprender sobre a origem dos alimentos pode estimular escolhas mais conscientes."
  },

  {
    number: "04",
    title: "Futuro",
    text:
      "Tecnologia e conhecimento podem ajudar a criar relações mais sustentáveis entre campo e cidade."
  }
];


/* ============================================================
   2. SELETORES DOM
   ============================================================ */

const elements = {
  problemCards: document.querySelector("#problemCards"),

  dataCards: document.querySelector("#dataCards"),

  galleryTrack: document.querySelector("#galleryTrack"),

  galleryDots: document.querySelector("#galleryDots"),

  galleryPrev: document.querySelector("#galleryPrev"),

  galleryNext: document.querySelector("#galleryNext"),

  contrastToggle: document.querySelector("#contrastToggle"),

  fontIncrease: document.querySelector("#fontIncrease"),

  fontDecrease: document.querySelector("#fontDecrease"),

  accessibilityFeedback:
    document.querySelector("#accessibilityFeedback"),

  loadingScreen:
    document.querySelector("#loadingScreen"),

  participateButton:
    document.querySelector("#participateButton"),

  ctaFeedback:
    document.querySelector("#ctaFeedback")
};


/* ============================================================
   3. RENDERIZAÇÃO DOS CARDS
   ============================================================ */


/**
 * Renderiza os cards da seção "Problema".
 */
function renderProblemCards() {
  if (!elements.problemCards) return;

  elements.problemCards.innerHTML = problemCards
    .map((card) => {
      return `
        <article class="card reveal">
          <div
            class="card-icon"
            aria-hidden="true"
          >
            ${card.icon}
          </div>

          <h3>${card.title}</h3>

          <p>${card.text}</p>
        </article>
      `;
    })
    .join("");
}


/**
 * Renderiza os cards de dados.
 */
function renderDataCards() {
  if (!elements.dataCards) return;

  elements.dataCards.innerHTML = dataItems
    .map((item) => {
      return `
        <article class="stats-card">
          <span class="stats-number">
            ${item.number}
          </span>

          <h3>${item.title}</h3>

          <p>${item.text}</p>
        </article>
      `;
    })
    .join("");
}


/* ============================================================
   4. CARROSSEL
   ============================================================ */

let currentSlide = 0;


/**
 * Cria a estrutura HTML das imagens.
 */
function renderGallery() {
  if (!elements.galleryTrack) return;

  elements.galleryTrack.innerHTML = galleryItems
    .map((item, index) => {
      return `
        <article
          class="gallery-slide ${index === 0 ? "active" : ""}"
          aria-hidden="${index === 0 ? "false" : "true"}"
        >

          <div
            class="gallery-placeholder"
            role="img"
            aria-label="Placeholder: ${item.title}"
          >
            ${item.placeholder}
          </div>

          <div class="gallery-caption">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>

        </article>
      `;
    })
    .join("");

  renderGalleryDots();
}


/**
 * Cria os indicadores abaixo do carrossel.
 */
function renderGalleryDots() {
  if (!elements.galleryDots) return;

  elements.galleryDots.innerHTML = galleryItems
    .map((item, index) => {
      return `
        <button
          type="button"
          class="carousel-dot ${
            index === currentSlide ? "active" : ""
          }"
          aria-label="Ir para imagem ${index + 1}"
          aria-current="${
            index === currentSlide ? "true" : "false"
          }"
          data-slide="${index}"
        ></button>
      `;
    })
    .join("");

  const dots =
    elements.galleryDots.querySelectorAll(".carousel-dot");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = Number(dot.dataset.slide);

      updateGallery();

      clickFeedback(dot);
    });
  });
}


/**
 * Atualiza o slide visível.
 */
function updateGallery() {
  const slides =
    elements.galleryTrack.querySelectorAll(".gallery-slide");

  slides.forEach((slide, index) => {
    const active = index === currentSlide;

    slide.classList.toggle("active", active);

    slide.setAttribute(
      "aria-hidden",
      String(!active)
    );
  });

  renderGalleryDots();
}


/**
 * Vai para o próximo slide.
 */
function nextSlide() {
  currentSlide =
    (currentSlide + 1) % galleryItems.length;

  updateGallery();
}


/**
 * Vai para o slide anterior.
 */
function previousSlide() {
  currentSlide =
    (currentSlide - 1 + galleryItems.length) %
    galleryItems.length;

  updateGallery();
}


/**
 * Configura os controles do carrossel.
 */
function setupCarousel() {
  elements.galleryNext?.addEventListener(
    "click",
    () => {
      nextSlide();
      clickFeedback(elements.galleryNext);
    }
  );

  elements.galleryPrev?.addEventListener(
    "click",
    () => {
      previousSlide();
      clickFeedback(elements.galleryPrev);
    }
  );


  /*
   * Navegação pelo teclado quando o carrossel estiver em foco.
   */
  elements.galleryTrack?.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    }
  );
}


/* ============================================================
   5. ABAS
   ============================================================ */


/**
 * Configura o sistema de abas.
 *
 * Também suporta:
 * - Tab
 * - ArrowLeft
 * - ArrowRight
 * - Home
 * - End
 */
function setupTabs() {
  const tabs =
    document.querySelectorAll(".tab-button");

  const panels =
    document.querySelectorAll(".tab-panel");

  if (!tabs.length) return;


  /**
   * Ativa uma aba específica.
   */
  function activateTab(selectedTab) {
    tabs.forEach((tab) => {
      const isSelected =
        tab === selectedTab;

      tab.classList.toggle(
        "active",
        isSelected
      );

      tab.setAttribute(
        "aria-selected",
        String(isSelected)
      );

      tab.tabIndex =
        isSelected ? 0 : -1;
    });


    panels.forEach((panel) => {
      const belongsToTab =
        panel.getAttribute(
          "aria-labelledby"
        ) === selectedTab.id;

      panel.classList.toggle(
        "active",
        belongsToTab
      );

      panel.hidden = !belongsToTab;
    });
  }


  tabs.forEach((tab, index) => {

    tab.addEventListener("click", () => {
      activateTab(tab);

      clickFeedback(tab);
    });


    tab.addEventListener(
      "keydown",
      (event) => {

        let nextIndex = index;

        if (event.key === "ArrowRight") {
          nextIndex =
            (index + 1) % tabs.length;
        }

        if (event.key === "ArrowLeft") {
          nextIndex =
            (index - 1 + tabs.length) %
            tabs.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }


        if (nextIndex !== index) {
          event.preventDefault();

          tabs[nextIndex].focus();

          activateTab(tabs[nextIndex]);
        }
      }
    );
  });
}


/* ============================================================
   6. ACORDEÃO
   ============================================================ */


/**
 * Configura todos os elementos de acordeão da página.
 */
function setupAccordion() {
  const triggers =
    document.querySelectorAll(
      ".accordion-trigger"
    );

  triggers.forEach((trigger) => {

    trigger.addEventListener(
      "click",
      () => {

        const contentId =
          trigger.getAttribute(
            "aria-controls"
          );

        const content =
          document.getElementById(
            contentId
          );

        const isOpen =
          trigger.getAttribute(
            "aria-expanded"
          ) === "true";


        trigger.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

        content.hidden = isOpen;

        clickFeedback(trigger);
      }
    );
  });
}


/* ============================================================
   7. ACESSIBILIDADE
   ============================================================ */


/**
 * Ativa/desativa alto contraste.
 */
function setupContrast() {
  elements.contrastToggle?.addEventListener(
    "click",
    () => {

      const active =
        document.body.classList.toggle(
          "high-contrast"
        );

      elements.contrastToggle.setAttribute(
        "aria-pressed",
        String(active)
      );

      elements.accessibilityFeedback.textContent =
        active
          ? "Alto contraste ativado."
          : "Alto contraste desativado.";

      clickFeedback(
        elements.contrastToggle
      );
    }
  );
}


/**
 * Controle do tamanho da fonte.
 *
 * O tamanho é mantido no localStorage para preservar
 * a preferência do usuário durante novas visitas.
 */
function setupFontSize() {
  const defaultSize = 16;

  let currentSize =
    Number(
      localStorage.getItem(
        "campoCidadeFontSize"
      )
    ) || defaultSize;


  function applyFontSize() {
    /*
     * Limitamos o tamanho entre 14px e 22px.
     * Isso evita que valores extremos prejudiquem a interface.
     */
    currentSize =
      Math.min(
        22,
        Math.max(14, currentSize)
      );

    document.documentElement.style
      .setProperty(
        "--font-size-base",
        `${currentSize}px`
      );

    localStorage.setItem(
      "campoCidadeFontSize",
      currentSize
    );
  }


  elements.fontIncrease?.addEventListener(
    "click",
    () => {
      currentSize += 1;

      applyFontSize();

      elements.accessibilityFeedback.textContent =
        "Tamanho da fonte aumentado.";

      clickFeedback(
        elements.fontIncrease
      );
    }
  );


  elements.fontDecrease?.addEventListener(
    "click",
    () => {
      currentSize -= 1;

      applyFontSize();

      elements.accessibilityFeedback.textContent =
        "Tamanho da fonte reduzido.";

      clickFeedback(
        elements.fontDecrease
      );
    }
  );


  applyFontSize();
}


/* ============================================================
   8. SCROLL REVEAL
   ============================================================ */


/**
 * Anima elementos quando eles entram na área visível.
 *
 * IntersectionObserver é mais eficiente que ouvir o evento
 * "scroll" continuamente.
 */
function setupScrollReveal() {
  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );

  if (!revealElements.length) return;


  /*
   * Se o usuário prefere menos movimento,
   * os elementos aparecem imediatamente.
   */
  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reduceMotion) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }


  const observer =
    new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observerInstance.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealElements.forEach((element) => {
    observer.observe(element);
  });
}


/* ============================================================
   9. MICROINTERAÇÃO DE CLIQUE
   ============================================================ */


/**
 * Feedback visual simples para botões.
 */
function clickFeedback(element) {
  if (!element) return;

  element.animate(
    [
      {
        transform: "scale(1)"
      },

      {
        transform: "scale(0.94)"
      },

      {
        transform: "scale(1)"
      }
    ],
    {
      duration: 180,
      easing: "ease-out"
    }
  );
}


/* ============================================================
   10. CTA
   ============================================================ */


/**
 * Microinteração para o botão principal da página.
 */
function setupCTA() {
  elements.participateButton?.addEventListener(
    "click",
    () => {

      clickFeedback(
        elements.participateButton
      );

      elements.ctaFeedback.textContent =
        "Que bom ter você nesse time! 🌱⚽";

      /*
       * Pequena limpeza após alguns segundos.
       */
      window.setTimeout(() => {
        elements.ctaFeedback.textContent = "";
      }, 5000);
    }
  );
}


/* ============================================================
   11. SCROLL SUAVE
   ============================================================ */


/**
 * Implementação complementar de scroll suave.
 *
 * O CSS já possui scroll-behavior: smooth.
 * Aqui tratamos os links de navegação explicitamente,
 * permitindo comportamento consistente e feedback visual.
 */
function setupSmoothScroll() {
  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );

        if (!target) return;


        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth",
          block: "start"
        });


        /*
         * Coloca foco na seção para melhorar
         * a navegação por teclado/leitores de tela.
         */
        target.setAttribute(
          "tabindex",
          "-1"
        );

        target.focus({
          preventScroll: true
        });
      }
    );
  });
}


/* ============================================================
   12. HEADER ATIVO
   ============================================================ */


/**
 * Destaca visualmente a seção atualmente visível.
 */
function setupActiveNavigation() {
  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".main-nav a"
    );

  if (!sections.length || !navLinks.length) {
    return;
  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          const id =
            entry.target.id;


          navLinks.forEach((link) => {

            const isActive =
              link.getAttribute("href") ===
              `#${id}`;

            link.setAttribute(
              "aria-current",
              isActive
                ? "page"
                : "false"
            );
          });
        });
      },
      {
        rootMargin:
          "-25% 0px -65% 0px"
      }
    );


  sections.forEach((section) => {
    observer.observe(section);
  });
}


/* ============================================================
   13. LOADING
   ============================================================ */


/**
 * Esconde a tela de carregamento depois que a página
 * e seus elementos principais estiverem prontos.
 */
function setupLoading() {

  window.addEventListener(
    "load",
    () => {

      /*
       * Pequeno atraso proposital para que o loading
       * não desapareça instantaneamente em máquinas rápidas.
       */
      window.setTimeout(() => {

        elements.loadingScreen?.classList.add(
          "loaded"
        );

      }, 450);
    }
  );
}


/* ============================================================
   14. INICIALIZAÇÃO
   ============================================================ */


/**
 * Função central da aplicação.
 *
 * A ideia é manter cada funcionalidade isolada em sua própria
 * função e usar este bloco apenas para inicializá-las.
 */
function init() {

  // Conteúdo dinâmico
  renderProblemCards();
  renderDataCards();
  renderGallery();

  // Componentes interativos
  setupCarousel();
  setupTabs();
  setupAccordion();

  // Acessibilidade
  setupContrast();
  setupFontSize();

  // UX
  setupScrollReveal();
  setupCTA();
  setupSmoothScroll();
  setupActiveNavigation();

  // Loading
  setupLoading();
}


/*
 * Aguarda o DOM estar disponível antes de inicializar.
 */
if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

} else {

  init();
}