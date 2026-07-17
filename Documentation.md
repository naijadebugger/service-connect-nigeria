# ServiceConnect — Component Usage Guide

Reference for which shared component (and which variant) each screen in the Figma file uses. Seven components: Button, Input, NavBar, Sidebar, ArtisanCard, Avatar, Badge.

## 1. Button

**Variants:** `primary` (orange) · `navy` · `danger` (red) · `success` (green) · `outline` · `ghost` · `icon`

### primary (orange)
Main call-to-action on a page.
- Post a Job (Customer & Artisan sidebars, most portal pages)
- Book Now / Book Service (Home page, Services Listing, Public Artisan Profile)
- Sign Up (Sign Up page)
- Login (Login page)
- "I want to work" (Role Selection)
- Confirm Booking (Confirm Booking page)
- Accept Job (Incoming Requests)
- Withdraw (Earnings Overview, Artisan Dashboard quick actions)
- Apply Filters (Services Listing sidebar)
- Get Started (Home page bottom CTA)
- Post a Job Request (Search Services — "Can't find what you need" card)

### navy
Secondary action that still needs visual weight.
- Save Changes (Account Settings, Admin System Settings)
- Invite User (Admin User Management)
- Process All Payouts (Admin Financials)
- Contact Artisan (My Bookings, Customer Dashboard active bookings)
- Details (Customer Dashboard active bookings)
- "I want to hire" (Role Selection)
- Quick Book (Search Services artisan cards)
- Upload Photo (Account Settings)
- Call Support Now (Customer Dashboard sidebar widget)

### danger (red)
Destructive/negative action.
- Reject Request (Admin → Artisan Verification)

### success (green)
Affirmative/approval action.
- Approve Artisan (Admin → Artisan Verification)

### outline
Low-emphasis action, usually paired next to a primary/navy button.
- View Profile (Search Services, Services Listing)
- View Details (Service History)
- Cancel (Confirm Booking)
- Reject — the lighter-weight reject on Incoming Requests, distinct from Artisan Verification's solid-red "Reject Request"
- Export Report / Export CSV (Job History, Financials, Booking Management)
- Reply (Ratings & Reviews)
- Remove (Account Settings — profile photo)
- Continue with Google (Login, Sign Up)
- Login (public Navbar, top-right)

### ghost
Text-only, tertiary action.
- Discard (Admin System Settings)
- Load More Reviews (Ratings & Reviews)

### icon
Icon-only, no label.
- Notification bell (every portal Navbar)
- Message/chat icon (Public Artisan Profile, portal Navbar)
- Help "?" icon (portal Navbar)

---

## 2. Input

**Two forms:** labeled field (label + input/textarea + hint/error) and a bare input for search bars.

### Labeled field
- Login (email, password)
- Sign Up (full name, email, phone, password, confirm password)
- Account Settings → Personal Info (full name, email, phone, service address — textarea)
- Confirm Booking → Problem Description (textarea)
- Admin System Settings (Platform Name, Support Email Address)

### Bare input (search bars)
- Portal Navbar search (every logged-in page)
- Home page hero search
- Search Services / Find Expert Artisans search bar
- Admin search & filter bars (User Management, Booking Management, Reviews, Job History)

---

## 3. NavBar

**Two variants:** `public` and `portal`

### public
Logo + nav links + Login/Sign Up.
- Home
- Services Listing
- Public Artisan Profile
- Login
- Sign Up
- Role Selection

### portal
Logo + search + notifications + user avatar.
- Customer: Dashboard, Search Services, My Bookings, Service History, Reviews, Settings
- Artisan: Dashboard, Service Listings, Incoming Requests, Job History, Ratings, Earnings
- Admin: Dashboard, User Management, Artisan Verification, Booking Management, Reviews, Financials, System Settings

---

## 4. Sidebar

Same component, different `navItems` per role.

### Customer portal
Dashboard · Search Services · My Bookings · Service History · Reviews · Settings

### Artisan portal
Dashboard · Service Listings · Incoming Requests · Job History · Ratings · Earnings · Settings

### Admin portal
Dashboard · User Management · Artisan Verification · Booking Management · Reviews · Financials · System Settings

*(Admin sidebar typically hides the "Post a Job" CTA — admins don't post jobs.)*

---

## 5. Avatar

**Two forms:** photo avatar and initials avatar (auto-generated when no photo is on file).

### Photo avatar
- Portal Navbar user menu (every logged-in dashboard)
- Booking cards (My Bookings, Customer Dashboard — Active Bookings)
- Artisan public profile header
- Table rows with a photo on file (Job History, Booking Management)

### Initials avatar
- User Management table rows (e.g. "OA", "NI", "TY")
- Reviews where the reviewer has no photo (e.g. "E", "CN")
- Recent Services / Financials table rows (e.g. "FA", "JE", "SO")

*`status="online"` (presence dot) isn't used in any current screen but is wired up for a future "artisan online now" indicator.*

---

## 6. Badge

**Six tones:** `success` · `warning` · `info` · `error` · `neutral` · `verified`. Use `SCBadgeFromStatus()` for anything that's a known status word — it maps the word to the right tone automatically.

### success (green)
Active, Completed, Published, Approved, Paid, Successful — User Management, Job History, Booking Management, Review Moderation, Earnings transactions

### warning (orange)
Pending, Processing, the "NEW" request-count pill — User Management, Booking Management, Earnings, Incoming Requests

### info (blue)
Scheduled, In Progress, Confirmed — My Bookings, Booking Management

### error (red)
Suspended, Cancelled, Reported, Rejected — User Management, Job History, Review Moderation, Booking Management

### neutral (grey)
Fallback for anything unlisted — service category tags (Plumbing, Electrical, Carpentry, Cleaning) in Financials & Booking Management

### verified
"Verified Pro" tag — Artisan public profile, Search Services artisan cards

> Route the existing hand-rolled "Verified Pro" and "NEW" badges through `SCBadge` instead of custom markup, so they stay visually in sync with every other status pill.

---

## 7. ArtisanCard

**Two layouts:** grid card and booking (row) card.

### Grid card
Portrait card with photo, rating badge, price, and actions.
- Search Services / Find Expert Artisans results grid
- Home page — Featured Artisans section
- Public Services Listing page

### Booking card
Horizontal row with avatar, service info, status badge.
- My Bookings (Active / Pending / History tabs)
- Customer Dashboard — Active Bookings panel


## Screens not covered above (no shared component beyond Navbar/Sidebar)
- Admin Platform Overview / Dashboard (custom stat cards + charts)
- Admin Financials (custom charts + transaction table)
- Admin Review Moderation (custom table)
- Admin Artisan Verification (custom document review panel + the red/green buttons noted above)