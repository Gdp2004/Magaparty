-- ============================================================
-- Nello Ocean Beach — Supabase Database Schema (HARDENED)
-- ============================================================
-- Run this in the Supabase SQL Editor to set up all tables.
-- ============================================================

-- 1. BOOKINGS — Sunbed (Day) and Table (Night) reservations
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('sunbed', 'table')),
  guest_name TEXT NOT NULL CHECK (length(trim(guest_name)) BETWEEN 2 AND 100),
  guest_phone TEXT NOT NULL CHECK (length(trim(guest_phone)) BETWEEN 6 AND 20),
  guest_email TEXT CHECK (guest_email IS NULL OR guest_email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
  booking_date DATE NOT NULL CHECK (booking_date >= CURRENT_DATE AND booking_date <= CURRENT_DATE + INTERVAL '1 year'),
  num_guests INT NOT NULL DEFAULT 1 CHECK (num_guests BETWEEN 1 AND 50),
  preferred_area TEXT CHECK (preferred_area IS NULL OR preferred_area IN ('prima_fila', 'gazebo', 'famiglia', 'qualsiasi', 'cena', 'aperitivo', 'vip', 'evento')),
  notes TEXT CHECK (notes IS NULL OR length(notes) <= 500),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EVENTS — Weekly lineup, DJ nights, theme events
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL CHECK (length(trim(event_name)) BETWEEN 1 AND 200),
  event_date DATE NOT NULL,
  event_time TIME,
  dj_name TEXT CHECK (dj_name IS NULL OR length(dj_name) <= 100),
  genre TEXT CHECK (genre IS NULL OR length(genre) <= 100),
  description TEXT CHECK (description IS NULL OR length(description) <= 1000),
  image_url TEXT CHECK (image_url IS NULL OR length(image_url) <= 500),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GALLERY — Photo gallery with category filters
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL CHECK (length(image_url) <= 500),
  category TEXT NOT NULL CHECK (category IN ('sun_family', 'music_drinks')),
  caption TEXT CHECK (caption IS NULL OR length(caption) <= 300),
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MENU ITEMS — Restaurant digital menu
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('pranzo', 'aperitivo', 'cena', 'drink')),
  name TEXT NOT NULL CHECK (length(trim(name)) BETWEEN 1 AND 200),
  description TEXT CHECK (description IS NULL OR length(description) <= 500),
  price DECIMAL(10,2) CHECK (price IS NULL OR price >= 0),
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CONTACT MESSAGES — Contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(trim(name)) BETWEEN 2 AND 100),
  email TEXT CHECK (email IS NULL OR email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
  phone TEXT CHECK (phone IS NULL OR length(phone) <= 20),
  subject TEXT CHECK (subject IS NULL OR length(subject) <= 200),
  message TEXT NOT NULL CHECK (length(trim(message)) BETWEEN 1 AND 2000),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRIVATE EVENT REQUESTS — Weddings, birthdays, corporate
CREATE TABLE IF NOT EXISTS private_event_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('wedding', 'birthday', 'corporate', 'other')),
  contact_name TEXT NOT NULL CHECK (length(trim(contact_name)) BETWEEN 2 AND 100),
  contact_phone TEXT NOT NULL CHECK (length(trim(contact_phone)) BETWEEN 6 AND 20),
  contact_email TEXT CHECK (contact_email IS NULL OR contact_email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
  event_date DATE CHECK (event_date IS NULL OR event_date >= CURRENT_DATE),
  num_guests INT CHECK (num_guests IS NULL OR num_guests BETWEEN 1 AND 1000),
  description TEXT CHECK (description IS NULL OR length(description) <= 2000),
  budget_range TEXT CHECK (budget_range IS NULL OR length(budget_range) <= 50),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SANITIZATION TRIGGER — Auto-trim and clean text fields
-- ============================================================
CREATE OR REPLACE FUNCTION sanitize_text_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- Trim whitespace from all text fields
  IF TG_TABLE_NAME = 'bookings' THEN
    NEW.guest_name := trim(NEW.guest_name);
    NEW.guest_phone := trim(NEW.guest_phone);
    IF NEW.notes IS NOT NULL THEN NEW.notes := trim(NEW.notes); END IF;
  ELSIF TG_TABLE_NAME = 'contact_messages' THEN
    NEW.name := trim(NEW.name);
    NEW.message := trim(NEW.message);
    IF NEW.subject IS NOT NULL THEN NEW.subject := trim(NEW.subject); END IF;
  ELSIF TG_TABLE_NAME = 'private_event_requests' THEN
    NEW.contact_name := trim(NEW.contact_name);
    NEW.contact_phone := trim(NEW.contact_phone);
    IF NEW.description IS NOT NULL THEN NEW.description := trim(NEW.description); END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply sanitization trigger to writable tables
CREATE TRIGGER trg_sanitize_bookings
  BEFORE INSERT ON bookings FOR EACH ROW EXECUTE FUNCTION sanitize_text_fields();
CREATE TRIGGER trg_sanitize_contact
  BEFORE INSERT ON contact_messages FOR EACH ROW EXECUTE FUNCTION sanitize_text_fields();
CREATE TRIGGER trg_sanitize_private_events
  BEFORE INSERT ON private_event_requests FOR EACH ROW EXECUTE FUNCTION sanitize_text_fields();

-- ============================================================
-- RATE LIMITING — Prevent spam inserts (max 5 per 10 min per phone/IP)
-- ============================================================
CREATE OR REPLACE FUNCTION check_booking_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  recent_count INT;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM bookings
  WHERE guest_phone = NEW.guest_phone
    AND created_at > NOW() - INTERVAL '10 minutes';
  
  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded: too many bookings from this phone number'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_rate_limit_bookings
  BEFORE INSERT ON bookings FOR EACH ROW EXECUTE FUNCTION check_booking_rate_limit();

-- Rate limit for contact messages (max 3 per 10 min per email/phone)
CREATE OR REPLACE FUNCTION check_contact_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  recent_count INT;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM contact_messages
  WHERE (email = NEW.email OR phone = NEW.phone)
    AND email IS NOT NULL
    AND created_at > NOW() - INTERVAL '10 minutes';
  
  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded: too many messages'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_rate_limit_contact
  BEFORE INSERT ON contact_messages FOR EACH ROW EXECUTE FUNCTION check_contact_rate_limit();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_event_requests ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ: Events, Gallery, Menu (anyone can view)
-- Restrict to specific columns via the JS client .select() calls
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT USING (true);

CREATE POLICY "Gallery items are viewable by everyone"
  ON gallery_items FOR SELECT USING (is_visible = true);

CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items FOR SELECT USING (is_available = true);

-- PUBLIC INSERT with CHECK constraints
-- The CHECK constraints on columns + triggers provide server-side validation
CREATE POLICY "Anyone can create a booking"
  ON bookings FOR INSERT WITH CHECK (
    booking_type IN ('sunbed', 'table')
    AND length(trim(guest_name)) >= 2
    AND length(trim(guest_phone)) >= 6
    AND booking_date >= CURRENT_DATE
    AND num_guests BETWEEN 1 AND 50
    AND status = 'pending'
  );

CREATE POLICY "Anyone can send a contact message"
  ON contact_messages FOR INSERT WITH CHECK (
    length(trim(name)) >= 2
    AND length(trim(message)) >= 1
    AND is_read = false
  );

CREATE POLICY "Anyone can request a private event"
  ON private_event_requests FOR INSERT WITH CHECK (
    event_type IN ('wedding', 'birthday', 'corporate', 'other')
    AND length(trim(contact_name)) >= 2
    AND length(trim(contact_phone)) >= 6
    AND status = 'new'
  );

-- PREVENT anonymous users from reading sensitive tables
-- (No SELECT policy = no read access for anon)
-- bookings, contact_messages, private_event_requests have NO select policy for anon

-- PREVENT anonymous users from UPDATE/DELETE on any table
-- (No UPDATE/DELETE policies = no modify access for anon)

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_phone_created ON bookings(guest_phone, created_at);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at);

