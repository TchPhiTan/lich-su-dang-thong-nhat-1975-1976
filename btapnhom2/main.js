/**
 * BTAPNHOM2 — Infographic: Chính sách Dân tộc ĐCSVN Thời kỳ Đổi mới
 * main.js — Chart.js, Scroll animations, Counter effects
 *
 * Quy tắc: KHÔNG tự bịa số liệu. Tất cả data từ assets/data/stats.json
 */

'use strict';

/* ══════════════════════════════════════════════
   1. LOAD DATA từ stats.json
   ══════════════════════════════════════════════ */
let statsData = null;

async function loadStats() {
  try {
    const res = await fetch('assets/data/stats.json');
    statsData = await res.json();
  } catch (e) {
    // Fallback inline nếu không load được file (e.g. file:// protocol)
    statsData = {
      poverty_rate_history: [
        { year: 1986, rate: 70 },
        { year: 1993, rate: 58.1 },
        { year: 2000, rate: 28.9 },
        { year: 2010, rate: 14.2 },
        { year: 2020, rate: 4.8 },
        { year: 2024, rate: 1.93 }
      ],
      national_assembly: { dtts_percentage: 17.84, dtts_deputies: 89, total_deputies: 499 }
    };
  }
}

/* ══════════════════════════════════════════════
   2. INTERSECTION OBSERVER — Scroll Animations
   ══════════════════════════════════════════════ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('visible');
        observer.unobserve(el);

        // Trigger counters on stat cards
        if (el.classList.contains('stat-card')) {
          const counter = el.querySelector('[data-target]');
          if (counter) animateCounter(counter);
        }

        // Trigger charts when chart box visible
        if (el.id === 'chart-box-poverty' && statsData) initPovertyChart();
        if (el.id === 'chart-box-na'     && statsData) initNAChart();
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  // Observe all animated elements
  document.querySelectorAll('[data-animate]').forEach((el, i) => {
    const delay = el.dataset.delay || (i * 80);
    el.style.transitionDelay = delay + 'ms';
    observer.observe(el);
  });

  // Observe chart boxes
  document.querySelectorAll('.chart-box').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   3. COUNTER ANIMATION
   ══════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  const decimals = isDecimal ? (String(target).split('.')[1]?.length || 1) : 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    el.textContent = decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString('vi-VN');

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString('vi-VN');
  }

  requestAnimationFrame(update);
}

/* ══════════════════════════════════════════════
   4. CHART: Tỷ lệ nghèo theo năm (Bar Chart)
   ══════════════════════════════════════════════ */
function initPovertyChart() {
  const canvas = document.getElementById('povertyChart');
  if (!canvas || canvas._chartInstance) return;

  const data = statsData.poverty_rate_history;
  const labels = data.map(d => d.year.toString());
  const values = data.map(d => d.rate);

  // Color gradient: red becoming greener as poverty decreases
  const colors = [
    'rgba(183, 28, 28, 0.85)',
    'rgba(198, 40, 40, 0.80)',
    'rgba(211, 47, 47, 0.75)',
    'rgba(244, 67, 54, 0.70)',
    'rgba(76, 175, 80, 0.80)',
    'rgba(46, 125, 50, 0.90)'
  ];

  canvas._chartInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Tỷ lệ hộ nghèo (%)',
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(c => c.replace('0.85','1').replace('0.80','1').replace('0.75','1').replace('0.70','1')),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y}%`,
            afterLabel: ctx => {
              const note = data[ctx.dataIndex]?.note;
              return note ? `  ${note}` : '';
            }
          },
          backgroundColor: '#1A1A1A',
          titleColor: '#fff',
          bodyColor: '#ccc',
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "'Be Vietnam Pro', sans-serif", size: 12 },
            color: '#4A4A4A'
          }
        },
        y: {
          beginAtZero: true,
          max: 80,
          grid: { color: 'rgba(0,0,0,0.06)' },
          ticks: {
            font: { family: "'Be Vietnam Pro', sans-serif", size: 11 },
            color: '#767676',
            callback: v => v + '%'
          }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      }
    }
  });
}

/* ══════════════════════════════════════════════
   5. CHART: ĐBQH DTTS (Donut Chart)
   ══════════════════════════════════════════════ */
function initNAChart() {
  const canvas = document.getElementById('naChart');
  if (!canvas || canvas._chartInstance) return;

  const { dtts_percentage, dtts_deputies, total_deputies } = statsData.national_assembly;
  const others = 100 - dtts_percentage;

  canvas._chartInstance = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: [`DTTS: ${dtts_deputies} đại biểu (${dtts_percentage}%)`, `Các thành phần khác: ${total_deputies - dtts_deputies} đại biểu`],
      datasets: [{
        data: [dtts_percentage, others],
        backgroundColor: ['#F9A825', 'rgba(0,0,0,0.07)'],
        borderColor: ['#FFD700', 'rgba(0,0,0,0.1)'],
        borderWidth: [2, 1],
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: "'Be Vietnam Pro', sans-serif", size: 11 },
            color: '#4A4A4A',
            padding: 16,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 6
          }
        },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.label}` },
          backgroundColor: '#1A1A1A',
          titleColor: '#fff',
          bodyColor: '#ccc',
          padding: 12,
          cornerRadius: 8
        }
      },
      animation: {
        animateRotate: true,
        duration: 1200,
        easing: 'easeOutQuart'
      }
    }
  });
}

/* ══════════════════════════════════════════════
   6. ACTIVE NAV HIGHLIGHT (scroll spy)
   ══════════════════════════════════════════════ */
function initScrollSpy() {
  const sections = ['hero', 'timeline', 'pillars', 'stats', 'conclusion'];
  const navLinks = {
    timeline: document.getElementById('nav-timeline'),
    pillars:  document.getElementById('nav-pillars'),
    stats:    document.getElementById('nav-stats'),
    conclusion: document.getElementById('nav-conclusion')
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        Object.values(navLinks).forEach(link => {
          if (link) link.style.color = '';
        });
        if (navLinks[id]) navLinks[id].style.color = 'var(--red-primary)';
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ══════════════════════════════════════════════
   7. INIT
   ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
  initScrollAnimations();
  initScrollSpy();
});
