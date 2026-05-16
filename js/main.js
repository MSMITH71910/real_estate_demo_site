document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== MOBILE MENU =====
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = mobileBtn.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileBtn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ===== AI LEAD QUALIFIER CHATBOT =====
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatMessages = document.querySelector('.chatbot-messages');
  const chatInput = document.querySelector('.chatbot-input');
  const chatSend = document.querySelector('.chatbot-send');
  const scoreIndicator = document.querySelector('.lead-score-indicator');

  let chatOpen = false;
  let hasGreeted = false;
  let leadScore = 0;
  let leadType = null;

  const botResponses = {
    'buy': {
      text: "Great! I'd love to help you find your perfect home. 🏠 Let me qualify your search to find the best matches.\n\nWhat's your approximate price range?",
      quick: ['Under $300K', '$300K–$500K', '$500K–$750K', '$750K–$1M', '$1M+'],
      score: 20, type: 'buyer'
    },
    'buying': {
      text: "Exciting — let's find your dream home! 🏠 I'll ask a few questions to match you with the right listings.\n\nWhat price range are you working with?",
      quick: ['Under $300K', '$300K–$500K', '$500K–$750K', '$750K–$1M', '$1M+'],
      score: 20, type: 'buyer'
    },
    'sell': {
      text: "Perfect — let's get your home sold for top dollar! 🏡 Marcus Chen averages 98.5% of list price.\n\nWhat type of home are you selling?",
      quick: ['Single family home', 'Condo / Townhome', 'Multi-family', 'Land / Lot'],
      score: 25, type: 'seller'
    },
    'selling': {
      text: "Great choice! Marcus has sold 600+ homes in Chicago. Let's get started. 📋\n\nWhat type of property are you selling?",
      quick: ['Single family home', 'Condo / Townhome', 'Multi-family', 'Land / Lot'],
      score: 25, type: 'seller'
    },
    'under $300k': {
      text: "We have great options under $300K! 🏠 There are currently 34 active listings in that range across Chicago.\n\nWhat neighborhood are you interested in?",
      quick: ['Lincoln Park', 'Wicker Park', 'Logan Square', 'South Loop', 'Open to all areas'],
      score: 15
    },
    '$300k–$500k': {
      text: "The $300K–$500K range is very active right now! 📈 Average days on market is just 12 days in that price band.\n\nAny preferred neighborhoods?",
      quick: ['Lincoln Park', 'Wicker Park', 'Bucktown', 'Lakeview', 'Open to all areas'],
      score: 15
    },
    '$500k–$750k': {
      text: "Excellent budget — lots of beautiful options in that range! We have 28 active listings between $500K–$750K.\n\nWhat features are most important to you?",
      quick: ['3+ bedrooms', 'Garage parking', 'Private outdoor space', 'Updated kitchen', 'Good schools'],
      score: 20
    },
    '$750k–$1m': {
      text: "That price point opens up some beautiful Chicago properties! 🏡 Marcus specializes in luxury sales and has closed 40+ transactions above $750K.\n\nWhat's your ideal timeline to purchase?",
      quick: ['ASAP / 30 days', '1–3 months', '3–6 months', 'Just exploring'],
      score: 25
    },
    '$1m+': {
      text: "Welcome to luxury! 🏛️ Marcus Chen is one of Chicago's top luxury agents with $45M+ in annual sales. I'll connect you personally with Marcus.\n\nWhat's your ideal timeline?",
      quick: ['ASAP', '1–3 months', '3–6 months', 'Flexible'],
      score: 30
    },
    'asap': {
      text: "Hot lead! 🔥 Marcus will personally reach out within the hour.\n\nTo get started immediately, can I get your contact info? Or visit our Contact page to schedule a call today.",
      quick: ['Schedule a call', 'View listings', 'Get home value', 'Contact Marcus'],
      score: 30
    },
    '1–3 months': {
      text: "Great timeline — that gives us time to find the perfect match! I'd recommend:\n\n1. Signing up for listing alerts\n2. Getting pre-approved for a mortgage\n3. Scheduling a buyer consultation with Marcus\n\nWant to get started?",
      quick: ['Set up listing alerts', 'Buyer consultation', 'View current listings', 'Mortgage info'],
      score: 20
    },
    'pre-approval': {
      text: "Smart move — pre-approval is step 1! 💳 Marcus works with several preferred lenders offering:\n\n• Competitive rates (from 6.4% today)\n• Fast 48-hour pre-approval\n• Down payment assistance programs\n\nWant a lender referral?",
      quick: ['Yes, connect me', 'View listings first', 'Buyer guide', 'Schedule consultation'],
      score: 25
    },
    'home value': {
      text: "Get your free home valuation! 🏡 Marcus uses AI-powered market analysis + local expertise to give you an accurate estimate.\n\nVisit our Sellers page for an instant estimate, or I can connect you with Marcus directly.\n\nWhat's your home's approximate size?",
      quick: ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft'],
      score: 20, type: 'seller'
    },
    'lincoln park': {
      text: "Lincoln Park is one of Chicago's most sought-after neighborhoods! 🌳\n\n• Average sale price: $687,000\n• 8 active listings now\n• Average 9 days on market\n\nWant me to send you current Lincoln Park listings?",
      quick: ['Show me listings', 'Schedule a tour', 'Market report', 'Other neighborhoods'],
      score: 15
    },
    'wicker park': {
      text: "Great choice — Wicker Park is incredibly hot right now! 🔥\n\n• Average sale price: $498,000\n• 14 active listings\n• Average 7 days on market (very fast!)\n\nWant to see current Wicker Park listings?",
      quick: ['Show me listings', 'Schedule a tour', 'Market report', 'Other neighborhoods'],
      score: 15
    },
    'lakeview': {
      text: "Lakeview is a fantastic neighborhood with great walkability! 🌊\n\n• Average sale price: $542,000\n• 11 active listings\n• Mix of condos and single-family homes\n\nShall I pull up current Lakeview listings?",
      quick: ['Show me listings', 'Schedule a tour', 'Market report', 'Other neighborhoods'],
      score: 15
    },
    'market': {
      text: "📊 Chicago Market Snapshot (May 2026):\n\n• Median sale price: $387,000 (+5.2% YoY)\n• Average days on market: 11 days\n• Homes sold over asking: 34%\n• Inventory: Low (seller's market)\n\nWant the full monthly market report emailed to you?",
      quick: ['Send market report', 'What should I list for?', 'Buyer or seller market?', 'View listings'],
      score: 10
    },
    'schedule': {
      text: "📅 Let's get you on Marcus's calendar!\n\nAvailable slots this week:\n• Tue, May 20: 10AM, 2PM, 4PM\n• Wed, May 21: 11AM, 3PM\n• Thu, May 22: 9AM, 1PM, 5PM\n\nVisit our Contact page to book, or call (555) 412-8830.",
      quick: ['Book consultation', 'Call Marcus now', 'Virtual meeting', 'Contact page'],
      score: 25
    },
    'invest': {
      text: "Investment properties are a specialty of Marcus Chen Real Estate! 📈\n\nWe specialize in:\n• Multi-family properties (2–12 units)\n• Short-term rental properties\n• Fix-and-flip opportunities\n• 1031 exchanges\n\nWhat type of investment are you targeting?",
      quick: ['Multi-family', 'Fix and flip', 'Short-term rental', '1031 exchange'],
      score: 25
    },
    'hours': {
      text: "🕐 Marcus Chen Real Estate Group is available:\n\n• Office: Mon–Fri 9AM–6PM\n• Showings: 7 days, 8AM–8PM\n• Emergency: Marcus's direct cell 24/7\n\nPhone: (555) 412-8830\nEmail: marcus@chengrouprealty.com",
      quick: ['Schedule showing', 'Call now', 'Send a message', 'View listings'],
      score: 5
    },
    'contact': {
      text: "📞 Reach Marcus Chen Real Estate Group:\n\n• Phone: (555) 412-8830\n• Email: marcus@chengrouprealty.com\n• Office: 400 N Michigan Ave, Suite 1200, Chicago, IL\n\nOr visit our Contact page to send a message directly!",
      quick: ['Schedule consultation', 'View listings', 'Get home value', 'Market report'],
      score: 5
    }
  };

  function getScore() {
    if (leadScore >= 80) return { label: 'HOT LEAD 🔥', color: '#dc2626' };
    if (leadScore >= 50) return { label: 'Warm Lead ⭐', color: '#f59e0b' };
    if (leadScore >= 20) return { label: 'Qualifying...', color: '#60a5fa' };
    return { label: 'New Lead', color: '#94a3b8' };
  }

  function updateScoreIndicator() {
    if (!scoreIndicator) return;
    const s = getScore();
    scoreIndicator.textContent = s.label;
    scoreIndicator.style.background = `${s.color}22`;
    scoreIndicator.style.color = s.color;
    scoreIndicator.style.borderColor = s.color;
  }

  function getResponse(msg) {
    const lower = msg.toLowerCase();
    for (const key of Object.keys(botResponses)) {
      if (lower.includes(key)) return { key, ...botResponses[key] };
    }
    return {
      text: "I'm here to help you buy, sell, or invest in Chicago real estate! 🏠\n\nWhat brings you here today?",
      quick: ['I want to buy', 'I want to sell', 'Investment property', 'Get home value', 'Market update']
    };
  }

  function addMessage(text, sender) {
    if (!chatMessages) return;
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = sender === 'bot' ? 'MC' : '👤';
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.style.whiteSpace = 'pre-line';
    bubble.textContent = text;
    div.append(avatar, bubble);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showQuickReplies(replies) {
    const container = document.querySelector('.chatbot-quick-replies');
    if (!container) return;
    container.innerHTML = '';
    replies.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply-btn';
      btn.textContent = r;
      btn.addEventListener('click', () => {
        addMessage(r, 'user');
        container.innerHTML = '';
        const res = getResponse(r);
        if (res.score) { leadScore = Math.min(100, leadScore + res.score); updateScoreIndicator(); }
        if (res.type) { leadType = res.type; }
        setTimeout(() => {
          addMessage(res.text, 'bot');
          if (res.quick) showQuickReplies(res.quick);
        }, 600);
      });
      container.appendChild(btn);
    });
  }

  function handleSend() {
    const msg = chatInput?.value.trim();
    if (!msg) return;
    chatInput.value = '';
    addMessage(msg, 'user');
    document.querySelector('.chatbot-quick-replies').innerHTML = '';
    const res = getResponse(msg);
    if (res.score) { leadScore = Math.min(100, leadScore + res.score); updateScoreIndicator(); }
    if (res.type) leadType = res.type;
    setTimeout(() => {
      addMessage(res.text, 'bot');
      if (res.quick) showQuickReplies(res.quick);
    }, 700);
  }

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
      chatOpen = !chatOpen;
      chatbotWindow.classList.toggle('open', chatOpen);
      chatbotToggle.querySelector('i').className = chatOpen ? 'fas fa-times' : 'fas fa-comment-dots';
      const notif = chatbotToggle.querySelector('.chat-notification');
      if (notif) notif.remove();
      if (chatOpen && !hasGreeted) {
        hasGreeted = true;
        setTimeout(() => {
          addMessage("Hi! I'm Alex, the AI lead assistant for Marcus Chen Real Estate Group. 🏠\n\nI can help qualify your search, answer market questions, and connect you with Marcus.\n\nWhat brings you here today?", 'bot');
          showQuickReplies(['I want to buy a home', 'I want to sell my home', 'Investment property', 'Get a home value', 'Chicago market update']);
        }, 400);
      }
    });
    chatbotClose?.addEventListener('click', () => {
      chatOpen = false;
      chatbotWindow.classList.remove('open');
      chatbotToggle.querySelector('i').className = 'fas fa-comment-dots';
    });
    chatSend?.addEventListener('click', handleSend);
    chatInput?.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

    setTimeout(() => {
      if (!hasGreeted && chatbotToggle) {
        const notif = document.createElement('div');
        notif.className = 'chat-notification';
        notif.textContent = '1';
        chatbotToggle.appendChild(notif);
      }
    }, 3000);
  }

  // ===== LEAD FORM → 7-DAY FOLLOW-UP =====
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('lead-name')?.value || 'Friend';
      const intent = document.getElementById('lead-intent')?.value || 'Buyer';
      document.getElementById('conf-lead-name').textContent = name;
      document.getElementById('conf-lead-intent').textContent = intent;
      openModal('leadModal');
    });
  }

  // ===== SHOWING SCHEDULER =====
  const showingForm = document.getElementById('showingForm');
  if (showingForm) {
    showingForm.addEventListener('submit', e => {
      e.preventDefault();
      const addr = document.getElementById('showing-address')?.value || 'Selected Property';
      const date = document.getElementById('showing-date')?.value || '';
      const time = document.getElementById('showing-time')?.value || '';
      document.getElementById('conf-showing-addr').textContent = addr;
      document.getElementById('conf-showing-date').textContent = date ? new Date(date+'T12:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'}) : 'Selected date';
      document.getElementById('conf-showing-time').textContent = time;
      openModal('showingModal');
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      openModal('contactModal');
    });
  }

  // ===== SELLER VALUE FORM =====
  const sellerForm = document.getElementById('sellerForm');
  if (sellerForm) {
    sellerForm.addEventListener('submit', e => {
      e.preventDefault();
      openModal('sellerModal');
    });
  }

  // ===== MORTGAGE CALCULATOR =====
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const price = parseFloat(document.getElementById('calc-price')?.value || 400000);
      const down = parseFloat(document.getElementById('calc-down')?.value || 20);
      const rate = parseFloat(document.getElementById('calc-rate')?.value || 6.75);
      const term = parseInt(document.getElementById('calc-term')?.value || 30);
      const loan = price * (1 - down / 100);
      const monthlyRate = rate / 100 / 12;
      const n = term * 12;
      const monthly = loan * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
      const resultEl = document.getElementById('calc-result-val');
      if (resultEl) resultEl.textContent = '$' + Math.round(monthly).toLocaleString();
      document.getElementById('calc-result-section')?.classList.remove('hidden');
    });
  }

  // ===== INSTAGRAM CAPTION GENERATOR =====
  const captionBtn = document.getElementById('generateCaptionBtn');
  if (captionBtn) {
    captionBtn.addEventListener('click', () => {
      const listingAddr = document.getElementById('caption-address')?.value || '2847 N Lincoln Ave';
      const price = document.getElementById('caption-price')?.value || '$549,000';
      const beds = document.getElementById('caption-beds')?.value || '4';
      const captions = [
        `✨ Just Listed! ${listingAddr}\n\nYour dream home is waiting. This stunning ${beds}-bed beauty is priced at ${price} and won't last long!\n\nEvery corner of this home tells a story of luxury, comfort, and timeless design. Imagine starting your mornings here. 🏡\n\nDM me or tap the link in bio to schedule your private showing TODAY.`,
        `🔑 NEW LISTING ALERT! 🔑\n\n${listingAddr} — Listed at ${price}\n\n${beds} bedrooms | Fully Updated | Move-In Ready\n\nThe Chicago market is HOT and this one will go FAST. Book your private tour this week before it's gone! Call (555) 412-8830 📱\n\nYour next chapter starts here. ✨`,
        `🏠 JUST LISTED | ${price}\n\n${listingAddr} — ${beds} beds of pure perfection!\n\nSought-after neighborhood. Updated throughout. Perfect for growing families or savvy investors.\n\nReady to make a move? Let's talk. Link in bio for full details and virtual tour. 👇`
      ];
      const caption = captions[Math.floor(Math.random() * captions.length)];
      const captionEl = document.getElementById('generated-caption');
      if (captionEl) captionEl.textContent = caption;
      document.getElementById('caption-output')?.classList.remove('hidden');
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.listing-card, .service-card, .team-card, .testimonial-card, .ai-card, .market-stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ===== MODAL HELPERS =====
  window.openModal = (id) => { const m = document.getElementById(id); if (m) m.classList.add('open'); };
  window.closeModal = (id) => { const m = document.getElementById(id); if (m) m.classList.remove('open'); };
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
  });

  // ===== CONTACT PAGE FORMS =====
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('lead-name')?.value || 'Friend';
      const intent = document.getElementById('lead-intent')?.value || 'Buyer';
      const nameEl = document.getElementById('conf-lead-name');
      const intentEl = document.getElementById('conf-lead-intent');
      if (nameEl) nameEl.textContent = name;
      if (intentEl) intentEl.textContent = intent;
      openModal('leadModal');
    });
  }

  const showingForm = document.getElementById('showingForm');
  if (showingForm) {
    showingForm.addEventListener('submit', e => {
      e.preventDefault();
      const addr = document.getElementById('showing-address')?.value || 'Property';
      const date = document.getElementById('showing-date')?.value || 'Requested date';
      const time = document.getElementById('showing-time')?.value || 'Requested time';
      const addrEl = document.getElementById('conf-showing-addr');
      const dateEl = document.getElementById('conf-showing-date');
      const timeEl = document.getElementById('conf-showing-time');
      if (addrEl) addrEl.textContent = addr;
      if (dateEl) dateEl.textContent = date;
      if (timeEl) timeEl.textContent = time;
      openModal('showingModal');
    });
  }

  // ===== ACTIVE NAV =====
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });
});