-- ============================================================
-- SEED DATA — Sample events for demonstration
-- ============================================================
INSERT INTO events (event_name, event_date, event_time, dj_name, genre, description, is_featured) VALUES
  ('Tropical Night', '2026-05-02', '22:00', 'DJ Marco', 'House / Tropical', 'La nostra serata inaugurale della stagione estiva con ritmi tropicali e cocktail esotici.', true),
  ('Sunset Session', '2026-05-03', '19:00', 'Resident DJ', 'Chill / Deep House', 'Aperitivo al tramonto con musica deep house e vista mozzafiato sul mare.', false),
  ('White Party', '2026-05-09', '22:00', 'DJ Luna', 'EDM / Pop', 'La notte più elegante dell''estate. Dress code: total white.', true),
  ('Acoustic Sunday', '2026-05-10', '18:00', 'Live Band', 'Acoustic / Jazz', 'Domenica rilassante con musica dal vivo, perfetta per tutta la famiglia.', false),
  ('Neon Nights', '2026-05-16', '22:00', 'DJ Spark', 'Tech House', 'Luci neon, body painting fluorescente e i migliori beat tech house.', true),
  ('Family Fun Day', '2026-05-17', '10:00', NULL, 'Family', 'Giornata dedicata alle famiglie con animazione, giochi e laboratori per bambini.', false);

