# Marcus Chen Real Estate Group — Demo Website

A professional, 6-page real estate demo website for **Marcus Chen Real Estate Group** (Chicago, IL). Built as a static HTML/CSS/JS site showcasing AI-powered lead qualification, automated follow-up sequences, and modern real estate marketing tools.

> **Demo Site** — All credentials, listings, and contact information are fictional and for demonstration purposes only.

---

## Live Features

### AI Lead Qualifier Chatbot — "Alex"
- 24/7 chat widget available on every page
- Real-time lead scoring system (0–100 points) displayed in the chatbot header
- Lead type detection: **Buyer** vs. **Seller** vs. **Investor**
- Score tiers: New Lead → Qualifying → Warm Lead ⭐ → HOT LEAD 🔥
- 20+ contextual responses covering price ranges, neighborhoods, timelines, financing, and more
- Quick-reply buttons for frictionless conversation flow

### 7-Day Lead Follow-Up Sequence
- Triggered automatically on lead form submission (Contact page)
- Displays a personalized 7-step email + SMS nurture timeline:
  - Day 0: Welcome email + matched listings
  - Day 1: Chicago neighborhood guide
  - Day 2: Pre-approval partner intro
  - Day 3: Personal video from Marcus
  - Day 5: New listings matching criteria
  - Day 7: Market report + next steps

### Showing Scheduler
- Booking form with address/MLS#, date, and time inputs
- Confirmation modal with SMS preview
- Available on Listings page and Contact page

### Home Valuation Tool
- Seller-focused property details form
- Triggers a 5-step response timeline modal showing Marcus's pricing process

### Instagram Caption Generator
- Live demo tool on the Listings page
- Input listing address, price, and beds → generates 3 randomized caption variants
- Includes hashtag sets and call-to-action copy

### Mortgage Calculator
- Buyers page includes a real-time payment calculator
- Inputs: home price, down payment %, interest rate, loan term
- Outputs: monthly payment, loan amount, total interest paid

### Weekly AI Market Report
- Email subscription form with neighborhood filter (Contact page)
- Preview of AI-generated Chicago market update email

### Post-Consultation Review Request
- Google review automation modal (Sellers page)
- Triggered after valuation form submission

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, featured listings, AI feature showcase, testimonials, market snapshot |
| Listings | `listings.html` | Listing cards, filter bar, Instagram caption generator, showing scheduler |
| Buyers | `buyers.html` | Buyer guide, mortgage calculator, 7-day follow-up sequence, neighborhood profiles |
| Sellers | `sellers.html` | Seller stats, listing process, home valuation form, marketing suite |
| About | `about.html` | Marcus Chen bio, team roster, certifications, awards |
| Contact | `contact.html` | Lead form → 7-day sequence, showing scheduler, market report signup |

---

## Fake Credentials (Demo Only)

| Field | Value |
|-------|-------|
| Agent Name | Marcus Chen |
| Brokerage | Marcus Chen Real Estate Group |
| Phone | (555) 412-8830 |
| Email | marcus@chengrouprealty.com |
| Address | 400 N Michigan Ave, Suite 1200, Chicago, IL 60601 |
| License | IL RE License #IL-RE-2847391 |
| Experience | 18 years |
| Annual Volume | $45M+ |
| Homes Sold | 600+ |
| Google Reviews | 4.9/5 — 1,800+ reviews |

---

## Team (Fictional)

| Name | Role |
|------|------|
| Sarah Nguyen | Senior Buyer's Agent |
| David Park | Listing Specialist |
| Amanda Torres | Investment Property Advisor |
| James Wilson | First-Time Buyer Specialist |
| Rachel Kim | Luxury Home Expert |
| Tom Bradley | Commercial & Multi-Family |

---

## Design System

| Token | Value |
|-------|-------|
| Primary (Navy) | `#1e3a5f` |
| Accent (Gold) | `#c9a84c` |
| Background (Cream) | `#fdfaf5` |
| Success (Green) | `#16a34a` |
| Heading Font | Playfair Display (Google Fonts) |
| Body Font | Inter (Google Fonts) |
| Icons | Font Awesome 6 |
| Photos | Unsplash (royalty-free) |

---

## File Structure

```
real-estate-site/
├── index.html          # Home
├── listings.html       # Property listings + caption generator
├── buyers.html         # Buyer resources + mortgage calculator
├── sellers.html        # Seller tools + home valuation
├── about.html          # Team + agent bio
├── contact.html        # Lead form + showing scheduler
├── css/
│   └── style.css       # Full responsive stylesheet
├── js/
│   └── main.js         # All interactive features
└── README.md
```

---

## Customization Guide

### Change Agent Info
Edit the top bar and footer across all 6 HTML files. Search for `Marcus Chen` and `(555) 412-8830` to replace with real credentials.

### Update Colors
Edit CSS variables at the top of `css/style.css`:
```css
:root {
  --navy: #1e3a5f;
  --gold: #c9a84c;
  --cream: #fdfaf5;
}
```

### Update Listings
In `listings.html` and `index.html`, replace the Unsplash image URLs and listing details (address, price, beds, baths, sqft) in the listing card HTML.

### Connect Real Integrations
| Feature | Integration Needed |
|---------|-------------------|
| Lead form | EmailJS, Formspree, or backend API |
| SMS alerts | Twilio |
| Chatbot AI | OpenAI GPT-4 API |
| Showing scheduling | Calendly or Google Calendar API |
| Market reports | MLS Data API |
| Instagram captions | OpenAI or Claude API |

---

## Tech Stack

- **HTML5** — Semantic markup, accessible structure
- **CSS3** — Custom properties, CSS Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks, no build tools required
- **Font Awesome 6** — Icon library via CDN
- **Google Fonts** — Playfair Display + Inter via CDN
- **Unsplash** — Royalty-free photography

---

## Deployment

This is a static site — deploy to any static hosting provider:

```bash
# GitHub Pages
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/MSMITH71910/real_estate_demo_site.git
git push -u origin main

# Then enable GitHub Pages in repo Settings → Pages
```

Other options: Netlify (drag & drop), Vercel, Cloudflare Pages.

---

*Built as a demo by Zencoder AI. All names, numbers, and listings are fictional.*
