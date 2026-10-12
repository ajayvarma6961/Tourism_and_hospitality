# ✈️ Tourism and Hospitality — Booking Platform

A modern, fully functional **Tourism and Hospitality Booking Platform** inspired by the user experience, search panels, and booking flows of **MakeMyTrip**, redesigned with a unique, premium, luxury visual identity.

---

## 🌟 Key Features

### 1. MakeMyTrip-Inspired Mega Search Engine
- **Multi-Service Booking Tabs**:
  - ✈️ **Flights**: One-way / Round-trip / Multi-city, city autocompletes, travel date picker, passenger & cabin class selector, and special fare chips (Armed Forces, Senior Citizen, Student).
  - 🏨 **Hotels & Stays**: City destination, check-in & check-out dates, room/guest counters, star category, property types (Resort, Heritage Palace, Luxury Hotel, Villa).
  - 🌴 **Holiday Packages**: Destination, travel month, and theme filter (Honeymoon, Family, Adventure, Weekend).
  - 🚆 **Trains (IRCTC Partner)**: Vande Bharat Express, Rajdhani Express, live berth quota simulation (1A, 2A, 3A, CC).
  - 🚌 **Buses**: Volvo Multi-Axle AC sleeper buses, live amenities, boarding points.
  - 🚖 **Cabs**: Intercity outstation & airport transfer booking with Sedans, Innova Crysta SUVs, and EVs.
  - 🏄 **Activities**: Watersports, scuba diving, desert safaris, paragliding, and heritage walking tours.

### 2. Live Dynamic Listings & Filters
- **Airline & Schedule Filters**: Filter by Non-stop / 1 Stop, airlines (IndiGo, Air India, Vistara, Akasa Air, SpiceJet), departure time slots (Morning, Afternoon, Evening), and price range slider.
- **Hotel Filters**: Star category (5★, 4★, 3★), property type (Resorts, Palaces, Homestays), max price slider, and amenity chips.
- **Tour Packages**: Day-by-day expandable itinerary modal, verified hotel stays, private cab transfers, and inclusions/exclusions.

### 3. Dedicated Destination Exploration Guides
- Comprehensive guides for **Goa, Kashmir, Jaipur, Kerala Backwaters, Manali, Varanasi, Dubai, Bali**, and more.
- Best season to visit, estimated daily budgets, top attractions, insider travel tips, 3-day suggested itineraries, and direct booking actions.

### 4. Interactive 3-Step Checkout & E-Ticket Voucher
- **Step 1**: Traveler details form with contact and special requests.
- **Step 2**: Value add-ons (Comprehensive Travel Insurance, Express Airport Cab).
- **Step 3**: Promo code validator with instant discount deduction (e.g., `WANDER20`, `FLYINDIA`, `HOTELSUMMER`, `WELCOME500`).
- **Step 4**: Test payment gateway simulation (UPI with QR code, Credit/Debit card, NetBanking).
- **Instant Confirmed E-Ticket**: Generates official printable travel voucher with barcode, PNR reference ID, and traveler details.

### 5. Multi-Role User Dashboards
- **Traveler Dashboard**: Loyalty Gold status, booking history, travel statistics, saved wishlist destinations, and profile management.
- **My Bookings**: Filter upcoming, completed, or cancelled trips; view printable vouchers; initiate cancellations with instant 85% refund estimation.
- **Hotel Owner Portal (`#/owner`)**:
  - Property statistics (occupancy rate, room tariffs, gross revenue).
  - Add and publish new hotels with amenities and photo galleries.
  - Manage room types and view guest check-in reservations.
- **Administrator Control Panel (`#/admin`)**:
  - Live platform GMV and net commission metrics.
  - Manage all customer bookings.
  - Full CRUD for Destinations, Hotels, Tour Packages, and Promo Codes.
  - Configure financial parameters (GST %, Service Fee %, Owner Commission %).

---

## ⚡ Instant 1-Click Demo Accounts

On the **Login / Sign In** page (`#/login`), 1-click test buttons are provided:
- 👤 **Traveler**: `traveler@wanderyatra.com` / `traveler123`
- 🏨 **Hotel Owner**: `owner@luxuryhotels.com` / `owner123`
- 🛡️ **Administrator**: `admin@wanderyatra.com` / `admin123`

---

## 🗄️ Backend & Supabase Database

The application includes a complete PostgreSQL schema in [`supabase_schema.sql`](file:///Users/s.ajayvarma/ajay1/Tourism_and_hospitality-1/supabase_schema.sql):
- Tables for `profiles`, `destinations`, `hotels`, `rooms`, `holiday_packages`, `bookings`, `reviews`, `coupons`, and `platform_settings`.
- Complete Row Level Security (RLS) policies and seed data.
- **Dual Persistence Architecture**: Works immediately out of the box with browser persistence, and optionally connects to your live Supabase cloud project with custom URL and anon keys entered directly in the UI.

---

## 🚀 Local Run & Render Deployment

### Run Locally
```bash
# Starts Node server on http://localhost:3000
npm start
```
Or open `index.html` directly in your browser.

### Deploy to Render
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Deploy WanderLust Yatra booking platform"
   git push origin main
   ```
2. On [Render](https://dashboard.render.com), choose **New +** > **Static Site**.
3. Select your repository, leave Build Command empty, set Publish Directory to `./`.
4. Click **Create Static Site** — your travel platform is live with free global CDN and SSL!