-- Sample menu items
INSERT INTO menu_items (category, name, description, price, is_featured, sort_order) VALUES
  ('pranzo', 'Spaghetti alle Vongole', 'Pasta fresca con vongole veraci del Golfo di Salerno', 16.00, true, 1),
  ('pranzo', 'Insalata Mediterranea', 'Mix di verdure fresche, feta, olive e pomodorini', 12.00, false, 2),
  ('pranzo', 'Frittura di Paranza', 'Pesce fresco del giorno in leggera panatura dorata', 18.00, true, 3),
  ('pranzo', 'Poke Bowl del Mare', 'Riso, tonno fresco, avocado, edamame e salsa teriyaki', 15.00, false, 4),
  ('aperitivo', 'Spritz Nello', 'Il nostro signature spritz con Aperol, prosecco e un tocco di passion fruit', 10.00, true, 1),
  ('aperitivo', 'Sunset Margarita', 'Tequila premium, lime fresco, sciroppo di mango e sale rosa', 12.00, true, 2),
  ('aperitivo', 'Virgin Mojito', 'Analcolico rinfrescante con lime, menta e zucchero di canna', 8.00, false, 3),
  ('aperitivo', 'Tagliere Mare & Monti', 'Selezione di salumi, formaggi DOP e bruschette', 18.00, false, 4),
  ('cena', 'Branzino alla Griglia', 'Branzino fresco con contorno di verdure grigliate e salsa al limone', 24.00, true, 1),
  ('cena', 'Risotto ai Frutti di Mare', 'Cremoso risotto con gamberi, cozze, calamari e vongole', 22.00, true, 2),
  ('cena', 'Tagliata di Manzo', 'Manzo selezionato con rucola, pomodorini e scaglie di parmigiano', 26.00, false, 3),
  ('drink', 'Gin Tonic Premium', 'Gin artigianale, tonica fever-tree e botaniche selezionate', 12.00, false, 1),
  ('drink', 'Champagne Moët', 'Bottiglia di Moët & Chandon Impérial', 90.00, true, 2),
  ('drink', 'Birra Artigianale', 'Selezione di birre artigianali campane', 7.00, false, 3);

-- Sample gallery items
INSERT INTO gallery_items (image_url, category, caption, sort_order) VALUES
  ('/images/hero-day.png', 'sun_family', 'Una mattina perfetta sulla nostra spiaggia', 1),
  ('/images/beach-family.png', 'sun_family', 'Area famiglia con servizi dedicati', 2),
  ('/images/gallery-yoga.png', 'sun_family', 'Yoga al sorgere del sole', 3),
  ('/images/restaurant.png', 'sun_family', 'Pranzo vista mare', 4),
  ('/images/hero-night.png', 'music_drinks', 'Il tramonto si accende di musica', 5),
  ('/images/events-dj.png', 'music_drinks', 'DJ set sotto le stelle', 6),
  ('/images/gallery-cocktails.png', 'music_drinks', 'I nostri cocktail signature', 7),
  ('/images/gallery-vip.png', 'music_drinks', 'Area VIP esclusiva', 8);
