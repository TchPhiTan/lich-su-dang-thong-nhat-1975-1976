// ===== LUCIDE ICONS & GEO-MAP INIT =====
    document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      initScrollTrigger();
      initFadeAnimations();
      updateGeoMapHUD(0);
      initHemicycle();
      initComparisonSlider();
      selectNationalSymbol('emblem');
    });

    // ===== PROGRESS BAR =====
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      document.getElementById('progress-bar').style.width = progress + '%';
    });

    // ===== SCROLL TO CHAPTER =====
    function scrollToChapter(index) {
      const chapter = document.getElementById(`chapter-${index}`);
      if (chapter) {
        chapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // ===== TIMELINE NAV & GEO-MAP UPDATE =====
    function updateTimelineNav() {
      const dots = document.querySelectorAll('.timeline-dot');
      const chapters = [];
      for (let i = 0; i <= 7; i++) {
        const el = document.getElementById(`chapter-${i}`);
        if (el) chapters.push(el);
      }

      const scrollPos = window.scrollY + window.innerHeight / 3;

      let activeIndex = 0;
      chapters.forEach((ch, i) => {
        if (scrollPos >= ch.offsetTop) activeIndex = i;
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });

      // Synchronize Interactive Geo-Map HUD
      updateGeoMapHUD(activeIndex);

      // Synchronize Step 5: Reporter Heritage Stamps Collector
      if (typeof collectHeritageStamp === 'function' && activeIndex >= 1 && activeIndex <= 6) {
        collectHeritageStamp(activeIndex);
      }
    }
    window.addEventListener('scroll', updateTimelineNav);

    // ===== CURATOR TAB SWITCHER =====
    function switchGraphicTab(chapter, view) {
      const graphic = document.getElementById(`graphic-${chapter}`);
      if (!graphic) return;
      const tabs = graphic.querySelectorAll('.curator-tab');
      tabs.forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-view') === view);
      });
      const views = graphic.querySelectorAll('.graphic-view');
      views.forEach(v => {
        v.classList.toggle('active', v.getAttribute('data-view') === view);
      });
      if (window.lucide) lucide.createIcons();
    }

    // ===== GSAP SCROLLTRIGGER INIT =====
    function initScrollTrigger() {
      gsap.registerPlugin(ScrollTrigger);

      // Narrative cards — animate on scroll & sync curator tabs
      const narrativeCards = document.querySelectorAll('.narrative-card');
      narrativeCards.forEach(card => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'top 25%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Auto-switch graphic tabs on scroll
        const chapter = card.getAttribute('data-chapter');
        const view = card.getAttribute('data-view');
        if (chapter && view) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 65%',
            end: 'bottom 35%',
            onEnter: () => switchGraphicTab(chapter, view),
            onEnterBack: () => switchGraphicTab(chapter, view),
          });
        }
      });
    }

    // ===== HERO & GENERAL FADE ANIMATIONS =====
    function initFadeAnimations() {
      // Hero elements
      const heroFades = document.querySelector('.hero-section')?.querySelectorAll('.fade-up') || [];
      heroFades.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3 + i * 0.15, ease: 'power3.out' }
        );
      });

      // Quiz section fades
      const quizFades = document.querySelector('#chapter-7')?.querySelectorAll('.fade-up') || [];
      quizFades.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
            scrollTrigger: {
              trigger: el, start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }

    // ===== WAVEFORM TOGGLE =====
    let waveformPlaying = false;
    function toggleWaveform() {
      const waveform = document.getElementById('waveform');
      const icon = document.getElementById('waveform-icon');
      waveformPlaying = !waveformPlaying;
      if (waveformPlaying) {
        waveform.classList.remove('paused');
        icon.setAttribute('data-lucide', 'pause');
      } else {
        waveform.classList.add('paused');
        icon.setAttribute('data-lucide', 'play');
      }
      lucide.createIcons();
    }

    // ===== STEP 5: SỔ TAY KÝ GIẢ 1976 & CON DẤU DI SẢN =====
    const STAMPS_DATA = [
      {
        chapter: 1,
        id: 'stamp-ch1',
        code: 'SEAL-1975-SG',
        name: 'Dấu Giải Phóng Sài Gòn',
        authority: 'ỦY BAN QUÂN QUẢN THÀNH PHỐ SÀI GÒN — GIA ĐỊNH',
        date: '30/04/1975',
        location: 'Sài Gòn',
        quote: 'Non sông liền một dải — Độc lập hoàn toàn',
        memo: 'Ngày 30/4/1975, cờ Giải phóng tung bay trên Dinh Độc Lập. Miền Nam hoàn toàn giải phóng. Song đất nước đứng trước nghịch lý: non sông đã liền một dải nhưng tồn tại hai chính phủ, hai hệ thống pháp luật. Yêu cầu thống nhất về mặt Nhà nước trở thành mệnh lệnh sống còn.',
        svgType: 'circle',
        centerText: '30-4-1975',
        subText: 'SÀI GÒN GIẢI PHÓNG',
        borderText: 'ỦY BAN QUÂN QUẢN THÀNH PHỐ SÀI GÒN - GIA ĐỊNH ★',
        rotation: '-3deg',
      },
      {
        chapter: 2,
        id: 'stamp-ch2',
        code: 'SEAL-1975-TW24',
        name: 'Dấu Hội Nghị Trung Ương 24',
        authority: 'BAN CHẤP HÀNH TRUNG ƯƠNG ĐẢNG LAO ĐỘNG VIỆT NAM',
        date: 'Tháng 9/1975',
        location: 'Trung ương Đảng',
        quote: 'Quy luật khách quan — Nguyện vọng thiết tha',
        memo: 'Hội nghị Trung ương lần thứ 24 đề ra chủ trương chiến lược: Khẩn trương hoàn thành thống nhất Tổ quốc về mặt Nhà nước thông qua Tổng tuyển cử dân chủ trên phạm vi toàn quốc. Đây là bản thiết kế thể chế mở đường cho kỷ nguyên mới.',
        svgType: 'square',
        centerText: 'HỘI NGHỊ TW 24',
        subText: 'HỘI NGHỊ • 9/1975',
        borderText: 'BAN CHẤP HÀNH TRUNG ƯƠNG ĐẢNG LAO ĐỘNG VIỆT NAM ★',
        rotation: '2.5deg',
      },
      {
        chapter: 3,
        id: 'stamp-ch3',
        code: 'SEAL-1975-HTCT',
        name: 'Dấu Hiệp Thương Bắc — Nam',
        authority: 'HỘI NGHỊ HIỆP THƯƠNG CHÍNH TRỊ THỐNG NHẤT TỔ QUỐC',
        date: 'Tháng 11/1975',
        location: 'Sài Gòn',
        quote: 'Bắc Nam sum họp — Một nhà thống nhất',
        memo: 'Hai phái đoàn đại biểu nhân dân miền Bắc (đồng chí Trường Chinh dẫn đầu) và miền Nam (đồng chí Phạm Hùng dẫn đầu) họp tại Sài Gòn. Hội nghị khẳng định sự đồng thuận tuyệt đối về chủ trương, nguyên tắc phổ thông đầu phiếu và kế hoạch tổ chức Tổng tuyển cử.',
        svgType: 'oval',
        centerText: 'BẮC - NAM SUM HỌP',
        subText: 'THÔNG CÁO CHUNG',
        borderText: 'HỘI NGHỊ HIỆP THƯƠNG CHÍNH TRỊ THỐNG NHẤT TỔ QUỐC ★',
        rotation: '-2deg',
      },
      {
        chapter: 4,
        id: 'stamp-ch4',
        code: 'SEAL-1976-TTC',
        name: 'Dấu Ngày Hội Non Sông 1976',
        authority: 'HỘI ĐỒNG BẦU CỬ TOÀN QUỐC',
        date: '25/04/1976',
        location: 'Toàn quốc',
        quote: 'Hơn 23 triệu cử tri — Ngày hội non sông',
        memo: 'Hơn 23 triệu cử tri (đạt 98,77%) trên toàn quốc nô nức đi bỏ phiếu bầu ra 492 đại biểu Quốc hội chung. Cuộc Tổng tuyển cử thắng lợi rực rỡ, biểu dương sức mạnh vĩ đại của khối đại đoàn kết toàn dân tộc từ ải Nam Quan đến mũi Cà Mau.',
        svgType: 'circle',
        centerText: '25-04-1976',
        subText: '492 ĐẠI BIỂU',
        borderText: 'TỔNG TUYỂN CỬ BẦU QUỐC HỘI THỐNG NHẤT ★',
        rotation: '3deg',
      },
      {
        chapter: 5,
        id: 'stamp-ch5',
        code: 'SEAL-1976-QH6',
        name: 'Dấu Khai Sinh Quốc Hiệu',
        authority: 'QUỐC HỘI NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
        date: '02/07/1976',
        location: 'Hội trường Ba Đình, Hà Nội',
        quote: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
        memo: 'Kỳ họp thứ nhất Quốc hội khóa VI thông qua các quyết sách lịch sử: Đặt tên nước là CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM; Quốc kỳ cờ đỏ sao vàng; Quốc ca Tiến quân ca; Thủ đô Hà Nội; và đổi tên thành phố Sài Gòn — Gia Định thành Thành phố Hồ Chí Minh.',
        svgType: 'emblem',
        centerText: 'QUỐC HỘI VI',
        subText: '02-07-1976',
        borderText: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM ★ BA ĐÌNH',
        rotation: '-1.5deg',
      },
      {
        chapter: 6,
        id: 'stamp-ch6',
        code: 'SEAL-1977-UN',
        name: 'Dấu Vị Thế Quốc Tế (Liên Hợp Quốc)',
        authority: 'PHÁI ĐOÀN ĐẠI DIỆN THƯỜNG TRỰC TẠI LIÊN HỢP QUỐC',
        date: '20/09/1977',
        location: 'New York, Hoa Kỳ',
        quote: 'Thành viên thứ 149 của Liên Hợp Quốc',
        memo: 'Cờ đỏ sao vàng kiêu hãnh tung bay tại Trụ sở Liên Hợp Quốc ở New York. Việt Nam chính thức trở thành thành viên thứ 149, khẳng định tư cách pháp lý thống nhất, toàn vẹn chủ quyền lãnh thổ và vị thế bình đẳng trên trường quốc tế.',
        svgType: 'circle',
        centerText: 'THÀNH VIÊN 149',
        subText: 'LIÊN HỢP QUỐC',
        borderText: 'PHÁI ĐOÀN ĐẠI DIỆN VIỆT NAM TẠI LIÊN HỢP QUỐC ★',
        rotation: '2deg',
      },
    ];

    let collectedStamps = new Set();
    let currentNotebookTab = 'stamps';

    // Load persisted stamps
    try {
      const savedStamps = localStorage.getItem('lsd_stamps_collected_1976');
      if (savedStamps) {
        const parsed = JSON.parse(savedStamps);
        if (Array.isArray(parsed)) {
          parsed.forEach(n => collectedStamps.add(Number(n)));
        }
      }
    } catch (e) {
      console.warn('Storage unavailable', e);
    }

    // Audio synthesizer for wax/rubber stamp sound
    function playStampSound() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } catch (e) {}
    }

    function updateFabStampDisplay() {
      const count = collectedStamps.size;
      const countEl = document.getElementById('fab-stamp-count');
      const labelEl = document.getElementById('fab-stamp-label');
      const fabEl = document.getElementById('reporter-fab');
      if (countEl) countEl.textContent = `${count}/6`;
      if (labelEl) labelEl.textContent = `${count}/6 Dấu di sản`;
      if (fabEl) {
        fabEl.classList.toggle('glow', count === 6);
      }
    }

    function collectHeritageStamp(chapterIndex) {
      if (chapterIndex < 1 || chapterIndex > 6) return;
      if (collectedStamps.has(chapterIndex)) return;

      collectedStamps.add(chapterIndex);
      try {
        localStorage.setItem('lsd_stamps_collected_1976', JSON.stringify(Array.from(collectedStamps)));
      } catch (e) {}

      updateFabStampDisplay();
      playStampSound();

      // Show Toast Notification
      const stampData = STAMPS_DATA.find(s => s.chapter === chapterIndex);
      if (stampData) {
        const toast = document.getElementById('stamp-toast');
        const nameEl = document.getElementById('toast-stamp-name');
        if (toast && nameEl) {
          nameEl.textContent = `${stampData.name} (${stampData.date})`;
          toast.classList.add('show');
          if (window._toastTimer) clearTimeout(window._toastTimer);
          window._toastTimer = setTimeout(() => {
            toast.classList.remove('show');
          }, 3500);
        }
      }

      // Re-render if modal is currently open on stamps tab
      const modal = document.getElementById('reporter-modal');
      if (modal && modal.classList.contains('open') && currentNotebookTab === 'stamps') {
        renderNotebookContent();
      }
    }

    function generateStampSVG(s, isUnlocked) {
      const color = isUnlocked ? '#DC2626' : '#6B7280';
      if (s.svgType === 'square') {
        return `
          <svg viewBox="0 0 160 160" width="100%" height="100%" style="color:${color}; transform: rotate(${s.rotation});">
            <rect x="14" y="14" width="132" height="132" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="7 3"/>
            <rect x="22" y="22" width="116" height="116" stroke="currentColor" stroke-width="1.8" fill="none"/>
            <polygon points="80,36 83,45 93,45 85,51 88,60 80,54 72,60 75,51 67,45 77,45" fill="currentColor"/>
            <text x="80" y="74" font-family="'Cinzel', serif" font-weight="900" font-size="12" text-anchor="middle" fill="currentColor">${s.centerText}</text>
            <text x="80" y="92" font-size="9" font-weight="bold" text-anchor="middle" fill="currentColor">${s.location}</text>
            <text x="80" y="108" font-size="8.5" font-weight="bold" text-anchor="middle" fill="currentColor">${s.date}</text>
            <line x1="38" y1="116" x2="122" y2="116" stroke="currentColor" stroke-width="1.5"/>
            <text x="80" y="128" font-size="7" font-weight="bold" text-anchor="middle" fill="currentColor">MỆNH LỆNH THỐNG NHẤT</text>
          </svg>
        `;
      }
      if (s.svgType === 'oval') {
        return `
          <svg viewBox="0 0 160 160" width="100%" height="100%" style="color:${color}; transform: rotate(${s.rotation});">
            <ellipse cx="80" cy="80" rx="72" ry="54" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="6 2.5"/>
            <ellipse cx="80" cy="80" rx="63" ry="45" stroke="currentColor" stroke-width="1.8" fill="none"/>
            <polygon points="80,48 83,55 91,55 84,60 87,67 80,62 73,67 76,60 69,55 77,55" fill="currentColor"/>
            <text x="80" y="76" font-family="'Cinzel', serif" font-weight="900" font-size="11" text-anchor="middle" fill="currentColor">${s.centerText}</text>
            <text x="80" y="91" font-size="8.5" font-weight="bold" text-anchor="middle" fill="currentColor">${s.subText}</text>
            <text x="80" y="104" font-size="8" font-weight="bold" text-anchor="middle" fill="currentColor">${s.date}</text>
          </svg>
        `;
      }
      if (s.svgType === 'emblem') {
        return `
          <svg viewBox="0 0 160 160" width="100%" height="100%" style="color:${color}; transform: rotate(${s.rotation});">
            <circle cx="80" cy="80" r="72" stroke="currentColor" stroke-width="3.5" fill="none"/>
            <circle cx="80" cy="80" r="64" stroke="currentColor" stroke-width="1.8" fill="none" stroke-dasharray="4 2"/>
            <polygon points="80,38 84,48 95,48 86,55 90,66 80,59 70,66 74,55 65,48 76,48" fill="currentColor"/>
            <text x="80" y="80" font-family="'Cinzel', serif" font-weight="900" font-size="11" text-anchor="middle" fill="currentColor">QUỐC HỘI VI</text>
            <text x="80" y="95" font-size="8.5" font-weight="bold" text-anchor="middle" fill="currentColor">02-07-1976</text>
            <text x="80" y="108" font-size="7" font-weight="bold" text-anchor="middle" fill="currentColor">HỘI TRƯỜNG BA ĐÌNH</text>
          </svg>
        `;
      }
      // Default: Circular Seal
      return `
        <svg viewBox="0 0 160 160" width="100%" height="100%" style="color:${color}; transform: rotate(${s.rotation});">
          <circle cx="80" cy="80" r="72" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="6 3"/>
          <circle cx="80" cy="80" r="64" stroke="currentColor" stroke-width="2" fill="none"/>
          <polygon points="80,44 83,53 93,53 85,59 88,68 80,62 72,68 75,59 67,53 77,53" fill="currentColor"/>
          <text x="80" y="82" font-family="'Cinzel', serif" font-weight="900" font-size="12" text-anchor="middle" fill="currentColor">${s.centerText}</text>
          <text x="80" y="97" font-size="8.5" font-weight="bold" text-anchor="middle" fill="currentColor">${s.subText}</text>
          <text x="80" y="110" font-size="8" font-weight="bold" text-anchor="middle" fill="currentColor">${s.location}</text>
        </svg>
      `;
    }

    function switchNotebookTab(tabName) {
      currentNotebookTab = tabName;
      ['stamps', 'report', 'summary'].forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        if (btn) btn.classList.toggle('active', t === tabName);
      });
      renderNotebookContent();
    }

    function renderNotebookContent() {
      const container = document.getElementById('notebook-modal-body');
      if (!container) return;

      if (currentNotebookTab === 'stamps') {
        const total = STAMPS_DATA.length;
        const count = collectedStamps.size;
        const percent = Math.round((count / total) * 100);

        let cardsHtml = STAMPS_DATA.map(s => {
          const isUnlocked = collectedStamps.has(s.chapter);
          return `
            <div class="stamp-card ${isUnlocked ? 'unlocked' : 'locked'}">
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-[10px] font-mono text-amber/80 font-bold">${s.code}</span>
                <span class="stamp-seal-badge ${isUnlocked ? 'unlocked' : 'locked'}">
                  ${isUnlocked ? '<i data-lucide="check-check" class="w-3 h-3 inline mr-1"></i> Đã đóng dấu' : '<i data-lucide="lock" class="w-3 h-3 inline mr-1"></i> Chưa mở khóa'}
                </span>
              </div>
              <div class="stamp-svg-preview">
                ${generateStampSVG(s, isUnlocked)}
              </div>
              <h4 class="font-serif font-bold text-sm text-parchment leading-tight">${s.name}</h4>
              <p class="text-[10.5px] text-amber/80 font-sans mt-0.5">${s.authority}</p>
              <div class="flex items-center gap-2 text-[10px] text-parchment/60 mt-1">
                <span><i data-lucide="calendar" class="w-3 h-3 inline mr-0.5"></i> ${s.date}</span>
                <span>•</span>
                <span><i data-lucide="map-pin" class="w-3 h-3 inline mr-0.5"></i> ${s.location}</span>
              </div>
              <div class="stamp-memo-box">
                "${s.memo}"
              </div>
              <div class="mt-3 pt-2.5 border-t border-amber/15 flex items-center justify-between">
                <span class="text-[10px] text-parchment/60 italic">${s.quote}</span>
                <button onclick="closeReporterModal(); scrollToChapter(${s.chapter});" class="text-[10.5px] text-amber hover:text-amber-light font-semibold underline flex items-center gap-1">
                  Đến Màn ${s.chapter} <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </button>
              </div>
            </div>
          `;
        }).join('');

        container.innerHTML = `
          <div>
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-amber/20 mb-6">
              <div>
                <h4 class="font-serif text-base font-bold text-parchment flex items-center gap-2">
                  <i data-lucide="scroll" class="w-4 h-4 text-amber"></i>
                  Hành Trình Thu Thập Dấu Mộc Di Sản
                </h4>
                <p class="text-xs text-parchment/70 mt-1">
                  Mỗi khi bạn tìm hiểu và cuộn qua một chương lịch sử, con dấu mộc đỏ di sản tương ứng sẽ được lưu vào hồ sơ tư liệu nghiên cứu của bạn.
                </p>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <div class="text-[11px] text-parchment/60">Tiến độ thu thập</div>
                  <div class="text-sm font-mono font-bold text-amber">${count} / ${total} Dấu di sản</div>
                </div>
                <div class="w-24 h-2.5 bg-black/60 rounded-full border border-amber/30 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-lacquer to-amber transition-all duration-500" style="width: ${percent}%"></div>
                </div>
              </div>
            </div>

            <div class="stamps-grid">
              ${cardsHtml}
            </div>
          </div>
        `;
      } else if (currentNotebookTab === 'report') {
        container.innerHTML = `
          <div class="archival-doc mx-auto max-w-2xl p-6 md:p-8" style="background:#F4EBD9; color:#1A1A1A;">
            <div class="text-center mb-6">
              <p class="text-xs uppercase tracking-widest text-amber-dark font-sans font-semibold mb-1">Tư liệu báo chí & Biên niên lịch sử chính thống</p>
              <h2 class="text-xl md:text-2xl font-bold text-lacquer-dark leading-tight font-serif">THÔNG CÁO LỊCH SỬ VỀ NGÀY TỔNG TUYỂN CỬ 25/4/1976</h2>
              <p class="text-xs md:text-sm text-slate-deep mt-1 font-sans">Nguồn: Hội đồng bầu cử toàn quốc & Bản tin Thông tấn xã Việt Nam (Tháng 4–5/1976)</p>
              <div class="h-px bg-lacquer-dark/30 mt-4"></div>
            </div>
            <div class="font-sans text-slate-deep text-xs md:text-sm leading-relaxed space-y-4" style="font-family: 'Be Vietnam Pro', sans-serif;">
              <div class="p-3 rounded bg-lacquer-dark/5 border-l-4 border-lacquer-dark">
                <p class="font-bold text-lacquer-dark uppercase text-[11px] tracking-wide mb-1">Trích Thông cáo của Hội đồng bầu cử toàn quốc:</p>
                <p class="italic text-slate-charcoal">"Cuộc Tổng tuyển cử ngày 25 tháng 4 năm 1976 bầu Quốc hội của nước Việt Nam thống nhất đã hoàn toàn thắng lợi rực rỡ. Toàn thể nhân dân Việt Nam từ Bắc chí Nam đã nô nức làm tròn nghĩa vụ công dân thiêng liêng, thể hiện ý chí sắt đá không gì lay chuyển nổi của toàn dân tộc quyết tâm xây dựng một nước Việt Nam độc lập, thống nhất và xã hội chủ nghĩa."</p>
              </div>

              <h4 class="font-bold text-lacquer-dark text-sm border-b border-lacquer-dark/20 pb-1 mt-4">1. Quy mô và số liệu cử tri toàn quốc</h4>
              <p>Theo số liệu thống kê chính thức của Hội đồng bầu cử toàn quốc công bố:</p>
              <ul class="list-disc pl-5 space-y-1.5 text-slate-charcoal">
                <li>Tổng số cử tri cả nước đi bỏ phiếu đạt <strong>98,77%</strong> (với hơn <strong>23 triệu cử tri</strong> tham gia bầu cử trên cả hai miền đất nước).</li>
                <li>Tại miền Bắc: Tỷ lệ cử tri đi bầu đạt <strong>99,36%</strong>.</li>
                <li>Tại miền Nam: Tỷ lệ cử tri đi bầu đạt <strong>97,96%</strong> (nhiều khu phố, xã ấp tại Thành phố Sài Gòn — Gia Định và các tỉnh Nam Bộ đạt tỷ lệ cử tri đi bầu tuyệt đối 100%).</li>
              </ul>

              <h4 class="font-bold text-lacquer-dark text-sm border-b border-lacquer-dark/20 pb-1 mt-4">2. Kết quả bầu cử Đại biểu Quốc hội khóa VI</h4>
              <p>Cuộc Tổng tuyển cử đã bầu ra đúng và đủ <strong>492 đại biểu Quốc hội</strong> (trong đó miền Bắc bầu 249 đại biểu, miền Nam bầu 243 đại biểu). Thành phần đại biểu phản ánh trọn vẹn khối đại đoàn kết toàn dân tộc:</p>
              <ul class="list-disc pl-5 space-y-1 text-slate-charcoal">
                <li>80 đại biểu là công nhân</li>
                <li>100 đại biểu là nông dân</li>
                <li>54 đại biểu là quân nhân cách mạng</li>
                <li>98 đại biểu là trí thức và văn nghệ sĩ tiêu biểu</li>
                <li>67 đại biểu là đồng bào các dân tộc thiểu số</li>
                <li>132 đại biểu là phụ nữ</li>
                <li>127 đại biểu là thanh niên (dưới 35 tuổi)</li>
                <li>Nhiều nhân sĩ, trí thức, chức sắc tôn giáo tiến bộ và lực lượng cách mạng miền Nam được nhân dân tín nhiệm bầu với số phiếu rất cao.</li>
              </ul>

              <h4 class="font-bold text-lacquer-dark text-sm border-b border-lacquer-dark/20 pb-1 mt-4">3. Ý nghĩa pháp lý và lịch sử đã được kiểm chứng</h4>
              <p>
                Đây là cuộc Tổng tuyển cử dân chủ đầu tiên trên phạm vi cả nước sau 30 năm kể từ ngày Tổng tuyển cử đầu tiên năm 1946. Thắng lợi của cuộc bầu cử ngày 25/4/1976 đã hoàn tất việc thống nhất đất nước về mặt Nhà nước về phương diện cơ quan quyền lực cao nhất, tạo cơ sở pháp lý vững chắc để Quốc hội khóa VI khai mạc ngày 24/6/1976 thông qua các quyết sách lịch sử: Đặt Quốc hiệu là <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>, Quốc kỳ, Quốc huy, Quốc ca và đổi tên Thành phố Sài Gòn — Gia Định thành <strong>Thành phố Hồ Chí Minh</strong>.
              </p>

              <div class="mt-6 pt-4 border-t border-lacquer-dark/20 text-right">
                <p class="text-[11px] font-semibold text-lacquer-dark">Hồ sơ tư liệu: Văn kiện Quốc hội toàn tập & Tư liệu Thông tấn xã Việt Nam</p>
                <p class="text-[10px] text-slate-charcoal">Trung tâm Lưu trữ Quốc gia & Bảo tàng Lịch sử Quốc gia Việt Nam</p>
              </div>
            </div>
          </div>
        `;
      } else if (currentNotebookTab === 'summary') {
        const count = collectedStamps.size;
        container.innerHTML = `
          <div class="max-w-3xl mx-auto space-y-6">
            <!-- Action Bar -->
            <div class="flex items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-amber/20">
              <div>
                <h4 class="font-serif text-sm md:text-base font-bold text-parchment">Bảng Tóm Tắt & Thẻ Ghi Nhớ Lịch Sử</h4>
                <p class="text-xs text-parchment/70">Tài liệu chuẩn hóa phục vụ học tập, ôn thi và thuyết trình bảo tàng.</p>
              </div>
              <button onclick="printSummaryCard()" class="px-5 py-2.5 bg-gradient-to-r from-amber to-amber-light hover:brightness-110 text-slate-900 font-bold text-xs rounded-lg shadow-lg flex items-center gap-2 transition-all">
                <i data-lucide="printer" class="w-4 h-4"></i> In Thẻ Ôn Tập (PDF)
              </button>
            </div>

            <!-- The Summary Sheet UI -->
            <div id="summary-card-view" class="p-6 md:p-8 rounded-xl bg-gradient-to-b from-[#22150E] to-[#120A06] border-2 border-amber/30 text-parchment shadow-2xl relative overflow-hidden">
              <div class="text-center pb-5 border-b border-amber/25">
                <p class="text-xs font-bold text-amber tracking-widest uppercase">BẢO TÀNG LỊCH SỬ QUỐC GIA VIỆT NAM</p>
                <h2 class="font-serif text-lg md:text-xl font-black text-amber-light mt-1 tracking-wider uppercase">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </h2>
                <p class="text-xs font-serif italic text-parchment/80 mt-0.5">Độc lập – Tự do – Hạnh phúc</p>
                <div class="mt-3">
                  <h3 class="font-serif text-base md:text-lg font-bold text-parchment">
                    HÀNH TRÌNH THỐNG NHẤT ĐẤT NƯỚC VỀ MẶT NHÀ NƯỚC (1975–1976)
                  </h3>
                  <p class="text-[11px] text-amber/70 font-sans mt-0.5">Bản tóm tắt tri thức cốt lõi & hồ sơ chứng nhận di sản</p>
                </div>
              </div>

              <!-- 3 Core Questions Section -->
              <div class="mt-5 space-y-4">
                <div class="p-3.5 rounded-lg bg-black/35 border-l-4 border-amber">
                  <h4 class="font-serif font-bold text-xs text-amber mb-1">1. Vì sao sau 30/4/1975 phải tiến hành thống nhất về mặt Nhà nước?</h4>
                  <p class="text-xs text-parchment/80 leading-relaxed font-sans">
                    Dù lãnh thổ đã giải phóng, non sông liền một dải nhưng tồn tại hai nhà nước, hai chính phủ, hai hệ thống pháp luật và đồng tiền riêng biệt (Việt Nam Dân chủ Cộng hòa ở miền Bắc và Chính phủ Cách mạng Lâm thời ở miền Nam). Thống nhất về mặt Nhà nước là quy luật khách quan, đáp ứng nguyện vọng thiết tha của nhân dân, tạo tư cách pháp lý thống nhất trên trường quốc tế và tập trung nguồn lực tái thiết non sông.
                  </p>
                </div>

                <div class="p-3.5 rounded-lg bg-black/35 border-l-4 border-lacquer-light">
                  <h4 class="font-serif font-bold text-xs text-lacquer-light mb-1">2. Bốn bước đi lịch sử quyết định (1975–1976)</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1.5 font-sans text-xs text-parchment/80">
                    <div class="p-2 rounded bg-black/20 border border-white/5">
                      <strong class="text-amber">Bước 1 (9/1975):</strong> Hội nghị Trung ương 24 đề ra chủ trương chiến lược.
                    </div>
                    <div class="p-2 rounded bg-black/20 border border-white/5">
                      <strong class="text-amber">Bước 2 (11/1975):</strong> Hội nghị Hiệp thương chính trị tại Sài Gòn đạt đồng thuận tuyệt đối.
                    </div>
                    <div class="p-2 rounded bg-black/20 border border-white/5">
                      <strong class="text-amber">Bước 3 (25/4/1976):</strong> Tổng tuyển cử bầu 492 đại biểu Quốc hội chung toàn quốc.
                    </div>
                    <div class="p-2 rounded bg-black/20 border border-white/5">
                      <strong class="text-amber">Bước 4 (6–7/1976):</strong> Kỳ họp Quốc hội khóa VI hoàn tất thống nhất về mặt Nhà nước.
                    </div>
                  </div>
                </div>

                <div class="p-3.5 rounded-lg bg-black/35 border-l-4 border-amber">
                  <h4 class="font-serif font-bold text-xs text-amber mb-1">3. Các quyết sách thiêng liêng của Kỳ họp thứ nhất Quốc hội khóa VI</h4>
                  <p class="text-xs text-parchment/80 leading-relaxed font-sans">
                    Quốc hiệu: <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>; Quốc kỳ cờ đỏ sao vàng; Quốc ca Tiến quân ca; Thủ đô Hà Nội; đổi tên Sài Gòn — Gia Định thành Thành phố Hồ Chí Minh.
                  </p>
                </div>
              </div>

              <!-- Stamp Certification Footnote -->
              <div class="mt-6 pt-4 border-t border-amber/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-xs text-parchment/70 font-sans">
                  <span>Trạng thái hồ sơ: </span>
                  <strong class="text-amber font-mono font-bold">${count}/6 Con dấu di sản đã xác thực</strong>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] text-amber font-serif font-semibold italic">Chứng nhận học tập — Bảo tàng số 1976</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      if (window.lucide) lucide.createIcons();
    }

    function printSummaryCard() {
      const printContainer = document.getElementById('print-summary-container');
      if (!printContainer) return;

      const count = collectedStamps.size;
      printContainer.innerHTML = `
        <div style="font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #111;">
          <div style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 12px; margin-bottom: 20px;">
            <p style="font-size: 13px; font-weight: bold; margin: 0; text-transform: uppercase;">BẢO TÀNG LỊCH SỬ QUỐC GIA VIỆT NAM</p>
            <h1 style="font-size: 20px; font-weight: bold; margin: 6px 0; color: #8B0000; text-transform: uppercase;">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </h1>
            <p style="font-size: 14px; font-style: italic; margin: 0;">Độc lập – Tự do – Hạnh phúc</p>
            <h2 style="font-size: 17px; font-weight: bold; margin-top: 14px; margin-bottom: 4px;">
              BẢNG TỔNG KẾT: HÀNH TRÌNH THỐNG NHẤT ĐẤT NƯỚC VỀ MẶT NHÀ NƯỚC (1975–1976)
            </h2>
          </div>

          <div style="margin-bottom: 16px;">
            <h3 style="font-size: 15px; font-weight: bold; color: #8B0000; margin-bottom: 6px;">
              I. Vì sao sau ngày 30/4/1975 Việt Nam vẫn phải tiến hành thống nhất về mặt Nhà nước?
            </h3>
            <p style="font-size: 13.5px; line-height: 1.6; text-align: justify; margin: 0;">
              Sau ngày 30/4/1975, tuy non sông đã thu về một mối về mặt lãnh thổ nhưng ở hai miền vẫn tồn tại hai nhà nước, hai chính phủ, hai hệ thống pháp luật và đồng tiền riêng biệt (Việt Nam Dân chủ Cộng hòa ở miền Bắc và Chính phủ Cách mạng Lâm thời ở miền Nam). Thống nhất về mặt Nhà nước là quy luật khách quan của cách mạng, nguyện vọng thiêng liêng của toàn thể nhân dân, nhằm tạo cơ sở pháp lý thống nhất để bảo vệ chủ quyền toàn vẹn lãnh thổ, xác lập tư cách pháp lý bình đẳng trên trường quốc tế và tập trung toàn lực tái thiết đất nước.
            </p>
          </div>

          <div style="margin-bottom: 16px;">
            <h3 style="font-size: 15px; font-weight: bold; color: #8B0000; margin-bottom: 6px;">
              II. Bốn bước đi lịch sử quyết định (1975–1976)
            </h3>
            <ul style="font-size: 13.5px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li><strong>1. Hội nghị Ban Chấp hành Trung ương Đảng lần thứ 24 (9/1975):</strong> Đề ra chủ trương chiến lược khẩn trương hoàn thành thống nhất Tổ quốc về mặt Nhà nước thông qua Tổng tuyển cử dân chủ.</li>
              <li><strong>2. Hội nghị Hiệp thương chính trị (11/1975 tại Sài Gòn):</strong> Hai phái đoàn miền Bắc và miền Nam thống nhất hoàn toàn về nguyên tắc và kế hoạch Tổng tuyển cử.</li>
              <li><strong>3. Ngày hội Tổng tuyển cử toàn quốc (25/4/1976):</strong> Hơn 23 triệu cử tri (98,77%) đi bầu, bầu ra 492 đại biểu Quốc hội thống nhất.</li>
              <li><strong>4. Kỳ họp thứ nhất Quốc hội khóa VI (6–7/1976 tại Hà Nội):</strong> Hoàn thành trọn vẹn việc thống nhất đất nước về mặt Nhà nước.</li>
            </ul>
          </div>

          <div style="margin-bottom: 16px;">
            <h3 style="font-size: 15px; font-weight: bold; color: #8B0000; margin-bottom: 6px;">
              III. Các quyết sách lịch sử tối thượng
            </h3>
            <p style="font-size: 13.5px; line-height: 1.6; margin: 0;">
              - <strong>Quốc hiệu:</strong> CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>
              - <strong>Quốc kỳ:</strong> Cờ đỏ sao vàng<br>
              - <strong>Quốc ca:</strong> Tiến quân ca (Nhạc sĩ Văn Cao)<br>
              - <strong>Thủ đô:</strong> Thành phố Hà Nội<br>
              - <strong>Thành phố mang tên Bác:</strong> Đổi tên thành phố Sài Gòn — Gia Định thành Thành phố Hồ Chí Minh.
            </p>
          </div>

          <div style="margin-top: 30px; display: flex; justify-content: space-between; border-top: 1px solid #ccc; padding-top: 14px;">
            <div style="font-size: 12px; font-style: italic;">
              Hồ sơ tư liệu: Đã xác thực ${count}/6 con dấu di sản.<br>
              Bảo tàng số Lịch sử Việt Nam (1975–1976).
            </div>
            <div style="text-align: center; font-size: 13px; font-weight: bold;">
              HỘI ĐỒNG BIÊN TẬP VÀ GIÁM TUYỂN<br>
              <span style="font-size: 11px; font-weight: normal;">(Ký tên và đóng dấu)</span>
            </div>
          </div>
        </div>
      `;
      window.print();
    }

    // Modal click and key listeners
    function openReporterModal(defaultTab = 'stamps') {
      currentNotebookTab = defaultTab;
      ['stamps', 'report', 'summary'].forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        if (btn) btn.classList.toggle('active', t === defaultTab);
      });
      renderNotebookContent();
      const modal = document.getElementById('reporter-modal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeReporterModal() {
      const modal = document.getElementById('reporter-modal');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    // ===== TEAM MEMBERS MODAL LOGIC =====
    function openTeamModal() {
      const modal = document.getElementById('team-modal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.lucide) lucide.createIcons();
      }
    }

    function closeTeamModal(event) {
      if (event && event.target && event.target.closest && event.target.closest('.team-modal-card') && event.target !== event.currentTarget) {
        return;
      }
      const modal = document.getElementById('team-modal');
      if (modal) {
        modal.classList.remove('open');
        if (!document.getElementById('reporter-modal').classList.contains('open') &&
            !document.getElementById('lightbox-overlay').classList.contains('open') &&
            !document.getElementById('atlas-modal').classList.contains('open')) {
          document.body.style.overflow = '';
        }
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeTeamModal();
        closeReporterModal();
        closeLightbox(e);
        closeAtlasModal(e);
      }
    });

    // Initialize FAB count on page ready
    document.addEventListener('DOMContentLoaded', () => {
      updateFabStampDisplay();
    });
    updateFabStampDisplay();

    // ===== IMAGE LIGHTBOX & CURATION =====
    // Chapter 2: Leaders of Conference 24 Data
    const leadersCh2Data = {
      leduan: {
        src: 'assets/images/le_duan.jpg',
        title: 'Đồng chí Lê Duẩn',
        role: 'Bí thư thứ nhất Ban Chấp hành Trung ương Đảng',
        tag: 'Chân dung Lãnh đạo',
        desc: 'Chủ trì Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (tháng 9/1975), trực tiếp hoạch định và lãnh đạo quyết sách chiến lược: Thống nhất đất nước vừa là quy luật khách quan, vừa là nguyện vọng thiết tha nhất của toàn thể nhân dân hai miền.',
        source: 'Ảnh tư liệu lịch sử: Thông tấn xã Việt Nam / Viện Lịch sử Đảng',
        code: 'HS-1975-TW24-LD'
      },
      truongchinh: {
        src: 'assets/images/truong_chinh.jpg',
        title: 'Đồng chí Trường Chinh',
        role: 'Ủy viên Bộ Chính trị, Chủ tịch Ủy ban Thường vụ Quốc hội',
        tag: 'Chân dung Lãnh đạo',
        desc: 'Đồng chí Trường Chinh là nhân vật trung tâm trong việc cụ thể hóa đường lối thống nhất về mặt Nhà nước. Đồng chí làm Trưởng đoàn đại biểu miền Bắc tại Hội nghị Hiệp thương chính trị (tháng 11/1975) và trực tiếp chỉ đạo xây dựng khung pháp lý Tổng tuyển cử.',
        source: 'Ảnh tư liệu lịch sử: Chân dung đồng chí Trường Chinh',
        code: 'HS-1975-TW24-TC'
      },
      phamvandong: {
        src: 'assets/images/pham_van_dong.webp',
        title: 'Đồng chí Phạm Văn Đồng',
        role: 'Ủy viên Bộ Chính trị, Thủ tướng Chính phủ',
        tag: 'Chân dung Lãnh đạo',
        desc: 'Thủ tướng Phạm Văn Đồng đóng vai trò quan trọng trong việc thống nhất bộ máy quản lý hành chính nhà nước, điều hành kinh tế - xã hội hai miền trong giai đoạn chuyển tiếp, đảm bảo các cơ quan công quyền phối hợp thông suốt.',
        source: 'Ảnh tư liệu lịch sử: Chân dung Thủ tướng Phạm Văn Đồng',
        code: 'HS-1975-TW24-PVD'
      }
    };
    let currentLeaderKey = 'leduan';

    function selectLeaderChapter2(key) {
      if (!leadersCh2Data[key]) return;
      currentLeaderKey = key;
      const data = leadersCh2Data[key];

      // Update pills
      ['leduan', 'truongchinh', 'phamvandong'].forEach(k => {
        const btn = document.getElementById(`leader-btn-${k}`);
        if (btn) {
          if (k === key) {
            btn.className = 'leader-nav-pill active py-1.5 px-1 rounded-lg text-center border border-amber bg-amber/25 text-parchment text-[11px] font-serif font-bold transition-all';
          } else {
            btn.className = 'leader-nav-pill py-1.5 px-1 rounded-lg text-center border border-white/10 bg-black/40 text-parchment/70 text-[11px] font-serif font-bold transition-all hover:border-amber';
          }
        }
      });

      // Update Frame
      const img = document.getElementById('ch2-leader-img');
      if (img) {
        img.src = data.src;
        img.alt = `${data.title} - ${data.role}`;
      }
      const titleEl = document.getElementById('ch2-leader-title');
      if (titleEl) titleEl.textContent = data.title;
      const roleEl = document.getElementById('ch2-leader-role');
      if (roleEl) roleEl.innerHTML = `<span>${data.role}</span>`;
      const descEl = document.getElementById('ch2-leader-desc');
      if (descEl) descEl.textContent = data.desc;
      const srcEl = document.getElementById('ch2-leader-source');
      if (srcEl) srcEl.textContent = data.source;
      const tagEl = document.getElementById('ch2-leader-tag');
      if (tagEl) tagEl.textContent = data.tag;

      // Update exhibitData for Chapter 2
      exhibitData[1].src = data.src;
      exhibitData[1].title = `${data.title} (${data.role})`;
      exhibitData[1].context = data.desc;
      exhibitData[1].source = data.source;
      exhibitData[1].code = data.code;
    }

    // Chapter 4: TTXVN 1976 Election Gallery Data
    const ttxvnGalleryData = [
      {
        src: 'assets/images/hinh4_ttxvn_01_hoi_dong_bau_cu_saigon.jpg',
        title: 'Hội đồng bầu cử toàn quốc họp phiên thứ nhất tại Sài Gòn',
        desc: 'Từ ngày 21 đến 22/2/1976, Hội đồng bầu cử toàn quốc họp phiên thứ nhất tại thành phố Sài Gòn - Gia Định để thảo luận và quy định những công việc về cuộc Tổng tuyển cử bầu Quốc hội chung của cả nước. (Ảnh: Tư liệu TTXVN)',
        date: '21-22/2/1976',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'TTXVN-TTC-01'
      },
      {
        src: 'assets/images/hinh4_ttxvn_02_le_duan_bo_phieu.jpg',
        title: 'Đồng chí Lê Duẩn thực hiện quyền công dân tại Ba Đình, Hà Nội',
        desc: 'Đồng chí Lê Duẩn, Bí thư thứ nhất Ban Chấp hành Trung ương Đảng bỏ phiếu bầu đại biểu Quốc hội tại hòm phiếu số 1, tiểu khu 1, khu phố Ba Đình, Hà Nội trong ngày Tổng tuyển cử 25/4/1976. (Ảnh: Tư liệu TTXVN)',
        date: '25/4/1976',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'TTXVN-TTC-02'
      },
      {
        src: 'assets/images/hinh4_ttxvn_03_ton_duc_thang_bo_phieu.jpg',
        title: 'Chủ tịch Tôn Đức Thắng bỏ phiếu tại Hà Nội',
        desc: 'Chủ tịch Tôn Đức Thắng bỏ phiếu bầu đại biểu Quốc hội của nước Việt Nam thống nhất tại hòm phiếu số 1, tiểu khu 1, khu phố Ba Đình, Hà Nội sáng ngày 25/4/1976. (Ảnh: Tư liệu TTXVN)',
        date: '25/4/1976',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'TTXVN-TTC-03'
      },
      {
        src: 'assets/images/hinh4_ttxvn_04_truong_chinh_noi_chuyen_cu_ong.jpg',
        title: 'Đồng chí Trường Chinh thăm hỏi cử tri cao tuổi',
        desc: 'Đồng chí Trường Chinh, Ủy viên Bộ Chính trị Trung ương Đảng, Chủ tịch Ủy ban Thường vụ Quốc hội nói chuyện thân mật với cụ già 79 tuổi đến bỏ phiếu tại hòm phiếu số 4, khu phố Hoàn Kiếm, Hà Nội (25/4/1976). (Ảnh: Tư liệu TTXVN)',
        date: '25/4/1976',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'TTXVN-TTC-04'
      },
      {
        src: 'assets/images/hinh4_ttxvn_05_pham_van_dong_bo_phieu.jpg',
        title: 'Thủ tướng Phạm Văn Đồng bỏ phiếu tại Ba Đình, Hà Nội',
        desc: 'Thủ tướng Phạm Văn Đồng bỏ lá phiếu đầu tiên tại hòm phiếu số 1, tiểu khu 1, khu phố Ba Đình, Hà Nội trong ngày Tổng tuyển cử 25/4/1976. (Ảnh: Tư liệu TTXVN)',
        date: '25/4/1976',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'TTXVN-TTC-05'
      },
      {
        src: 'assets/images/hinh4_ttxvn_06_nguyen_thi_binh_bo_phieu.jpg',
        title: 'Bà Nguyễn Thị Bình bỏ phiếu tại Quận 6, TP. Sài Gòn - Gia Định',
        desc: 'Bộ trưởng Ngoại giao Chính phủ Cách mạng Lâm thời Cộng hòa miền Nam Việt Nam Nguyễn Thị Bình bỏ phiếu tại hòm phiếu số 35, khu vực 3, Quận 6, TP. Sài Gòn - Gia Định (25/4/1976). (Ảnh: Tư liệu TTXVN)',
        date: '25/4/1976',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'TTXVN-TTC-06'
      },
      {
        src: 'assets/images/hinh4_ttxvn_07_hai_quan_147_bo_phieu.jpg',
        title: 'Chiến sĩ Hải quân Hạm đội 147 nô nức đi bầu cử',
        desc: 'Cán bộ, chiến sĩ Hạm đội 147 Hải quân nhân dân Việt Nam nô nức đi bầu cử đại biểu Quốc hội thống nhất trong ngày hội non sông 25/4/1976. (Ảnh: Tư liệu TTXVN)',
        date: '25/4/1976',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'TTXVN-TTC-07'
      },
      {
        src: 'assets/images/hinh4_ttxvn_08_nha_may_det_8-3.jpg',
        title: 'Công nhân Nhà máy dệt 8-3 hân hoan cầm lá phiếu cử tri',
        desc: 'Đông đảo nữ công nhân Nhà máy dệt 8-3 (Hà Nội) hân hoan cầm lá phiếu cử tri đi bỏ phiếu bầu cử Quốc hội chung của cả nước sáng ngày 25/4/1976. (Ảnh: Tư liệu TTXVN)',
        date: '25/4/1976',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'TTXVN-TTC-08'
      }
    ];
    let currentTtxvnIndex = 0;

    function selectTtxvnPhoto(index, event) {
      if (event) event.stopPropagation();
      if (index < 0 || index >= ttxvnGalleryData.length) return;
      currentTtxvnIndex = index;
      const item = ttxvnGalleryData[index];

      const img = document.getElementById('ttxvn-main-img');
      if (img) {
        img.src = item.src;
        img.alt = item.title;
      }
      const titleEl = document.getElementById('ttxvn-caption-title');
      if (titleEl) titleEl.textContent = item.title;
      const descEl = document.getElementById('ttxvn-caption-desc');
      if (descEl) descEl.textContent = item.desc;
      const counterEl = document.getElementById('ttxvn-counter');
      if (counterEl) counterEl.textContent = `${index + 1} / ${ttxvnGalleryData.length}`;

      // Update thumbnails active state
      const strip = document.getElementById('ttxvn-thumbs-strip');
      if (strip) {
        const thumbs = strip.querySelectorAll('.ttxvn-thumb-item');
        thumbs.forEach((th, idx) => {
          th.classList.toggle('active', idx === index);
        });
      }

      // Sync with exhibitData for Chapter 4 Lightbox
      exhibitData[3].src = item.src;
      exhibitData[3].title = item.title;
      exhibitData[3].context = item.desc;
      exhibitData[3].source = item.source;
      exhibitData[3].code = item.code;
    }

    function navigateTtxvnGallery(direction, event) {
      if (event) event.stopPropagation();
      let nextIndex = (currentTtxvnIndex + direction + ttxvnGalleryData.length) % ttxvnGalleryData.length;
      selectTtxvnPhoto(nextIndex, event);
    }

    // Chapter 6: UN 1977 Dual Photos Data
    const unDualData = {
      1: {
        src: 'assets/images/hinh6_vietnam_un_1977-1.avif',
        title: 'Ngày 20/9/1977, Phiên khai mạc Kỳ họp thứ 32 Đại hội đồng Liên hợp quốc tại New York (Mỹ) thông qua Nghị quyết công nhận Việt Nam là thành viên của Liên hợp quốc. (Ảnh: Tư liệu TTXVN)',
        shortTitle: 'Kỳ họp thứ 32 Đại hội đồng Liên hợp quốc',
        metaDate: '20/9/1977',
        metaLoc: 'New York, Hoa Kỳ',
        metaSub: 'Nghị quyết Công nhận Thành viên',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'HS-1977-UN-01',
        tag: 'Tư liệu gốc 1977'
      },
      2: {
        src: 'assets/images/hinh6_vietnam_un_1977-2.avif',
        title: 'Lễ kéo cờ Việt Nam tại trụ sở Liên hợp quốc ngày 20/9/1977, đánh dấu sự kiện Việt Nam chính thức là thành viên của tổ chức lớn nhất hành tinh này. (Ảnh: Tư liệu TTXVN)',
        shortTitle: 'Lễ kéo cờ Việt Nam tại trụ sở Liên hợp quốc',
        metaDate: '20/9/1977',
        metaLoc: 'Trụ sở Liên hợp quốc, New York',
        metaSub: 'Thành viên thứ 149',
        source: 'Ảnh: Tư liệu TTXVN',
        code: 'HS-1977-UN-02',
        tag: 'Lễ Thượng Cờ Lịch Sử'
      }
    };
    let currentUnPhotoIndex = 1;

    function selectUnPhoto(idx) {
      if (!unDualData[idx]) return;
      currentUnPhotoIndex = idx;
      const data = unDualData[idx];

      // Update buttons
      const btn1 = document.getElementById('un-btn-1');
      const btn2 = document.getElementById('un-btn-2');
      if (btn1 && btn2) {
        btn1.classList.toggle('active', idx === 1);
        btn2.classList.toggle('active', idx === 2);
      }

      // Update frame image and captions
      const img = document.getElementById('un-main-img');
      if (img) {
        img.src = data.src;
        img.alt = data.title;
      }
      const titleEl = document.getElementById('un-caption-title');
      if (titleEl) titleEl.textContent = data.title;
      const metaEl = document.getElementById('un-caption-meta');
      if (metaEl) {
        metaEl.innerHTML = `<span>${data.metaDate}</span><div class="meta-divider"></div><span>${data.metaLoc}</span><div class="meta-divider"></div><span>${data.metaSub}</span>`;
      }
      const srcEl = document.getElementById('un-caption-source');
      if (srcEl) srcEl.textContent = data.source;
      const tagEl = document.getElementById('un-tag-badge');
      if (tagEl) tagEl.textContent = data.tag;

      // Update exhibitData for Chapter 6
      exhibitData[5].src = data.src;
      exhibitData[5].title = data.shortTitle;
      exhibitData[5].context = data.title;
      exhibitData[5].source = data.source;
      exhibitData[5].code = data.code;
    }

    const exhibitData = [
      {
        src: 'assets/images/hinh1_saigon_1975.jpg',
        code: 'HS-1975-0430',
        hint: 'Gợi ý: Tìm ảnh Xe tăng 390 hoặc 843 húc đổ cổng Dinh Độc Lập trưa ngày 30/4/1975 (Thông tấn xã Việt Nam / Bảo tàng Lịch sử).',
        title: 'Xe tăng quân Giải phóng tiến vào Dinh Độc Lập',
        context: 'Ngày 30 tháng 4 năm 1975, xe tăng quân Giải phóng húc đổ cổng Dinh Độc Lập, đánh dấu sự kiện lịch sử giải phóng hoàn toàn miền Nam Việt Nam, kết thúc cuộc kháng chiến chống Mỹ cứu nước kéo dài hơn 20 năm. Tuy nhiên, sau thời khắc này, đất nước vẫn tồn tại hai nhà nước, hai chính phủ, hai hệ thống pháp luật riêng biệt.',
        source: 'Ảnh tư liệu: Thông tấn xã Việt Nam / Bảo tàng Lịch sử Quốc gia',
      },
      {
        src: 'assets/images/le_duan.jpg',
        code: 'HS-1975-TW24-LD',
        hint: 'Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (tháng 9/1975), đồng chí Tổng Bí thư Lê Duẩn và đồng chí Trường Chinh chủ trì.',
        title: 'Đồng chí Lê Duẩn (Bí thư thứ nhất Ban Chấp hành Trung ương Đảng)',
        context: 'Chủ trì Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (tháng 9/1975), trực tiếp hoạch định và lãnh đạo quyết sách chiến lược: Thống nhất đất nước vừa là quy luật khách quan, vừa là nguyện vọng thiết tha nhất của toàn thể nhân dân hai miền.',
        source: 'Ảnh tư liệu lịch sử: Thông tấn xã Việt Nam / Viện Lịch sử Đảng',
      },
      {
        src: 'assets/images/hinh3_hiep_thuong_chinh_tri.jpg',
        code: 'HS-1975-HTCT',
        hint: 'Gợi ý: Tìm ảnh Hội nghị Hiệp thương chính trị thống nhất Tổ quốc tại Sài Gòn, tháng 11/1975 (Trường Chinh & Phạm Hùng bắt tay ký Thông cáo chung).',
        title: 'Hội nghị Hiệp thương chính trị thống nhất Tổ quốc',
        context: 'Tháng 11 năm 1975, tại Sài Gòn, hai phái đoàn đại biểu nhân dân miền Bắc (do Trường Chinh dẫn đầu) và miền Nam (do Phạm Hùng dẫn đầu) đã họp hội nghị hiệp thương, thống nhất hoàn toàn về chủ trương, nguyên tắc và biện pháp tổ chức Tổng tuyển cử.',
        source: 'Ảnh tư liệu: Thông tấn xã Việt Nam / Bảo tàng Lịch sử Quốc gia',
      },
      {
        src: 'assets/images/hinh4_ttxvn_01_hoi_dong_bau_cu_saigon.jpg',
        code: 'TTXVN-TTC-01',
        hint: 'Bộ ảnh tư liệu Thông tấn xã Việt Nam: 45 năm Ngày Tổng tuyển cử bầu Quốc hội của nước Việt Nam thống nhất (25/4/1976 - 25/4/2021).',
        title: 'Hội đồng bầu cử toàn quốc họp phiên thứ nhất tại Sài Gòn',
        context: 'Từ ngày 21 đến 22/2/1976, Hội đồng bầu cử toàn quốc họp phiên thứ nhất tại thành phố Sài Gòn - Gia Định để thảo luận và quy định những công việc về cuộc Tổng tuyển cử bầu Quốc hội chung của cả nước. (Ảnh: Tư liệu TTXVN)',
        source: 'Ảnh: Tư liệu TTXVN',
      },
      {
        src: 'assets/images/hinh5_quoc_hoi_khoa_6.jpg',
        code: 'HS-1976-QH6',
        hint: 'Kỳ họp thứ nhất Quốc hội khóa VI tại Hội trường Ba Đình, Hà Nội (tháng 6–7/1976) thông qua Quốc hiệu mới và đổi tên thành Thành phố Hồ Chí Minh.',
        title: 'Kỳ họp thứ nhất Quốc hội khóa VI — Quốc hội thống nhất',
        context: 'Tháng 6–7 năm 1976, tại Hội trường Ba Đình lịch sử, Hà Nội, 492 đại biểu đã thông qua các quyết sách quan trọng: đặt Quốc hiệu là CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM, chọn Quốc kỳ cờ đỏ sao vàng, Quốc ca Tiến quân ca, Thủ đô Hà Nội, đổi tên Thành phố Sài Gòn — Gia Định thành Thành phố Hồ Chí Minh.',
        source: 'Ảnh tư liệu: Thông tấn xã Việt Nam / Bảo tàng Lịch sử Quốc gia',
      },
      {
        src: 'assets/images/hinh6_vietnam_un_1977-1.avif',
        code: 'HS-1977-UN-01',
        hint: 'Kỳ họp thứ 32 Đại hội đồng Liên hợp quốc tại New York (20/9/1977).',
        title: 'Kỳ họp thứ 32 Đại hội đồng Liên hợp quốc',
        context: 'Ngày 20/9/1977, Phiên khai mạc Kỳ họp thứ 32 Đại hội đồng Liên hợp quốc tại New York (Mỹ) thông qua Nghị quyết công nhận Việt Nam là thành viên của Liên hợp quốc. (Ảnh: Tư liệu TTXVN)',
        source: 'Ảnh: Tư liệu TTXVN',
      },
    ];

    let currentLightboxIndex = 0;

    function onPhotoLoaded(img, bpId, frameEl) {
      img.classList.add('has-photo');
      const bp = document.getElementById(bpId);
      if (bp) bp.style.display = 'none';
      if (frameEl) {
        frameEl.classList.add('has-real-photo');
        const zoom = frameEl.querySelector('.zoom-overlay');
        if (zoom) zoom.style.display = 'flex';
      }
    }

    function onPhotoError(img, bpId, frameEl) {
      img.classList.remove('has-photo');
      img.style.display = 'none';
      const bp = document.getElementById(bpId);
      if (bp) bp.style.display = 'flex';
      if (frameEl) {
        frameEl.classList.remove('has-real-photo');
        const zoom = frameEl.querySelector('.zoom-overlay');
        if (zoom) zoom.style.display = 'none';
      }
    }

    // Auto-check and activate all existing archival images immediately
    function checkAllArchivalPhotos() {
      const photosToCheck = [
        { selector: '#frame-ch1 img', bpId: 'bp-ch1', frameId: 'frame-ch1', src: 'assets/images/hinh1_saigon_1975.jpg' },
        { selector: '#frame-ch3 img', bpId: 'bp-ch3', frameId: 'frame-ch3', src: 'assets/images/hinh3_hiep_thuong_chinh_tri.jpg' },
        { selector: '#frame-ch5 img', bpId: 'bp-ch5', frameId: 'frame-ch5', src: 'assets/images/hinh5_quoc_hoi_khoa_6.jpg' }
      ];

      photosToCheck.forEach(item => {
        const frame = document.getElementById(item.frameId);
        const img = frame ? frame.querySelector('img') : null;
        if (!img) return;

        // If browser already completed loading or cached
        if (img.complete && img.naturalWidth > 0) {
          onPhotoLoaded(img, item.bpId, frame);
        } else {
          // Preload test
          const tester = new Image();
          tester.onload = () => onPhotoLoaded(img, item.bpId, frame);
          tester.onerror = () => onPhotoError(img, item.bpId, frame);
          tester.src = item.src;
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAllArchivalPhotos);
    } else {
      checkAllArchivalPhotos();
    }

    function openLightbox(index) {
      currentLightboxIndex = index;
      renderLightboxContent();
      document.getElementById('lightbox-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }

    function renderLightboxContent() {
      const data = exhibitData[currentLightboxIndex];
      const img = document.getElementById('lightbox-img');
      const bp = document.getElementById('lightbox-blueprint');

      document.getElementById('lightbox-title').textContent = data.title;
      document.getElementById('lightbox-context').textContent = data.context;
      document.getElementById('lightbox-source').textContent = data.source;

      document.getElementById('lb-code').textContent = 'MÃ: ' + data.code;
      document.getElementById('lb-bp-title').textContent = data.title;
      document.getElementById('lb-bp-hint').textContent = data.hint;
      document.getElementById('lb-bp-file').textContent = 'Vị trí tệp: ' + data.src;

      // Test whether authentic image is available
      const testImg = new Image();
      testImg.onload = function() {
        img.src = data.src;
        img.alt = data.title;
        img.style.display = 'block';
        bp.style.display = 'none';
      };
      testImg.onerror = function() {
        img.style.display = 'none';
        bp.style.display = 'flex';
      };
      testImg.src = data.src;
    }

    function closeLightbox(event) {
      if (event) event.stopPropagation();
      document.getElementById('lightbox-overlay').classList.remove('open');
      if (!document.getElementById('reporter-modal').classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }

    function navigateLightbox(direction, event) {
      if (event) event.stopPropagation();
      currentLightboxIndex = (currentLightboxIndex + direction + exhibitData.length) % exhibitData.length;
      renderLightboxContent();
      if (window.lucide) lucide.createIcons();
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('lightbox-overlay').classList.contains('open')) return;
      if (e.key === 'ArrowLeft') navigateLightbox(-1, e);
      if (e.key === 'ArrowRight') navigateLightbox(1, e);
    });

    // ===== QUIZ LOGIC (STEP 6: BỘ 5 CÂU HỎI TÌNH HUỐNG & GIẤY CHỨNG NHẬN) =====
    const correctAnswers = { 1: 'b', 2: 'b', 3: 'a', 4: 'c', 5: 'a' };
    const userAnswers = {};
    const feedbackTexts = {
      1: {
        correct: '✅ Chính xác! Sau ngày 30/4/1975, dù non sông đã thống nhất về mặt lãnh thổ nhưng hai miền vẫn tồn tại hai nhà nước, hai chính phủ, hai hệ thống pháp luật và đồng tiền riêng biệt. Thống nhất về mặt Nhà nước là đòi hỏi tất yếu khách quan để hoàn tất trọn vẹn non sông.',
        incorrect: '❌ Chưa chính xác. Đáp án đúng: Vì tuy lãnh thổ đã giải phóng nhưng đất nước vẫn tồn tại hai nhà nước, hai chính phủ, hai hệ thống pháp luật và đồng tiền riêng biệt (Việt Nam Dân chủ Cộng hòa ở miền Bắc và Chính phủ Cách mạng Lâm thời ở miền Nam).'
      },
      2: {
        correct: '✅ Chính xác! Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (tháng 9/1975) đã khẳng định tính tất yếu của việc khẩn trương thống nhất Tổ quốc về mặt Nhà nước thông qua Tổng tuyển cử dân chủ.',
        incorrect: '❌ Chưa chính xác. Đáp án đúng: Hội nghị lần thứ 24 của Ban Chấp hành Trung ương Đảng Lao động Việt Nam (tháng 9 năm 1975).'
      },
      3: {
        correct: '✅ Chính xác! Ngày 25/4/1976 thực sự là ngày hội non sông khi hơn 23 triệu cử tri (98,77%) đi bỏ phiếu, bầu ra 492 đại biểu đại diện cho khối đại đoàn kết toàn dân tộc.',
        incorrect: '❌ Chưa chính xác. Đáp án đúng: Có hơn 23 triệu cử tri (đạt 98,77%) trên toàn quốc đi bỏ phiếu, bầu ra 492 đại biểu ưu tú đại diện cho khối đại đoàn kết toàn dân tộc từ miền Bắc đến miền Nam.'
      },
      4: {
        correct: '✅ Chính xác! Ngày 2/7/1976, Quốc hội khóa VI đã thông qua nghị quyết lịch sử đặt tên nước là CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM, khẳng định thể chế thống nhất vững bền của toàn thể dân tộc.',
        incorrect: '❌ Chưa chính xác. Đáp án đúng: CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM.'
      },
      5: {
        correct: '✅ Chính xác! Sự kiện ngày 20/9/1977 tại Trụ sở Liên Hợp Quốc ở New York đã chính thức công nhận nước Việt Nam thống nhất là thành viên thứ 149 của tổ chức quốc tế lớn nhất thế giới, xác lập tư cách pháp lý độc lập và bình đẳng toàn cầu.',
        incorrect: '❌ Chưa chính xác. Đáp án đúng: Việt Nam chính thức trở thành thành viên thứ 149 của Liên Hợp Quốc, xác lập tư cách pháp lý độc lập, thống nhất hoàn toàn trên trường quốc tế.'
      }
    };

    let userCertificateName = 'Độc giả Tri thức Lịch sử';

    function selectQuizOption(el) {
      const q = el.getAttribute('data-question');
      const v = el.getAttribute('data-value');
      userAnswers[q] = v;

      // Clear previous selections for this question
      const siblings = el.parentElement.querySelectorAll('.quiz-option');
      siblings.forEach(s => s.classList.remove('selected'));
      el.classList.add('selected');
    }

    function updateCertificateRecipient(name) {
      userCertificateName = name && name.trim() ? name.trim() : 'Độc giả Tri thức Lịch sử';
      const displayEl = document.getElementById('cert-display-recipient');
      if (displayEl) displayEl.textContent = userCertificateName;
    }

    function resetQuiz() {
      // Clear selections
      for (let i = 1; i <= 5; i++) {
        delete userAnswers[i];
        const feedbackEl = document.getElementById(`q${i}-feedback`);
        if (feedbackEl) {
          feedbackEl.innerHTML = '';
          feedbackEl.classList.add('hidden');
        }
        const options = document.querySelectorAll(`[data-question="${i}"]`);
        options.forEach(opt => {
          opt.classList.remove('selected', 'correct', 'incorrect');
          opt.style.pointerEvents = 'auto';
        });
      }
      const resultEl = document.getElementById('quiz-result');
      if (resultEl) {
        resultEl.innerHTML = '';
        resultEl.classList.add('hidden');
      }
      const submitBtn = document.getElementById('quiz-submit');
      if (submitBtn) submitBtn.classList.remove('hidden');

      const quizSection = document.getElementById('chapter-7');
      if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function submitQuiz() {
      const totalQuestions = 5;
      let score = 0;
      let allAnswered = true;

      for (let i = 1; i <= totalQuestions; i++) {
        const feedbackEl = document.getElementById(`q${i}-feedback`);
        if (!userAnswers[i]) {
          allAnswered = false;
          if (feedbackEl) {
            feedbackEl.innerHTML = '<span class="text-amber font-semibold">⚠️ Vui lòng chọn một đáp án cho câu hỏi này.</span>';
            feedbackEl.classList.remove('hidden');
          }
        }
      }

      if (!allAnswered) {
        // Find first unanswered question
        for (let i = 1; i <= totalQuestions; i++) {
          if (!userAnswers[i]) {
            const card = document.getElementById(`q${i}-card`);
            if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
          }
        }
        return;
      }

      for (let i = 1; i <= totalQuestions; i++) {
        const feedbackEl = document.getElementById(`q${i}-feedback`);
        const options = document.querySelectorAll(`[data-question="${i}"]`);
        const isCorrect = userAnswers[i] === correctAnswers[i];
        if (isCorrect) score++;

        options.forEach(opt => {
          opt.classList.remove('selected');
          opt.style.pointerEvents = 'none';
          if (opt.getAttribute('data-value') === correctAnswers[i]) {
            opt.classList.add('correct');
          } else if (opt.getAttribute('data-value') === userAnswers[i] && !isCorrect) {
            opt.classList.add('incorrect');
          }
        });

        feedbackEl.innerHTML = `<span class="text-parchment/85 leading-relaxed font-sans">${isCorrect ? feedbackTexts[i].correct : feedbackTexts[i].incorrect}</span>`;
        feedbackEl.classList.remove('hidden');
      }

      const resultEl = document.getElementById('quiz-result');
      const submitBtn = document.getElementById('quiz-submit');
      if (submitBtn) submitBtn.classList.add('hidden');

      const todayStr = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'full' }).format(new Date());

      let resultHtml = '';
      if (score >= 3) {
        resultHtml = `
          <div class="space-y-6">
            <!-- Score Card Banner -->
            <div class="glass-card text-center p-6 border border-amber/30">
              <div class="text-4xl mb-2">🏆</div>
              <h4 class="font-serif text-2xl font-bold text-amber mb-1">
                ${score === 5 ? 'Xuất Sắc Tuyệt Đối!' : 'Chúc Mừng Bạn Đã Đạt Chuẩn!'}
              </h4>
              <p class="text-parchment/80 font-mono text-base font-bold">
                Điểm số: ${score} / ${totalQuestions} câu hỏi chính xác (${Math.round((score/totalQuestions)*100)}%)
              </p>
              <p class="text-xs text-parchment/60 mt-1 max-w-md mx-auto">
                Bạn đã nắm vững lý luận và tiến trình lịch sử thống nhất đất nước về mặt Nhà nước (1975–1976).
              </p>

              <!-- Name Input for Certificate Customization -->
              <div class="mt-5 max-w-md mx-auto p-4 rounded-xl bg-black/40 border border-amber/20 text-left">
                <label for="cert-name-input" class="block text-xs font-semibold text-amber mb-1.5 font-sans">
                  Nhập họ và tên để in lên Giấy Chứng Nhận:
                </label>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    id="cert-name-input"
                    value="${userCertificateName}"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    oninput="updateCertificateRecipient(this.value)"
                    class="flex-1 bg-black/60 border border-amber/40 rounded-lg px-3.5 py-2 text-sm text-parchment focus:outline-none focus:border-amber transition-colors font-serif"
                  />
                </div>
              </div>
            </div>

            <!-- Honorary Knowledge Certificate Card -->
            <div class="certificate-card" id="museum-certificate-card">
              <!-- Corner Ornaments -->
              <div class="cert-corner-ornament cert-corner-tl"></div>
              <div class="cert-corner-ornament cert-corner-tr"></div>
              <div class="cert-corner-ornament cert-corner-bl"></div>
              <div class="cert-corner-ornament cert-corner-br"></div>

              <!-- Header -->
              <div class="text-center pb-4 border-b border-[#B45309]/30">
                <p class="text-xs font-bold text-[#8B0000] tracking-widest uppercase">
                  BẢO TÀNG LỊCH SỬ QUỐC GIA VIỆT NAM
                </p>
                <h3 class="font-serif text-lg md:text-xl font-black text-[#8B0000] mt-1 tracking-wider uppercase">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </h3>
                <p class="text-xs italic text-[#4B5563] mt-0.5 font-serif">Độc lập – Tự do – Hạnh phúc</p>
                <div class="w-16 h-0.5 bg-[#8B0000] mx-auto mt-2"></div>
              </div>

              <!-- Title -->
              <div class="text-center py-5">
                <p class="text-xs text-[#B45309] font-bold tracking-widest uppercase mb-1">
                  BAN BIÊN TẬP VÀ GIÁM TUYỂN BẢO TÀNG TRÂN TRỌNG CHỨNG NHẬN
                </p>
                <h2 class="font-serif text-2xl md:text-3xl font-black text-[#8B0000] tracking-wide">
                  GIẤY CHỨNG NHẬN TRI THỨC LỊCH SỬ DANH DỰ
                </h2>
                <div class="mt-4">
                  <span class="text-xs text-[#6B7280] font-sans">Trao tặng cho:</span>
                  <div class="font-serif text-2xl md:text-3xl font-bold text-[#1F2937] tracking-wider mt-1 border-b-2 border-dotted border-[#B45309]/50 inline-block px-6 pb-1" id="cert-display-recipient">
                    ${userCertificateName}
                  </div>
                </div>
              </div>

              <!-- Body Description -->
              <div class="max-w-xl mx-auto text-center font-sans text-xs md:text-sm text-[#374151] leading-relaxed mb-6">
                Đã hoàn thành xuất sắc Khóa chuyên đề khảo nghiệm tương tác số:<br>
                <strong class="text-[#8B0000] font-serif text-base">"Hành trình Thống nhất Đất nước về mặt Nhà nước (1975–1976)"</strong><br>
                <span class="text-xs text-[#6B7280] mt-1 block">
                  Đạt kết quả xuất sắc: <strong>${score}/5 câu hỏi tình huống chuyên sâu</strong>, thể hiện sự am hiểu sâu sắc về ý chí, bản lĩnh và thắng lợi vĩ đại của toàn thể dân tộc Việt Nam.
                </span>
              </div>

              <!-- Footer with Sign-off and Red Stamp -->
              <div class="pt-4 border-t border-[#B45309]/30 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <div class="text-center sm:text-left text-xs text-[#4B5563]">
                  <span>Thời gian chứng nhận: </span><br>
                  <strong class="text-[#1F2937]">${todayStr}</strong><br>
                  <span class="text-[10px] text-[#9CA3AF] font-mono">Mã số hồ sơ: VN1976-HIST-${Date.now().toString().slice(-6)}</span>
                </div>
                <div class="flex items-center gap-3">
                  <!-- Museum Seal SVG -->
                  <div class="cert-seal-wax">
                    <svg viewBox="0 0 160 160" width="100%" height="100%" style="color:#DC2626;">
                      <circle cx="80" cy="80" r="74" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="6 3"/>
                      <circle cx="80" cy="80" r="66" stroke="currentColor" stroke-width="1.8" fill="none"/>
                      <polygon points="80,38 84,48 95,48 86,55 90,66 80,59 70,66 74,55 65,48 76,48" fill="currentColor"/>
                      <text x="80" y="80" font-family="'Cinzel', serif" font-weight="900" font-size="11.5" text-anchor="middle" fill="currentColor">BẢO TÀNG LỊCH SỬ</text>
                      <text x="80" y="96" font-size="9" font-weight="bold" text-anchor="middle" fill="currentColor">CHỨNG NHẬN</text>
                      <text x="80" y="110" font-size="7.5" font-weight="bold" text-anchor="middle" fill="currentColor">1975 — 1976</text>
                    </svg>
                  </div>
                  <div class="text-center text-xs font-serif font-bold text-[#8B0000]">
                    HỘI ĐỒNG GIÁM TUYỂN<br>
                    <span class="text-[10px] font-normal text-[#6B7280] font-sans">Đã thẩm định và đóng dấu</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button onclick="printCertificate()" class="px-6 py-3 bg-gradient-to-r from-amber to-amber-light text-slate-900 font-bold text-xs md:text-sm rounded-full shadow-lg hover:brightness-110 flex items-center gap-2 transition-all">
                <i data-lucide="printer" class="w-4 h-4"></i> In / Xuất Giấy Chứng Nhận (PDF)
              </button>
              <button onclick="resetQuiz()" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-parchment font-semibold text-xs md:text-sm rounded-full border border-white/20 flex items-center gap-2 transition-all">
                <i data-lucide="rotate-ccw" class="w-4 h-4 text-amber"></i> Làm Lại Bài Khảo Sát
              </button>
            </div>
          </div>
        `;
      } else {
        resultHtml = `
          <div class="glass-card text-center p-8 space-y-4 max-w-xl mx-auto border border-amber/30">
            <div class="text-4xl">📖</div>
            <h4 class="font-serif text-xl font-bold text-parchment">Kết Quả Khảo Sát: ${score} / ${totalQuestions} câu đúng</h4>
            <p class="text-sm text-parchment/70 leading-relaxed font-sans">
              Bạn cần đạt tối thiểu <strong>3/5 câu trả lời chính xác</strong> để nhận Giấy Chứng Nhận Tri Thức Lịch Sử Bảo Tàng.
              Hãy xem lại phần giải thích chi tiết phía trên hoặc cuộn lại các chương để củng cố tri thức nhé!
            </p>
            <div class="pt-2 flex items-center justify-center gap-4">
              <button onclick="resetQuiz()" class="px-8 py-3 bg-gradient-to-r from-lacquer to-amber-700 text-parchment font-bold text-sm rounded-full hover:shadow-lg flex items-center gap-2 transition-all">
                <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Làm Lại Ngay
              </button>
              <button onclick="scrollToChapter(1)" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-parchment font-semibold text-sm rounded-full border border-white/20 flex items-center gap-2 transition-all">
                <i data-lucide="arrow-up" class="w-4 h-4 text-amber"></i> Xem Lại Các Màn
              </button>
            </div>
          </div>
        `;
      }

      resultEl.innerHTML = resultHtml;
      resultEl.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();

      // Smooth scroll to results
      setTimeout(() => {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }

    function printCertificate() {
      const printContainer = document.getElementById('print-certificate-container');
      if (!printContainer) return;

      const todayStr = new Intl.DateTimeFormat('vi-VN', { dateStyle: 'full' }).format(new Date());

      printContainer.innerHTML = `
        <div style="font-family: 'Times New Roman', serif; max-width: 860px; margin: 0 auto; padding: 40px; color: #111; border: 8px double #B45309; background: #FFFDF9; position: relative;">
          <div style="text-align: center; border-bottom: 2px solid #8B0000; padding-bottom: 12px; margin-bottom: 24px;">
            <p style="font-size: 13px; font-weight: bold; margin: 0; text-transform: uppercase;">BẢO TÀNG LỊCH SỬ QUỐC GIA VIỆT NAM</p>
            <h1 style="font-size: 21px; font-weight: bold; margin: 6px 0; color: #8B0000; text-transform: uppercase;">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </h1>
            <p style="font-size: 14px; font-style: italic; margin: 0;">Độc lập – Tự do – Hạnh phúc</p>
            <div style="width: 80px; height: 2px; background: #8B0000; margin: 8px auto 0 auto;"></div>
          </div>

          <div style="text-align: center; margin: 28px 0;">
            <p style="font-size: 12px; font-weight: bold; color: #B45309; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
              BAN BIÊN TẬP VÀ GIÁM TUYỂN BẢO TÀNG TRÂN TRỌNG CHỨNG NHẬN
            </p>
            <h2 style="font-size: 26px; font-weight: bold; color: #8B0000; margin: 12px 0 20px 0;">
              GIẤY CHỨNG NHẬN TRI THỨC LỊCH SỬ DANH DỰ
            </h2>
            <p style="font-size: 14px; margin-bottom: 6px;">Trân trọng trao tặng cho:</p>
            <div style="font-size: 28px; font-weight: bold; color: #111; border-bottom: 2px dotted #B45309; display: inline-block; padding: 4px 30px; margin-bottom: 20px;">
              ${userCertificateName}
            </div>
            <p style="font-size: 15px; line-height: 1.8; max-width: 680px; margin: 0 auto; color: #333;">
              Đã hoàn thành xuất sắc Khóa chuyên đề khảo nghiệm tương tác số:<br>
              <strong style="color: #8B0000; font-size: 17px;">"Hành trình Thống nhất Đất nước về mặt Nhà nước (1975–1976)"</strong><br>
              Thể hiện sự am hiểu sâu sắc về ý chí độc lập, tự chủ và quá trình hoàn thành thống nhất Tổ quốc về mặt Nhà nước của nhân dân Việt Nam.
            </p>
          </div>

          <div style="margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #ccc; padding-top: 20px;">
            <div style="font-size: 13px;">
              <span>Thời gian xác nhận: ${todayStr}</span><br>
              <span style="font-size: 11px; color: #666;">Hồ sơ lưu trữ điện tử: VN1976-HIST-${Date.now().toString().slice(-6)}</span>
            </div>
            <div style="text-align: center;">
              <p style="font-size: 13px; font-weight: bold; color: #8B0000; margin: 0 0 50px 0;">
                HỘI ĐỒNG GIÁM TUYỂN VÀ BIÊN TẬP<br>
                <span style="font-size: 11px; font-weight: normal; color: #666;">(Ký tên, đóng dấu xác thực)</span>
              </p>
            </div>
          </div>
        </div>
      `;
      window.print();
    }

    // ===== HISTORICAL GEO-MAP & ATLAS LOGIC =====
    const geoMilestones = [
      {
        chapter: 0,
        name: 'Toàn cảnh Non sông Việt Nam',
        sub: 'Dải đất hình chữ S liền một dải',
        time: 'Tháng 4/1975 — 1976',
        event: 'Khởi đầu hành trình thống nhất đất nước về mặt Nhà nước',
        coords: '14.0583° N, 108.2772° E',
        pinId: null,
        desc: 'Sau đại thắng mùa Xuân 1975, lãnh thổ Việt Nam đã hoàn toàn giải phóng. Tuy nhiên, nhiệm vụ cấp bách lịch sử đặt ra là phải hoàn thành thống nhất về mặt Nhà nước để non sông thực sự quy về một mối.',
      },
      {
        chapter: 1,
        name: 'Sài Gòn & Vĩ tuyến 17',
        sub: 'Thực trạng hai miền sau 30/4/1975',
        time: '30/4/1975 — 9/1975',
        event: 'Tồn tại 2 chính quyền, 2 hệ thống pháp luật riêng biệt',
        coords: '10.8231° N, 106.6297° E (Sài Gòn)',
        pinId: 'hud-pin-saigon',
        highlightLine17: true,
        desc: 'Trưa 30/4/1975, Sài Gòn hoàn toàn giải phóng. Dù chiến tranh chấm dứt nhưng vĩ tuyến 17 trên thực tế vẫn phân chia hai hệ thống chính quyền, hai khung pháp luật và hai loại tiền tệ khác nhau.',
      },
      {
        chapter: 2,
        name: 'Hội nghị Trung ương lần thứ 24',
        sub: 'Ban Chấp hành Trung ương Đảng (khóa III)',
        time: 'Tháng 9/1975 (Nghị quyết 29/9/1975)',
        event: 'Đề ra quyết sách chiến lược thống nhất Nhà nước',
        coords: 'Nghị quyết số 247-NQ/TW',
        pinId: null,
        desc: 'Ban Chấp hành Trung ương Đảng họp Hội nghị lần thứ 24, ban hành Nghị quyết khẳng định: "Thống nhất đất nước vừa là quy luật khách quan của sự phát triển cách mạng Việt Nam, vừa là nguyện vọng thiết tha nhất của toàn thể nhân dân hai miền".',
      },
      {
        chapter: 3,
        name: 'Sài Gòn — Hội trường Thống Nhất',
        sub: 'Hội nghị Hiệp thương Chính trị',
        time: '15/11 — 21/11/1975',
        event: 'Hiệp thương Bắc — Nam, quyết định Tổng tuyển cử',
        coords: '10.7770° N, 106.6953° E (Sài Gòn)',
        pinId: 'hud-pin-saigon',
        desc: 'Hai phái đoàn đại biểu Bắc — Nam (do Trường Chinh & Phạm Hùng dẫn đầu) đã gặp gỡ và ký kết Thông cáo chung, mở đường cho cuộc Tổng tuyển cử bầu Quốc hội chung.',
      },
      {
        chapter: 4,
        name: 'Toàn quốc Việt Nam',
        sub: 'Ngày hội Non sông — Tổng tuyển cử',
        time: '25 tháng 4 năm 1976',
        event: '23 triệu cử tri (98,77%) bỏ phiếu bầu Quốc hội thống nhất',
        coords: 'Toàn vẹn lãnh thổ Việt Nam',
        pinId: 'all',
        highlightAll: true,
        desc: 'Ngày 25/4/1976, lần đầu tiên sau 30 năm, cử tri khắp hai miền Bắc — Nam cùng cầm lá phiếu bầu ra 492 đại biểu Quốc hội chung đại diện cho ý chí toàn dân tộc.',
      },
      {
        chapter: 5,
        name: 'Hà Nội — Hội trường Ba Đình',
        sub: 'Kỳ họp thứ nhất Quốc hội khóa VI',
        time: '24/6 — 3/7/1976',
        event: 'Thông qua Quốc hiệu CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
        coords: '21.0369° N, 105.8347° E (Hà Nội)',
        pinId: 'hud-pin-hanoi',
        desc: '492 đại biểu họp tại Hội trường Ba Đình, thông qua quyết sách lịch sử đặt tên nước là CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM, chọn Quốc kỳ, Quốc ca, Quốc huy, Thủ đô Hà Nội và đổi tên Thành phố Sài Gòn — Gia Định thành Thành phố Hồ Chí Minh.',
      },
      {
        chapter: 6,
        name: 'New York & Thủ đô Hà Nội',
        sub: 'Việt Nam gia nhập Liên Hợp Quốc',
        time: '20 tháng 9 năm 1977',
        event: 'Việt Nam trở thành thành viên thứ 149 của Liên Hợp Quốc',
        coords: 'Trụ sở Liên Hợp Quốc (New York) — Ba Đình (Hà Nội)',
        pinId: 'hud-pin-hanoi',
        desc: 'Lễ thượng cờ đỏ sao vàng tại trụ sở Liên Hợp Quốc khẳng định chủ quyền, độc lập và tư cách pháp lý thống nhất của Việt Nam trên trường quốc tế.',
      },
      {
        chapter: 7,
        name: 'Tổng kết & Di sản Lịch sử',
        sub: 'Bài học Thống nhất Non sông',
        time: '1976 — Nay',
        event: 'Khắc sâu bài học về sức mạnh khối đại đoàn kết',
        coords: 'Tâm thức lịch sử dân tộc',
        pinId: null,
        desc: 'Thắng lợi thống nhất đất nước về mặt Nhà nước là mốc son chói lọi, tạo nền tảng vững chắc để xây dựng và bảo vệ Tổ quốc Việt Nam xã hội chủ nghĩa.',
      },
    ];

    let currentAtlasSelected = 5;

    function updateGeoMapHUD(chapterIndex) {
      const data = geoMilestones[chapterIndex] || geoMilestones[0];
      const locText = document.getElementById('hud-text-loc');
      const eventText = document.getElementById('hud-text-event');
      const timeText = document.getElementById('hud-text-time');
      const pillText = document.getElementById('hud-pill-text');

      if (locText) locText.textContent = data.name;
      if (eventText) eventText.textContent = data.event;
      if (timeText) timeText.textContent = data.time;
      if (pillText) pillText.textContent = 'Bản đồ: ' + data.name;

      // Update pins active state
      document.querySelectorAll('#vietnam-hud-svg .map-pin-group').forEach(pin => {
        pin.classList.remove('active');
      });
      const coastline = document.getElementById('map-hud-coastline');
      if (coastline) {
        coastline.classList.toggle('highlight-all', !!data.highlightAll);
      }
      const line17 = document.getElementById('map-hud-line17');
      if (line17) {
        line17.style.opacity = data.highlightLine17 ? '1' : '0.35';
      }

      if (data.pinId && data.pinId !== 'all') {
        const pinEl = document.getElementById(data.pinId);
        if (pinEl) pinEl.classList.add('active');
      }
    }

    function toggleGeoHUD() {
      const hud = document.getElementById('geo-map-hud');
      if (!hud) return;
      hud.classList.toggle('minimized');
      const icon = document.getElementById('hud-toggle-icon');
      if (icon) {
        if (hud.classList.contains('minimized')) {
          icon.setAttribute('data-lucide', 'plus');
        } else {
          icon.setAttribute('data-lucide', 'minus');
        }
        if (window.lucide) lucide.createIcons();
      }
    }

    function openAtlasModal(targetChapter) {
      const modal = document.getElementById('atlas-modal');
      if (!modal) return;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Render milestone cards
      renderAtlasMilestonesList();

      const selectIdx = (typeof targetChapter === 'number') ? targetChapter : 5;
      selectAtlasMilestone(selectIdx);

      if (window.lucide) lucide.createIcons();
    }

    function closeAtlasModal(event) {
      if (event) event.stopPropagation();
      const modal = document.getElementById('atlas-modal');
      if (modal) modal.classList.remove('open');
      if (!document.getElementById('lightbox-overlay').classList.contains('open') &&
          !document.getElementById('reporter-modal').classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }

    function renderAtlasMilestonesList() {
      const container = document.getElementById('atlas-milestones-list');
      if (!container) return;
      container.innerHTML = '';

      geoMilestones.slice(1, 7).forEach((m) => {
        const card = document.createElement('div');
        card.className = `atlas-item-card flex items-center justify-between ${m.chapter === currentAtlasSelected ? 'active' : ''}`;
        card.id = `atlas-card-${m.chapter}`;
        card.onclick = () => selectAtlasMilestone(m.chapter);
        card.innerHTML = `
          <div>
            <div class="text-xs font-bold text-parchment flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-amber/20 text-amber text-[10px] flex items-center justify-center font-mono">${m.chapter}</span>
              <span>${m.name}</span>
            </div>
            <div class="text-[10px] text-parchment/60 mt-0.5">${m.event}</div>
          </div>
          <div class="text-[10px] font-mono text-amber/80 flex-shrink-0 ml-2">${m.time}</div>
        `;
        container.appendChild(card);
      });
    }

    function selectAtlasMilestone(chapterIdx) {
      currentAtlasSelected = chapterIdx;
      const data = geoMilestones[chapterIdx] || geoMilestones[5];

      // Update card list active
      document.querySelectorAll('.atlas-item-card').forEach(c => c.classList.remove('active'));
      const activeCard = document.getElementById(`atlas-card-${chapterIdx}`);
      if (activeCard) activeCard.classList.add('active');

      // Update detail card
      const titleEl = document.getElementById('atlas-detail-title');
      const timeEl = document.getElementById('atlas-detail-time');
      const descEl = document.getElementById('atlas-detail-desc');
      if (titleEl) titleEl.textContent = `Màn ${data.chapter}: ${data.name}`;
      if (timeEl) timeEl.textContent = data.time;
      if (descEl) descEl.textContent = data.desc;

      // Update Atlas SVG Pins
      document.querySelectorAll('#vietnam-atlas-svg .map-pin-group').forEach(pin => pin.classList.remove('active'));
      const coastline = document.getElementById('atlas-coastline');
      if (coastline) coastline.classList.toggle('highlight-all', !!data.highlightAll);

      if (chapterIdx === 5 || chapterIdx === 6) {
        const pin = document.getElementById('atlas-pin-hanoi');
        if (pin) pin.classList.add('active');
      } else if (chapterIdx === 1 || chapterIdx === 3) {
        const pin = document.getElementById('atlas-pin-saigon');
        if (pin) pin.classList.add('active');
      }
    }

    function jumpFromAtlas() {
      closeAtlasModal();
      scrollToChapter(currentAtlasSelected);
    }

    // ===== PARLIAMENT HEMICYCLE CHART (STEP 3: 492 ĐẠI BIỂU QUỐC HỘI KHÓA VI) =====
    let hemiDelegates = [];
    let currentHemiFilter = 'all';

    function initHemicycle() {
      const svgGroup = document.getElementById('hemi-seats-group');
      if (!svgGroup) return;

      const hemiRows = [
        { r: 46, count: 52 },
        { r: 66, count: 68 },
        { r: 86, count: 80 },
        { r: 106, count: 92 },
        { r: 126, count: 102 },
        { r: 146, count: 98 }
      ];

      // Generate geometric seat coordinates (492 seats)
      let rawSeats = [];
      hemiRows.forEach((row, rowIdx) => {
        for (let i = 0; i < row.count; i++) {
          const theta = (i / (row.count - 1)) * Math.PI;
          const x = 180 - row.r * Math.cos(theta);
          const y = 175 - row.r * Math.sin(theta);
          rawSeats.push({
            rowIdx,
            x: parseFloat(x.toFixed(1)),
            y: parseFloat(y.toFixed(1)),
            r: 2.7
          });
        }
      });

      // Sort seats left-to-right (x ascending)
      rawSeats.sort((a, b) => a.x - b.x);

      // Pre-defined category quotas
      // North: 249 seats (0 - 248), South: 243 seats (249 - 491)
      const northClasses = [
        ...Array(71).fill('can-bo'),
        ...Array(42).fill('cong-nhan'),
        ...Array(52).fill('nong-dan'),
        ...Array(49).fill('tri-thuc'),
        ...Array(27).fill('llvt'),
        ...Array(8).fill('ton-giao')
      ]; // Total 249

      const southClasses = [
        ...Array(70).fill('can-bo'),
        ...Array(38).fill('cong-nhan'),
        ...Array(48).fill('nong-dan'),
        ...Array(49).fill('tri-thuc'),
        ...Array(27).fill('llvt'),
        ...Array(11).fill('ton-giao')
      ]; // Total 243

      // Deterministic shuffle for pleasing visual distribution
      const shuffleDeterministic = (arr, seed) => {
        let res = [...arr];
        for (let i = res.length - 1; i > 0; i--) {
          const j = Math.floor(Math.abs(Math.sin(seed + i)) * (i + 1));
          [res[i], res[j]] = [res[j], res[i]];
        }
        return res;
      };

      const shuffledNorth = shuffleDeterministic(northClasses, 42);
      const shuffledSouth = shuffleDeterministic(southClasses, 99);
      const allClassKeys = [...shuffledNorth, ...shuffledSouth];

      // Assign female flags: exactly 68 North + 64 South = 132 (26.83%)
      const femaleNorthIdx = new Set(shuffleDeterministic([...Array(249).keys()], 13).slice(0, 68));
      const femaleSouthIdx = new Set(shuffleDeterministic([...Array(243).keys()], 37).slice(0, 64));

      // Assign ethnic flags: exactly 43 North + 37 South = 80 (16.26%)
      const ethnicNorthIdx = new Set(shuffleDeterministic([...Array(249).keys()], 55).slice(0, 43));
      const ethnicSouthIdx = new Set(shuffleDeterministic([...Array(243).keys()], 77).slice(0, 37));

      const classMeta = {
        'can-bo': { label: 'Cán bộ chính trị & Đoàn thể', color: '#FB923C' },
        'cong-nhan': { label: 'Công nhân', color: '#38BDF8' },
        'nong-dan': { label: 'Nông dân', color: '#34D399' },
        'tri-thuc': { label: 'Trí thức & Văn nghệ sĩ', color: '#FBBF24' },
        'llvt': { label: 'Lực lượng vũ trang', color: '#F87171' },
        'ton-giao': { label: 'Nhân sĩ Tôn giáo', color: '#C084FC' }
      };

      hemiDelegates = rawSeats.map((seat, idx) => {
        const isNorth = idx < 249;
        const localIdx = isNorth ? idx : idx - 249;
        const classKey = allClassKeys[idx];
        const isFemale = isNorth ? femaleNorthIdx.has(localIdx) : femaleSouthIdx.has(localIdx);
        const isEthnic = isNorth ? ethnicNorthIdx.has(localIdx) : ethnicSouthIdx.has(localIdx);

        return {
          id: idx + 1,
          x: seat.x,
          y: seat.y,
          r: seat.r,
          region: isNorth ? 'Miền Bắc' : 'Miền Nam',
          classKey: classKey,
          className: classMeta[classKey].label,
          baseColor: classMeta[classKey].color,
          isFemale,
          isEthnic
        };
      });

      // Clear & inject circles into SVG
      svgGroup.innerHTML = '';

      hemiDelegates.forEach(d => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', d.x);
        circle.setAttribute('cy', d.y);
        circle.setAttribute('r', d.r);
        circle.setAttribute('fill', d.baseColor);
        circle.setAttribute('class', 'hemi-seat');
        circle.setAttribute('id', `hemi-seat-${d.id}`);

        circle.addEventListener('mouseenter', () => showHemiTooltip(d));
        circle.addEventListener('mouseleave', () => hideHemiTooltip());
        circle.addEventListener('click', () => showHemiTooltip(d));

        svgGroup.appendChild(circle);
      });

      filterHemicycle('all');
    }

    function showHemiTooltip(d) {
      const tooltip = document.getElementById('hemi-tooltip');
      if (!tooltip) return;

      const tags = [];
      tags.push(d.region);
      if (d.isFemale) tags.push('Nữ');
      if (d.isEthnic) tags.push('Dân tộc thiểu số');

      tooltip.innerHTML = `
        <div class="font-bold text-amber">Đại biểu #${d.id} — ${d.className}</div>
        <div class="text-[10px] text-parchment/80 mt-0.5">${tags.join(' • ')}</div>
      `;
      tooltip.style.left = (d.x / 360 * 100) + '%';
      tooltip.style.top = (d.y / 195 * 100) + '%';
      tooltip.style.opacity = '1';
    }

    function hideHemiTooltip() {
      const tooltip = document.getElementById('hemi-tooltip');
      if (tooltip) tooltip.style.opacity = '0';
    }

    function filterHemicycle(filterKey) {
      currentHemiFilter = filterKey;

      // Update button active states
      document.querySelectorAll('#hemi-filter-bar .hemi-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filterKey);
      });

      const legendEl = document.getElementById('hemi-legend');
      const insightEl = document.getElementById('hemi-insight');

      hemiDelegates.forEach(d => {
        const el = document.getElementById(`hemi-seat-${d.id}`);
        if (!el) return;

        if (filterKey === 'all') {
          el.classList.remove('dimmed');
          el.setAttribute('fill', d.baseColor);
        } else if (filterKey === 'gender') {
          if (d.isFemale) {
            el.classList.remove('dimmed');
            el.setAttribute('fill', '#F472B6'); // Vibrant pink-rose for women
          } else {
            el.classList.add('dimmed');
          }
        } else if (filterKey === 'ethnic') {
          if (d.isEthnic) {
            el.classList.remove('dimmed');
            el.setAttribute('fill', '#34D399'); // Radiant emerald for ethnic minorities
          } else {
            el.classList.add('dimmed');
          }
        } else if (filterKey === 'region') {
          el.classList.remove('dimmed');
          if (d.region === 'Miền Bắc') {
            el.setAttribute('fill', '#38BDF8'); // Sky blue for North
          } else {
            el.setAttribute('fill', '#FB923C'); // Warm orange for South
          }
        }
      });

      // Update dynamic legend and historical insight
      if (legendEl && insightEl) {
        if (filterKey === 'all') {
          legendEl.innerHTML = `
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#38BDF8"></span>Công nhân: 80</div>
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#34D399"></span>Nông dân: 100</div>
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#FBBF24"></span>Trí thức, Nhân sĩ: 98</div>
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#F87171"></span>Lực lượng Vũ trang: 54</div>
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#FB923C"></span>Cán bộ chính trị & Đoàn thể: 141</div>
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#C084FC"></span>Nhân sĩ Tôn giáo: 19</div>
          `;
          insightEl.innerHTML = `
            <strong>Khối Đại Đoàn Kết Toàn Dân:</strong> 492 đại biểu đại diện đầy đủ mọi giai tầng xã hội, kết tinh trọn vẹn nguyện vọng thống nhất giang sơn sau 30 năm chiến tranh chia cắt.
          `;
        } else if (filterKey === 'gender') {
          legendEl.innerHTML = `
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#F472B6"></span>Nữ đại biểu: 132 (26.83%)</div>
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#4B5563"></span>Nam đại biểu: 360 (73.17%)</div>
          `;
          insightEl.innerHTML = `
            <strong>Tỷ Lệ Đại Biểu Nữ Kỷ Lục (26.83%):</strong> 132 nữ đại biểu trúng cử — tỷ lệ phụ nữ tham chính cao hàng đầu thế giới năm 1976, khẳng định vị thế to lớn của người phụ nữ Việt Nam trong thời đại mới.
          `;
        } else if (filterKey === 'ethnic') {
          legendEl.innerHTML = `
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#34D399"></span>Dân tộc thiểu số: 80 (16.26%)</div>
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#4B5563"></span>Dân tộc Kinh: 412 (83.74%)</div>
          `;
          insightEl.innerHTML = `
            <strong>Đại Diện Các Dân Tộc Anh Em (16.26%):</strong> 80 đại biểu các dân tộc Tày, Nùng, Thái, Mường, Ê Đê, Ba Na, Khmer, Hoa,... cùng hội tụ quyết định tương lai đất nước.
          `;
        } else if (filterKey === 'region') {
          legendEl.innerHTML = `
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#38BDF8"></span>Miền Bắc: 249 đại biểu (50.6%)</div>
            <div class="hemi-legend-item"><span class="hemi-legend-dot" style="background:#FB923C"></span>Miền Nam: 243 đại biểu (49.4%)</div>
          `;
          insightEl.innerHTML = `
            <strong>Giang Sơn Thu Về Một Mối:</strong> Sự cân đối hài hòa giữa 249 đại biểu miền Bắc và 243 đại biểu miền Nam xóa nhòa ranh giới chia cắt, hội tụ ý chí thống nhất của đồng bào cả nước.
          `;
        }
      }

      if (window.lucide) lucide.createIcons();
    }
    // ===== COMPARISON SLIDER (STEP 4: CHAPTER 1) =====
    function initComparisonSlider() {
      const viewport = document.getElementById('comp-viewport');
      const handle = document.getElementById('comp-handle');
      const line = document.getElementById('comp-line');
      const northCol = document.getElementById('comp-col-north');
      const southCol = document.getElementById('comp-col-south');
      if (!viewport || !handle || !line || !northCol || !southCol) return;

      let isDragging = false;

      function updateSlider(pct) {
        const clamped = Math.max(15, Math.min(85, pct));
        handle.style.left = clamped + '%';
        line.style.left = clamped + '%';
        northCol.style.width = clamped + '%';
        southCol.style.width = (100 - clamped) + '%';

        // Update preset active button
        document.querySelectorAll('.comp-preset-btn').forEach(btn => btn.classList.remove('active'));
        if (Math.abs(clamped - 50) < 4) {
          const b = document.getElementById('btn-comp-split');
          if (b) b.classList.add('active');
        } else if (clamped >= 70) {
          const b = document.getElementById('btn-comp-north');
          if (b) b.classList.add('active');
        } else if (clamped <= 30) {
          const b = document.getElementById('btn-comp-south');
          if (b) b.classList.add('active');
        }
      }

      window.setComparisonSlider = function(pct) {
        updateSlider(pct);
      };

      function onPointerMove(e) {
        if (!isDragging) return;
        const rect = viewport.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = clientX - rect.left;
        const pct = (x / rect.width) * 100;
        updateSlider(pct);
      }

      function startDrag(e) {
        isDragging = true;
        handle.classList.add('dragging');
        onPointerMove(e);
      }

      function stopDrag() {
        if (!isDragging) return;
        isDragging = false;
        handle.classList.remove('dragging');
      }

      viewport.addEventListener('mousedown', startDrag);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', stopDrag);

      viewport.addEventListener('touchstart', startDrag, { passive: true });
      window.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('touchend', stopDrag);

      updateSlider(50);
    }

    // ===== NATIONAL SYMBOLS EXPLORER (AUTHENTIC ASSETS INTEGRATION) =====
    const emblemPartsData = {
      star: {
        title: 'Ngôi Sao Vàng Năm Cánh',
        desc: 'Đặt tại trung tâm trên nền đỏ thắm. Biểu trưng cho sự soi đường của lý tưởng cách mạng và khối đại đoàn kết keo sơn của 5 giai tầng xã hội: Sĩ, Nông, Công, Thương, Binh cùng chung sức dựng xây non sông.'
      },
      gear: {
        title: 'Bánh Xe Răng Cưa Công Nghiệp',
        desc: 'Tượng trưng cho giai cấp công nhân tiên phong và định hướng xây dựng một nền công nghiệp hiện đại hóa, cơ khí hóa đất nước sau ngày hòa bình thống nhất.'
      },
      rice: {
        title: 'Hai Bông Lúa Vàng Uốn Cong',
        desc: 'Hai dải lúa vàng trĩu hạt ôm trọn lấy ngôi sao và bánh xe, biểu trưng cho giai cấp nông dân và bản sắc nền văn minh nông nghiệp lúa nước trù phú của một quốc gia nhiệt đới.'
      },
      ribbon: {
        title: 'Dải Lụa Đỏ Mang Dòng Chữ Quốc Hiệu',
        desc: 'Dải lụa đỏ thắm cuộn tròn quanh bông lúa và bánh xe, ở giữa khắc dòng chữ kim nhũ trang trọng "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", biểu trưng cho thể chế nhà nước thống nhất, bền vững muôn đời.'
      }
    };

    function openSymbolImage(src, title, context) {
      const img = document.getElementById('lightbox-img');
      const bp = document.getElementById('lightbox-blueprint');
      document.getElementById('lightbox-title').textContent = title;
      document.getElementById('lightbox-context').textContent = context || 'Hình ảnh tư liệu lịch sử chính thức được phê chuẩn tại Kỳ họp thứ nhất Quốc hội khóa VI (tháng 7/1976).';
      document.getElementById('lightbox-source').textContent = 'Nguồn: Tư liệu lưu trữ Nhà nước / Bảo tàng Lịch sử Quốc gia';
      document.getElementById('lb-code').textContent = 'BIỂU TƯỢNG QUỐC GIA';
      img.src = src;
      img.alt = title;
      img.style.display = 'block';
      if (bp) bp.style.display = 'none';
      document.getElementById('lightbox-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }

    function selectNationalSymbol(symbolKey, activePart) {
      // Update symbol tab pills
      document.querySelectorAll('#symbol-pill-bar .symbol-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-symbol') === symbolKey);
      });

      const wrapper = document.getElementById('symbol-stage-wrapper');
      if (!wrapper) return;

      if (symbolKey === 'emblem') {
        const partInfo = activePart ? emblemPartsData[activePart] : null;
        wrapper.innerHTML = `
          <div class="symbol-display-grid">
            <div class="symbol-visual-box">
              <div class="relative group cursor-pointer" onclick="openSymbolImage('assets/images/quoc_huy.png', 'Quốc huy Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam', 'Mẫu Quốc huy do họa sĩ Bùi Trang Chước phác thảo và họa sĩ Trần Văn Cẩn chỉnh sửa, được Quốc hội khóa VI chính thức phê chuẩn ngày 2/7/1976.')">
                <img src="assets/images/quoc_huy.png" alt="Quốc huy Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam" class="w-32 h-32 object-contain filter drop-shadow-lg transition-transform group-hover:scale-105" />
                <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                  <i data-lucide="zoom-in" class="w-5 h-5 text-amber"></i>
                </div>
              </div>
              <div class="flex flex-wrap gap-1 justify-center mt-2.5">
                <button class="symbol-part-chip ${activePart === 'star' ? 'active' : ''}" onclick="inspectEmblemPart('star')">⭐ Ngôi sao vàng</button>
                <button class="symbol-part-chip ${activePart === 'gear' ? 'active' : ''}" onclick="inspectEmblemPart('gear')">⚙️ Bánh xe răng cưa</button>
                <button class="symbol-part-chip ${activePart === 'rice' ? 'active' : ''}" onclick="inspectEmblemPart('rice')">🌾 Hai bông lúa</button>
                <button class="symbol-part-chip ${activePart === 'ribbon' ? 'active' : ''}" onclick="inspectEmblemPart('ribbon')">🎗️ Dải lụa đỏ Quốc hiệu</button>
              </div>
            </div>
            <div class="symbol-content-box">
              ${partInfo ? `
                <div class="border-b border-amber/20 pb-1.5 mb-2">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-amber animate-pulse"></span>
                    <h4 class="font-serif font-bold text-sm text-parchment">${partInfo.title}</h4>
                  </div>
                  <p class="text-[10px] text-amber/80 font-mono">Chi tiết cấu thành Quốc huy</p>
                </div>
                <p class="text-xs text-parchment/90 leading-relaxed mb-2.5 font-serif">${partInfo.desc}</p>
                <button onclick="selectNationalSymbol('emblem')" class="text-[11px] text-amber hover:underline flex items-center gap-1">
                  <i data-lucide="rotate-ccw" class="w-3 h-3"></i> Xem tổng quan Quốc huy
                </button>
              ` : `
                <div class="border-b border-amber/20 pb-1.5 mb-2">
                  <h4 class="font-serif font-bold text-sm text-parchment">QUỐC HUY NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                  <p class="text-[10px] text-amber/80 font-mono">Nghị quyết ngày 2 tháng 7 năm 1976 — Kỳ họp thứ nhất Quốc hội khóa VI</p>
                </div>
                <p class="text-xs text-parchment/90 leading-relaxed mb-2 font-serif">
                  Quốc hội khóa VI đã kế thừa mẫu Quốc huy do họa sĩ Bùi Trang Chước phác thảo và họa sĩ Trần Văn Cẩn chỉnh sửa, chính thức phê chuẩn là <strong>Quốc huy của nước Việt Nam thống nhất</strong>.
                </p>
                <div class="p-2 rounded bg-amber/10 border-l-2 border-amber text-[10.5px] text-parchment/85 leading-relaxed">
                  Dải lụa đỏ thắm ôm trọn bánh xe răng cưa và bông lúa vàng khắc dòng chữ kim nhũ trang trọng: <strong>"CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM"</strong>.
                </div>
                <p class="text-[10px] text-amber/80 italic mt-2">💡 Nhấn vào các nút phía dưới hình Quốc huy để tìm hiểu ý nghĩa từng chi tiết cấu thành.</p>
              `}
            </div>
          </div>
        `;
      } else if (symbolKey === 'name') {
        wrapper.innerHTML = `
          <div class="national-proclamation-card text-center">
            <div class="flex items-center justify-center gap-2 mb-1">
              <img src="assets/images/quoc_huy.png" alt="Quốc huy Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam" class="w-12 h-12 object-contain drop-shadow" />
            </div>
            <div class="font-serif font-black text-amber text-base md:text-lg tracking-wider uppercase drop-shadow mb-0.5">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div class="font-serif italic text-parchment/90 text-xs tracking-widest mb-2">
              Độc lập — Tự do — Hạnh phúc
            </div>
            <div class="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber to-transparent mx-auto mb-2.5"></div>

            <div class="bg-black/45 border border-amber/25 rounded-lg p-3 text-left space-y-2">
              <div class="text-center font-bold text-amber-light text-xs font-serif">
                NGHỊ QUYẾT KỲ HỌP THỨ NHẤT QUỐC HỘI KHÓA VI<br>
                <span class="text-[10.5px] font-normal italic text-parchment/70">(Thông qua ngày 2 tháng 7 năm 1976 tại Hội trường Ba Đình, Hà Nội)</span>
              </div>
              <p class="text-xs text-parchment/90 leading-relaxed font-serif text-center">
                Quốc hội nước Việt Nam thống nhất quyết nghị: Đặt tên nước là <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10.5px] text-parchment/80 pt-1">
                <div class="p-2 rounded bg-amber/10 border-l-2 border-amber">
                  <strong class="text-amber-light block mb-0.5">Thống nhất Thể chế</strong>
                  Chấm dứt hoàn toàn sự phân định giữa 2 danh xưng tạm thời <em>Việt Nam Dân chủ Cộng hòa</em> và <em>Cộng hòa miền Nam Việt Nam</em>.
                </div>
                <div class="p-2 rounded bg-amber/10 border-l-2 border-amber">
                  <strong class="text-amber-light block mb-0.5">Chủ quyền Toàn vẹn</strong>
                  Khẳng định chủ quyền độc lập, thống nhất thiêng liêng từ Mục Nam Quan đến Mũi Cà Mau cùng toàn bộ vùng trời, vùng biển và hải đảo.
                </div>
                <div class="p-2 rounded bg-amber/10 border-l-2 border-amber">
                  <strong class="text-amber-light block mb-0.5">Định hướng Tương lai</strong>
                  Xác lập con đường phát triển nhất quán của toàn dân tộc: Độc lập dân tộc gắn liền với Chủ nghĩa Xã hội trên phạm vi cả nước.
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (symbolKey === 'flag') {
        wrapper.innerHTML = `
          <div class="symbol-display-grid">
            <div class="symbol-visual-box">
              <div class="relative group cursor-pointer" onclick="openSymbolImage('assets/images/quoc_ky.webp', 'Quốc kỳ Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam', 'Quốc kỳ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam nền đỏ, ở giữa có ngôi sao vàng năm cánh.')">
                <img src="assets/images/quoc_ky.webp" onerror="this.src='assets/images/quoc_ky.png'" alt="Quốc kỳ Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam" class="w-40 h-auto object-contain rounded border border-amber/40 shadow-lg group-hover:scale-105 transition-transform" />
                <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded transition-opacity">
                  <i data-lucide="zoom-in" class="w-5 h-5 text-amber"></i>
                </div>
              </div>
              <span class="text-[10px] text-amber/90 font-mono mt-2 text-center">Tỷ lệ chuẩn 2:3 • Cờ đỏ sao vàng</span>
            </div>
            <div class="symbol-content-box">
              <div class="border-b border-amber/20 pb-1.5 mb-2">
                <h4 class="font-serif font-bold text-sm text-parchment">QUỐC KỲ NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                <p class="text-[10px] text-amber/80 font-mono">Nghị quyết ngày 2 tháng 7 năm 1976 — Kế thừa Quốc kỳ thiêng liêng từ năm 1945</p>
              </div>
              <p class="text-xs text-parchment/90 leading-relaxed mb-2 font-serif">
                Quốc hội khóa VI quyết nghị: Quốc kỳ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam nền đỏ, ở giữa có ngôi sao vàng năm cánh.
              </p>
              <div class="space-y-1.5 text-[10.5px] text-parchment/85 leading-relaxed">
                <p>• <strong>Nền đỏ thắm:</strong> Tượng trưng cho nhiệt huyết cách mạng, màu cờ chiến thắng và màu máu của các thế hệ anh hùng liệt sĩ đã ngã xuống vì độc lập, tự do và thống nhất Tổ quốc.</p>
                <p>• <strong>Ngôi sao vàng năm cánh:</strong> Tượng trưng cho ánh sáng cách mạng soi đường và biểu tượng khối đại đoàn kết toàn dân tộc gồm năm giai tầng: Sĩ, Nông, Công, Thương, Binh cùng chung sức dựng xây đất nước.</p>
                <p>• <strong>Ý nghĩa lịch sử:</strong> Lá cờ đỏ sao vàng chính thức tung bay trên toàn bộ lãnh thổ thống nhất, thay thế lá cờ nửa đỏ nửa xanh của Chính phủ Cách mạng Lâm thời sau khi hoàn thành xuất sắc sứ mệnh lịch sử vẻ vang.</p>
              </div>
            </div>
          </div>
        `;
      } else if (symbolKey === 'anthem') {
        wrapper.innerHTML = `
          <div class="symbol-display-grid">
            <div class="symbol-visual-box">
              <div class="relative group cursor-pointer" onclick="openSymbolImage('assets/images/quoc_ca.png', 'Bản phổ Tiến Quân Ca — Nhạc sĩ Văn Cao', 'Bản phổ bài Tiến quân ca của Nhạc sĩ Văn Cao sáng tác năm 1944, được Quốc hội khóa VI tiếp tục khẳng định làm Quốc ca chính thức của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.')">
                <img src="assets/images/quoc_ca.png" alt="Bản phổ Tiến Quân Ca của Nhạc sĩ Văn Cao" class="max-h-36 w-auto object-contain rounded border border-amber/30 shadow-lg group-hover:scale-105 transition-transform" />
                <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded transition-opacity">
                  <i data-lucide="zoom-in" class="w-5 h-5 text-amber"></i>
                </div>
              </div>
              <span class="text-[9.5px] text-amber/90 font-mono mt-2 text-center">Bút tích bản phổ gốc • Nhạc sĩ Văn Cao (1944)</span>
            </div>
            <div class="symbol-content-box">
              <div class="border-b border-amber/20 pb-1.5 mb-2">
                <h4 class="font-serif font-bold text-sm text-parchment">QUỐC CA NƯỚC CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                <p class="text-[10px] text-amber/80 font-mono">Tác phẩm: "Tiến Quân Ca" — Tác giả: Nhạc sĩ Văn Cao</p>
              </div>
              <div class="p-2 rounded bg-amber/10 border-l-2 border-amber text-xs italic font-serif text-amber text-center mb-2 leading-relaxed">
                "Đoàn quân Việt Nam đi, chung lòng cứu quốc, bước chân dồn vang trên đường gập ghềnh xa... Tiến lên! Cùng tiến lên! Nước non Việt Nam ta vững bền!"
              </div>
              <div class="space-y-1 text-[10.5px] text-parchment/85 leading-relaxed">
                <p>• Ra đời mùa đông năm 1944 trong cao trào chuẩn bị Tổng khởi nghĩa Cách mạng Tháng Tám, bài hát đã trở thành tiếng gọi non sông thiêng liêng.</p>
                <p>• Sau khi được Quốc hội khóa I chọn làm Quốc ca năm 1946, Quốc hội khóa VI (tháng 7/1976) toàn thể 492 đại biểu đã nhất trí tiếp tục giữ nguyên bản hùng ca <strong>"Tiến Quân Ca"</strong> làm Quốc ca chính thức của nước Việt Nam thống nhất.</p>
              </div>
            </div>
          </div>
        `;
      } else if (symbolKey === 'capital') {
        wrapper.innerHTML = `
          <div class="symbol-display-grid">
            <div class="symbol-visual-box">
              <div class="relative group cursor-pointer" onclick="openSymbolImage('assets/images/thu_do_ha_noi_1976.jpg', 'Thủ đô Hà Nội — Trái tim của cả nước', 'Quảng trường Ba Đình và Lăng Chủ tịch Hồ Chí Minh tại Thủ đô Hà Nội nhìn từ trên cao — nơi hội tụ niềm tin, ý chí và trái tim của đồng bào cả nước trong kỷ nguyên non sông thống nhất (Ảnh: TTXVN).')">
                <img src="assets/images/thu_do_ha_noi_1976.jpg" alt="Thủ đô Hà Nội và Quảng trường Ba Đình" class="w-full h-auto max-h-36 object-cover rounded border border-amber/40 shadow-lg group-hover:scale-105 transition-transform" />
                <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded transition-opacity">
                  <i data-lucide="zoom-in" class="w-5 h-5 text-amber"></i>
                </div>
              </div>
              <span class="text-[9.5px] text-amber/90 font-mono mt-2 text-center">Quảng trường Ba Đình • Hà Nội (Ảnh: TTXVN)</span>
            </div>
            <div class="symbol-content-box">
              <div class="border-b border-amber/20 pb-1.5 mb-2">
                <div class="flex items-center gap-1.5">
                  <i data-lucide="landmark" class="w-4 h-4 text-amber"></i>
                  <h4 class="font-serif font-bold text-sm text-parchment">THỦ ĐÔ HÀ NỘI — TRÁI TIM CỦA CẢ NƯỚC</h4>
                </div>
                <p class="text-[10px] text-amber/80 font-mono">Nghị quyết Kỳ họp thứ nhất Quốc hội khóa VI (Ngày 2 tháng 7 năm 1976)</p>
              </div>
              <p class="text-xs text-parchment/90 leading-relaxed mb-2 font-serif">
                Kỳ họp thứ nhất Quốc hội khóa VI chính thức quyết nghị: <strong>Thủ đô của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là Hà Nội</strong>.
              </p>
              <div class="bg-black/30 border border-amber/20 rounded p-2 space-y-1 text-[10.5px] text-parchment/85 leading-relaxed">
                <p>• <strong>Mảnh đất ngàn năm văn hiến:</strong> Nơi hội tụ tinh hoa hồn thiêng sông núi, trung tâm đầu não chính trị, văn hóa, khoa học và ngoại giao của cả nước.</p>
                <p>• <strong>Cội nguồn độc lập:</strong> Nơi Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập ngày 2/9/1945 tại Quảng trường Ba Đình lịch sử khai sinh nước Việt Nam Dân chủ Cộng hòa.</p>
                <p>• <strong>Trái tim Tổ quốc thống nhất:</strong> Nơi Quốc hội khóa VI họp bàn tại Hội trường Ba Đình và quyết nghị những mốc son lịch sử, trọn vẹn non sông thống nhất.</p>
              </div>
            </div>
          </div>
        `;
      } else if (symbolKey === 'hcm') {
        wrapper.innerHTML = `
          <div class="symbol-display-grid">
            <div class="symbol-visual-box">
              <div class="relative group cursor-pointer" onclick="openSymbolImage('assets/images/thanh_pho_ho_chi_minh_1976.jpg', 'Thành phố Hồ Chí Minh — Thành đồng Tổ quốc', 'Hàng vạn đồng bào, chiến sĩ mít tinh rực rỡ cờ hoa trước Dinh Độc Lập / Hội trường Thống Nhất mừng ngày non sông thống nhất và Thành phố mang tên Chủ tịch Hồ Chí Minh vĩ đại (Ảnh tư liệu lịch sử).')">
                <img src="assets/images/thanh_pho_ho_chi_minh_1976.jpg" alt="Mít tinh lịch sử tại Hội trường Thống Nhất, TP. Hồ Chí Minh" class="w-full h-auto max-h-36 object-cover rounded border border-amber/40 shadow-lg group-hover:scale-105 transition-transform" />
                <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded transition-opacity">
                  <i data-lucide="zoom-in" class="w-5 h-5 text-amber"></i>
                </div>
              </div>
              <span class="text-[9.5px] text-amber/90 font-mono mt-2 text-center">Hội trường Thống Nhất • TP. Hồ Chí Minh</span>
            </div>
            <div class="symbol-content-box">
              <div class="border-b border-amber/20 pb-1.5 mb-2">
                <div class="flex items-center gap-1.5">
                  <i data-lucide="map-pin" class="w-4 h-4 text-amber"></i>
                  <h4 class="font-serif font-bold text-sm text-parchment">THÀNH PHỐ HỒ CHÍ MINH</h4>
                </div>
                <p class="text-[10px] text-amber/80 font-mono">Quyết nghị lịch sử ngày 2 tháng 7 năm 1976 của Quốc hội khóa VI</p>
              </div>
              <p class="text-xs text-parchment/90 leading-relaxed mb-2 font-serif">
                Quốc hội khóa VI long trọng quyết định: <strong>Chính thức đổi tên Thành phố Sài Gòn — Gia Định thành Thành phố Hồ Chí Minh</strong>.
              </p>
              <div class="bg-black/30 border border-amber/20 rounded p-2 space-y-1 text-[10.5px] text-parchment/85 leading-relaxed">
                <p>• <strong>Tri ân công đức trời biển:</strong> Để bày tỏ lòng biết ơn vô hạn của toàn thể nhân dân Việt Nam đối với Chủ tịch Hồ Chí Minh vĩ đại — vị lãnh tụ kính yêu đã cống hiến trọn cuộc đời vì độc lập, tự do và thống nhất non sông.</p>
                <p>• <strong>Biểu dương tinh thần bất khuất:</strong> Ghi nhận và biểu dương tinh thần kiên trung của đồng bào, chiến sĩ thành phố và miền Nam — dải đất "Thành đồng Tổ quốc" đi trước về sau trong sự nghiệp cách mạng vẻ vang.</p>
                <p>• <strong>Đầu tàu tương lai:</strong> Đô thị trung tâm kinh tế, văn hóa và khoa học công nghệ năng động, nghĩa tình, xứng đáng với niềm vinh dự tự hào mang tên Bác.</p>
              </div>
            </div>
          </div>
        `;
      }

      if (window.lucide) lucide.createIcons();
    }

    function inspectEmblemPart(partKey) {
      selectNationalSymbol('emblem', partKey);
    }
