/* ══════════════════════════════════════
   ESTRELAS ANIMADAS (canvas de fundo)
══════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx    = canvas.getContext('2d');
  let stars    = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    stars = Array.from({ length: 160 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.3,
      a:     Math.random(),
      speed: Math.random() * 0.004 + 0.001,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.a += s.speed;
      const alpha = (Math.sin(s.a) + 1) / 2 * 0.7 + 0.05;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 245, 220, ${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  tick();
})();


/* ══════════════════════════════════════
   BOTÃO DE INÍCIO (tela de entrada)
══════════════════════════════════════ */
document.getElementById('btn-start').addEventListener('click', () => {
  const intro = document.getElementById('intro');
  const main  = document.getElementById('main-content');

  intro.classList.add('hidden');

  setTimeout(() => {
    intro.style.display = 'none';
    main.style.display  = 'block';

    setTimeout(() => {
      document.getElementById('site-header').classList.add('visible');
    }, 100);

    observeChapters();
  }, 1000);
});


/* ══════════════════════════════════════
   SCROLL REVEAL DOS CAPÍTULOS
══════════════════════════════════════ */
function observeChapters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.chapter').forEach(chapter => {
    observer.observe(chapter);
  });
}


/* ══════════════════════════════════════
   BOTÕES DO YOUTUBE
   Ao clicar → abre o link + revela a mensagem
══════════════════════════════════════ */
document.querySelectorAll('.btn-youtube').forEach(btn => {
  btn.addEventListener('click', () => {
    // marca o botão como clicado (esmaece visualmente)
    btn.classList.add('clicked');

    // encontra a mensagem dentro do mesmo card
    const card    = btn.closest('.card');
    const message = card.querySelector('.love-message');
    const hint    = card.querySelector('.listen-hint');

    // revela a mensagem com animação
    if (message && !message.classList.contains('revealed')) {
      message.classList.add('revealed');

      if (hint) hint.style.display = 'none';

      // rola suavemente até a mensagem após a animação começar
      setTimeout(() => {
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400);
    }
  });
});


/* ══════════════════════════════════════
   BOTÃO ESCONDER TODAS AS MENSAGENS
══════════════════════════════════════ */
document.getElementById('btn-reset').addEventListener('click', () => {
  // esconde todas as mensagens reveladas
  document.querySelectorAll('.love-message.revealed').forEach(msg => {
    msg.classList.remove('revealed');
  });

  // reativa todos os botões do YouTube
  document.querySelectorAll('.btn-youtube.clicked').forEach(btn => {
    btn.classList.remove('clicked');
  });

  // mostra novamente as dicas de instrução
  document.querySelectorAll('.listen-hint').forEach(hint => {
    hint.style.display = '';
  });

  // rola de volta ao topo suavemente
  window.scrollTo({ top: 0, behavior: 'smooth' });
});