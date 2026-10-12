-- ============================================================================
-- TOURISM & HOSPITALITY PLATFORM - SUPABASE POSTGRESQL SCHEMA
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users or standalone profiles)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'traveler' CHECK (role IN ('traveler', 'hotel_owner', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. DESTINATIONS
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  state_country TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('beaches', 'hill_stations', 'heritage', 'wildlife', 'spiritual', 'international')),
  tagline TEXT,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  best_season TEXT NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 4.8,
  reviews_count INT DEFAULT 120,
  avg_budget_per_day NUMERIC(10, 2) NOT NULL,
  attractions JSONB DEFAULT '[]'::jsonb,
  travel_tips TEXT[] DEFAULT '{}',
  suggested_itinerary JSONB DEFAULT '[]'::jsonb,
  is_trending BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. HOTELS & HOSPITALITY
CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state_country TEXT NOT NULL,
  address TEXT NOT NULL,
  property_type TEXT NOT NULL DEFAULT 'hotel' CHECK (property_type IN ('hotel', 'resort', 'homestay', 'villa', 'heritage')),
  star_rating INT DEFAULT 4 CHECK (star_rating BETWEEN 1 AND 5),
  user_rating NUMERIC(2, 1) DEFAULT 4.5,
  reviews_count INT DEFAULT 85,
  price_per_night NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  cover_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  policies TEXT[] DEFAULT '{}',
  is_recommended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. HOTEL ROOM TYPES
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  room_type TEXT NOT NULL CHECK (room_type IN ('deluxe', 'super_deluxe', 'suite', 'executive', 'villa')),
  price_per_night NUMERIC(10, 2) NOT NULL,
  max_guests INT DEFAULT 2,
  bed_type TEXT DEFAULT 'King Bed',
  amenities TEXT[] DEFAULT '{}',
  cover_image TEXT,
  available_count INT DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 5. HOLIDAY PACKAGES
CREATE TABLE IF NOT EXISTS holiday_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  duration_days INT NOT NULL,
  duration_nights INT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('honeymoon', 'family', 'adventure', 'luxury', 'weekend')),
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  cover_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  inclusions TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]'::jsonb,
  rating NUMERIC(2, 1) DEFAULT 4.7,
  reviews_count INT DEFAULT 45,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 6. BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_reference TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('flight', 'hotel', 'package', 'bus', 'train', 'cab', 'activity')),
  item_id UUID,
  item_title TEXT NOT NULL,
  item_subtitle TEXT,
  booking_details JSONB NOT NULL,
  traveler_info JSONB NOT NULL,
  base_amount NUMERIC(10, 2) NOT NULL,
  tax_amount NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) DEFAULT 0,
  total_amount NUMERIC(10, 2) NOT NULL,
  coupon_code TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('card', 'upi', 'netbanking')),
  payment_status TEXT NOT NULL DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'failed')),
  payment_transaction_id TEXT NOT NULL,
  booking_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'completed', 'cancelled')),
  cancellation_reason TEXT,
  refund_amount NUMERIC(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 7. REVIEWS & TESTIMONIALS
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  target_type TEXT NOT NULL CHECK (target_type IN ('hotel', 'package', 'destination', 'platform')),
  target_id UUID,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 8. OFFERS & COUPONS
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_percent INT NOT NULL CHECK (discount_percent BETWEEN 1 AND 100),
  max_discount NUMERIC(10, 2),
  min_spend NUMERIC(10, 2) DEFAULT 0,
  service_type TEXT NOT NULL DEFAULT 'all' CHECK (service_type IN ('all', 'flight', 'hotel', 'package', 'cab')),
  valid_until DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 9. PLATFORM SETTINGS
CREATE TABLE IF NOT EXISTS platform_settings (
  id INT PRIMARY KEY DEFAULT 1,
  gst_percent NUMERIC(4, 2) DEFAULT 18.00,
  service_fee_percent NUMERIC(4, 2) DEFAULT 2.50,
  commission_percent NUMERIC(4, 2) DEFAULT 10.00,
  support_email TEXT DEFAULT 'support@wanderyatra.com',
  support_phone TEXT DEFAULT '+91 1800 200 4567',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE holiday_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Public can read destinations, hotels, rooms, packages, coupons, reviews
CREATE POLICY "Public can view destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public can view hotels" ON hotels FOR SELECT USING (true);
CREATE POLICY "Public can view rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Public can view holiday_packages" ON holiday_packages FOR SELECT USING (true);
CREATE POLICY "Public can view active coupons" ON coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public can view platform_settings" ON platform_settings FOR SELECT USING (true);

-- Authenticated users policies
CREATE POLICY "Users can manage their own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can view their own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Hotel owners can manage their own properties
CREATE POLICY "Owners can manage their hotels" ON hotels
  FOR ALL USING (auth.uid() = owner_id);

-- Admins can manage everything (checked via profile role or service role)
CREATE POLICY "Admins full access on destinations" ON destinations
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins full access on hotels" ON hotels
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins full access on bookings" ON bookings
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
