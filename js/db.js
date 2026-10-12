// ============================================================================
// TOURISM & HOSPITALITY PLATFORM - DATABASE & PERSISTENCE ENGINE
// Supports: Supabase PostgreSQL API + Robust Browser Persistence (Indexed/LocalStorage)
// ============================================================================

const DB_KEYS = {
  PROFILES: 'wy_profiles_v1',
  DESTINATIONS: 'wy_destinations_v1',
  HOTELS: 'wy_hotels_v1',
  ROOMS: 'wy_rooms_v1',
  PACKAGES: 'wy_packages_v1',
  BOOKINGS: 'wy_bookings_v1',
  REVIEWS: 'wy_reviews_v1',
  COUPONS: 'wy_coupons_v1',
  SETTINGS: 'wy_settings_v1',
  SUPABASE_CONFIG: 'wy_supabase_cfg_v1'
};

// ----------------------------------------------------------------------------
// SEED DATA: Destinations
// ----------------------------------------------------------------------------
const SEED_DESTINATIONS = [
  {
    id: "dest-goa",
    name: "Goa",
    state_country: "Goa, India",
    category: "beaches",
    tagline: "Sun, Sand, Serenity & Vibrant Nightlife",
    description: "India's premier beach haven known for sun-drenched golden coastlines, Portuguese heritage architecture, water sports, and tranquil backwaters in South Goa.",
    cover_image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80"
    ],
    best_season: "Nov - Feb",
    rating: 4.8,
    reviews_count: 1420,
    avg_budget_per_day: 3500,
    is_popular: true,
    is_trending: true,
    attractions: [
      { name: "Palolem Beach", type: "Beach", description: "Crescent-shaped pristine beach in South Goa" },
      { name: "Fort Aguada", type: "Heritage", description: "17th-century Portuguese lighthouse and fortress" },
      { name: "Dudhsagar Falls", type: "Nature", description: "Four-tiered waterfall plunging into lush sanctuary" },
      { name: "Basilica of Bom Jesus", type: "Culture", description: "UNESCO World Heritage Baroque landmark" }
    ],
    travel_tips: [
      "Rent a two-wheeler for effortless coastal explorations",
      "South Goa is peaceful and romantic; North Goa is lively and festive",
      "Don't miss authentic Goan Fish Curry Thali and Bebinca dessert"
    ],
    suggested_itinerary: [
      { day: 1, title: "North Goa Heritage & Sunset", details: "Explore Aguada Fort, Vagator cliffs, and sundowner at Anjuna" },
      { day: 2, title: "Water Sports & Latin Quarter", details: "Parasailing at Calangute, followed by Fontainhas heritage walk" },
      { day: 3, title: "South Goa Tranquility", details: "Relax at Palolem Beach, spice plantation tour, and sunset cruise" }
    ]
  },
  {
    id: "dest-kashmir",
    name: "Kashmir Valley",
    state_country: "Jammu & Kashmir, India",
    category: "hill_stations",
    tagline: "Paradise on Earth with Snow-Capped Majesty",
    description: "Mesmerizing Himalayan valley surrounded by snow-draped peaks, floating wooden houseboats on Dal Lake, blooming tulip gardens, and the world's highest gondola in Gulmarg.",
    cover_image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
    ],
    best_season: "Apr - Oct (Spring/Autumn) & Dec - Feb (Snow)",
    rating: 4.9,
    reviews_count: 2150,
    avg_budget_per_day: 4800,
    is_popular: true,
    is_trending: true,
    attractions: [
      { name: "Dal Lake & Shikara", type: "Scenic", description: "Floating gardens and morning flower markets" },
      { name: "Gulmarg Gondola", type: "Adventure", description: "Ski slopes and panoramic Himalayan vistas" },
      { name: "Pahalgam Betaab Valley", type: "Nature", description: "Lush meadows with Lidder river streams" }
    ],
    travel_tips: [
      "Stay at least 1 night in a luxury Dal Lake Houseboat",
      "Book Gulmarg Gondola Phase 2 tickets in advance",
      "Carry thermal wear during winter and comfortable walking shoes"
    ],
    suggested_itinerary: [
      { day: 1, title: "Srinagar Arrival & Shikara", details: "Check into houseboat, sunset Shikara ride on Dal Lake" },
      { day: 2, title: "Gulmarg Alpine Magic", details: "Gondola cable car ride to Apharwat peak, snow activities" },
      { day: 3, title: "Pahalgam Valley of Shepherds", details: "Drive through saffron fields, visit Aru & Betaab valleys" }
    ]
  },
  {
    id: "dest-jaipur",
    name: "Jaipur",
    state_country: "Rajasthan, India",
    category: "heritage",
    tagline: "The Pink City of Palaces, Forts & Royal Glamour",
    description: "Capital of Rajasthan famous for majestic hillforts, terracotta-pink architecture, bustling bazaars filled with gemstone jewelry, and opulent royal residences.",
    cover_image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    ],
    best_season: "Oct - Mar",
    rating: 4.7,
    reviews_count: 1890,
    avg_budget_per_day: 3200,
    is_popular: true,
    is_trending: false,
    attractions: [
      { name: "Amber Palace & Fort", type: "Heritage", description: "Hilltop palace with Sheesh Mahal mirror work" },
      { name: "Hawa Mahal", type: "Architecture", description: "Palace of Winds with 953 ornate jharokha windows" },
      { name: "City Palace", type: "Museum", description: "Royal courtyard blending Rajput and Mughal design" }
    ],
    travel_tips: [
      "Visit Amber Fort early morning or attend the evening sound and light show",
      "Try authentic Dal Baati Churma and Pyaaz Kachori",
      "Bargain politely in Johari Bazaar and Bapu Bazaar"
    ],
    suggested_itinerary: [
      { day: 1, title: "Royal Heart of Jaipur", details: "City Palace, Jantar Mantar, photo stop at Hawa Mahal" },
      { day: 2, title: "Mighty Hillforts", details: "Amber Fort elephant ride/jeep, Jaigarh fort, sunset at Nahargarh" },
      { day: 3, title: "Art, Craft & Bazaars", details: "Albert Hall Museum, block printing workshop, bazaar shopping" }
    ]
  },
  {
    id: "dest-kerala",
    name: "Kerala Backwaters & Munnar",
    state_country: "Kerala, India",
    category: "nature",
    tagline: "God's Own Country of Emerald Waters & Tea Hills",
    description: "Serene network of interconnected canals, palm-fringed lagoons, traditional Kettuvallam houseboats, and misty tea plantations in Munnar.",
    cover_image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
    ],
    best_season: "Sep - Mar",
    rating: 4.9,
    reviews_count: 2300,
    avg_budget_per_day: 4000,
    is_popular: true,
    is_trending: true,
    attractions: [
      { name: "Alleppey Houseboat Cruise", type: "Experience", description: "Glide through tranquil canals and paddy fields" },
      { name: "Munnar Tea Estates", type: "Nature", description: "Endless rolling green tea hills and spice valleys" },
      { name: "Periyar Wildlife Sanctuary", type: "Wildlife", description: "Elephant boat safari in Thekkady lake" }
    ],
    travel_tips: [
      "Book an overnight private AC houseboat in Alleppey or Kumarakom",
      "Experience a traditional Ayurvedic massage in Kumarakom",
      "Carry warm cardigans for Munnar's chilly evenings"
    ],
    suggested_itinerary: [
      { day: 1, title: "Kochi to Munnar", details: "Scenic drive past Cheeyappara waterfalls, tea factory tour" },
      { day: 2, title: "Munnar Nature Exploration", details: "Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam" },
      { day: 3, title: "Alleppey Backwater Magic", details: "Board traditional houseboat with freshly prepared Kerala sadhya" }
    ]
  },
  {
    id: "dest-manali",
    name: "Manali & Solang",
    state_country: "Himachal Pradesh, India",
    category: "hill_stations",
    tagline: "Adventure & Serenity Amidst Cedar Forests",
    description: "Nestled in the Beas River valley, Manali offers adrenaline-pumping skiing, paragliding, snow trails at Atal Tunnel, and peaceful Tibetan monasteries.",
    cover_image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
    ],
    best_season: "May - Jun & Dec - Feb (Snow)",
    rating: 4.7,
    reviews_count: 1750,
    avg_budget_per_day: 3000,
    is_popular: true,
    is_trending: true,
    attractions: [
      { name: "Solang Valley", type: "Adventure", description: "Paragliding, zorbing, and quad biking hub" },
      { name: "Atal Tunnel & Sissu", type: "Scenic", description: "Engineering wonder leading to Lahaul valley" },
      { name: "Hadimba Temple", type: "Heritage", description: "Pagoda-style wooden shrine in cedar woods" }
    ],
    travel_tips: [
      "Check weather and road status before planning Atal Tunnel / Sissu day trip",
      "Old Manali has charming cafes with live music and continental food"
    ],
    suggested_itinerary: [
      { day: 1, title: "Local Manali Sights", details: "Hadimba Temple, Vashisht hot springs, Mall Road stroll" },
      { day: 2, title: "Solang & Atal Tunnel", details: "Adventure sports in Solang, drive to snowy Sissu waterfall" },
      { day: 3, title: "Naggar Castle & Old Manali", details: "Naggar wooden castle, Nicholas Roerich gallery, cafe hopping" }
    ]
  },
  {
    id: "dest-varanasi",
    name: "Varanasi",
    state_country: "Uttar Pradesh, India",
    category: "spiritual",
    tagline: "The World's Oldest Living Spiritual City",
    description: "Situated on the banks of sacred Ganges, Varanasi is a soul-stirring mosaic of ancient ghats, evocative evening Ganga Aarti, and narrow labyrinthine alleys.",
    cover_image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"],
    best_season: "Oct - Mar",
    rating: 4.8,
    reviews_count: 1640,
    avg_budget_per_day: 2200,
    is_popular: true,
    is_trending: false,
    attractions: [
      { name: "Dashashwamedh Ghat", type: "Spiritual", description: "Spectacular evening Ganga Aarti ceremony" },
      { name: "Kashi Vishwanath Corridor", type: "Spiritual", description: "Ancient Golden Temple dedicated to Lord Shiva" },
      { name: "Sarnath", type: "Heritage", description: "Where Lord Buddha gave his first sermon" }
    ],
    travel_tips: ["Take a sunrise rowboat ride across the Ghats for mystical photography"],
    suggested_itinerary: [
      { day: 1, title: "Arrival & Grand Aarti", details: "Check in, stroll along Ghats, witness Dashashwamedh Aarti" },
      { day: 2, title: "Sunrise Boat & Sarnath", details: "Sunrise boat ride, Kashi Vishwanath temple, excursion to Sarnath" }
    ]
  },
  {
    id: "dest-dubai",
    name: "Dubai",
    state_country: "United Arab Emirates",
    category: "international",
    tagline: "Futuristic Megacity of Luxury & Wonder",
    description: "A dazzling desert metropolis known for sky-piercing skyscrapers like Burj Khalifa, palm-shaped artificial archipelagos, desert dune safaris, and luxury retail.",
    cover_image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"],
    best_season: "Nov - Apr",
    rating: 4.9,
    reviews_count: 3100,
    avg_budget_per_day: 12000,
    is_popular: true,
    is_trending: true,
    attractions: [
      { name: "Burj Khalifa", type: "Landmark", description: "World's tallest building with observation deck" },
      { name: "Desert Safari & BBQ", type: "Adventure", description: "Dune bashing, camel rides, and Arabic entertainment" },
      { name: "Dubai Marina & Yacht", type: "Luxury", description: "Gleaming waterfront promenade and dining" }
    ],
    travel_tips: ["Pre-book Burj Khalifa sunset slots at Level 124/125 for prime views"],
    suggested_itinerary: [
      { day: 1, title: "Modern Icons", details: "Dubai Mall, Dubai Fountain show, Burj Khalifa observation deck" },
      { day: 2, title: "Desert Adventure", details: "Morning Gold Souk, afternoon 4x4 desert safari with bedouin dinner" },
      { day: 3, title: "Palm Jumeirah & Marina", details: "View at the Palm, Atlantis Aquaventure, Marina luxury cruise" }
    ]
  },
  {
    id: "dest-bali",
    name: "Bali",
    state_country: "Indonesia",
    category: "international",
    tagline: "Island of the Gods, Temples & Emerald Rice Terraces",
    description: "Tropical Indonesian paradise blending spiritual Hindu culture, cliffside Uluwatu sunset temples, Ubud artisan crafts, and world-class surf breaks.",
    cover_image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"],
    best_season: "Apr - Oct",
    rating: 4.9,
    reviews_count: 2890,
    avg_budget_per_day: 6500,
    is_popular: true,
    is_trending: true,
    attractions: [
      { name: "Tegallalang Rice Terraces", type: "Nature", description: "Scenic layered green paddies in Ubud" },
      { name: "Uluwatu Cliff Temple", type: "Culture", description: "Perched 70m above Indian Ocean with Kecak fire dance" },
      { name: "Seminyak Beach Clubs", type: "Lifestyle", description: "World-class beachfront lounges and sunsets" }
    ],
    travel_tips: ["Split your stay: 3 nights in Ubud for nature and 3 nights in Seminyak/Canggu for beaches"],
    suggested_itinerary: [
      { day: 1, title: "Cultural Ubud", details: "Monkey Forest sanctuary, Tegallalang swing, Ubud Palace" },
      { day: 2, title: "Temples & Waterfalls", details: "Ulun Danu Beratan water temple, Tegenungan waterfall" },
      { day: 3, title: "South Bali Coastal", details: "Padang Padang beach, Uluwatu cliff sunset and Kecak dance" }
    ]
  },
  {
    id: "dest-udaipur",
    name: "Udaipur",
    state_country: "Rajasthan, India",
    category: "heritage",
    tagline: "The Romantic City of Lakes & Royal Palaces",
    description: "Surrounded by the Aravalli hills, Udaipur is celebrated for Lake Pichola, floating white marble palaces, Mewar royalty, and glowing twilight boat rides.",
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    best_season: "Sep - Mar",
    rating: 4.9,
    reviews_count: 2200,
    avg_budget_per_day: 4200,
    is_popular: true,
    is_trending: true,
    attractions: [
      { name: "City Palace Complex", type: "Heritage", description: "Vast royal complex overlooking Lake Pichola" },
      { name: "Lake Pichola Boat Cruise", type: "Experience", description: "Sunset cruise past Jag Mandir and Lake Palace" },
      { name: "Saheliyon-ki-Bari", type: "Nature", description: "Ornate fountains and royal lotus courtyards" }
    ],
    travel_tips: [
      "Book a sunset dinner at an Ambrai or Lake Pichola rooftop for unforgettable vistas",
      "Visit Vintage Car Museum and bagru block prints in local havelis"
    ],
    suggested_itinerary: [
      { day: 1, title: "Royal Mewar Heritage", details: "City Palace tour, crystal gallery, sunset Pichola boat ride" },
      { day: 2, title: "Lakes & Monsoon Palace", details: "Fateh Sagar lake stroll, Saheliyon-ki-Bari, Sajjangarh sunset" },
      { day: 3, title: "Art, Temples & Dining", details: "Jagdish Temple, Bagore Ki Haveli Dharohar folk dance" }
    ]
  },
  {
    id: "dest-delhi",
    name: "New Delhi",
    state_country: "Delhi NCR, India",
    category: "heritage",
    tagline: "Historic Capital of Emperors, Culture & Culinary Delights",
    description: "India's vibrant capital blending Mughal masterpieces like Humayun's Tomb with wide tree-lined Lutyens avenues, bustling bazaars, and world-class luxury stays.",
    cover_image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    best_season: "Oct - Mar",
    rating: 4.7,
    reviews_count: 3100,
    avg_budget_per_day: 3800,
    is_popular: true,
    is_trending: false,
    attractions: [
      { name: "Qutub Minar & Mehrauli", type: "Heritage", description: "UNESCO minaret dating back to 1192" },
      { name: "Humayun's Tomb", type: "Heritage", description: "Inspiration for Taj Mahal surrounded by Mughal gardens" },
      { name: "India Gate & Kartavya Path", type: "Landmark", description: "Ceremonial boulevard and war memorial" }
    ],
    travel_tips: [
      "Take Delhi Metro for fast, air-conditioned transit across city landmarks",
      "Savor authentic street food in Chandni Chowk and fine dining in Chanakyapuri"
    ],
    suggested_itinerary: [
      { day: 1, title: "Mughal Glory & Chandni Chowk", details: "Red Fort, Jama Masjid, heritage food walk" },
      { day: 2, title: "Lutyens Delhi & Monuments", details: "Humayun's Tomb, Qutub Minar, sunset at India Gate" }
    ]
  },
  {
    id: "dest-mumbai",
    name: "Mumbai",
    state_country: "Maharashtra, India",
    category: "beaches",
    tagline: "The City of Dreams, Marine Drive & Arabian Sea Glow",
    description: "Maximum City pulsing with coastal vitality, Gothic Victorian architecture, Bollywood glamour, and the iconic Queen's Necklace arc along the Arabian Sea.",
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    best_season: "Nov - Feb",
    rating: 4.8,
    reviews_count: 3450,
    avg_budget_per_day: 4500,
    is_popular: true,
    is_trending: true,
    attractions: [
      { name: "Gateway of India", type: "Landmark", description: "Historic waterfront arch overlooking harbor" },
      { name: "Marine Drive & Nariman Point", type: "Scenic", description: "3.6 km seaside promenade known as Queen's Necklace" },
      { name: "Elephanta Caves", type: "Heritage", description: "Rock-cut Shiva temple caves on island ferry" }
    ],
    travel_tips: [
      "Take an evening stroll along Marine Drive during sunset",
      "Explore Kala Ghoda art district and Irani cafes in Colaba"
    ],
    suggested_itinerary: [
      { day: 1, title: "South Mumbai Heritage", details: "Gateway of India, Colaba Causeway, Marine Drive sundown" },
      { day: 2, title: "Island Ferry & Bandra", details: "Elephanta Caves boat tour, Bandra Bandstand and Bandra Fort" }
    ]
  }
];

// ----------------------------------------------------------------------------
// SEED DATA: Hotels across all popular destinations & places
// ----------------------------------------------------------------------------
const SEED_HOTELS = [
  // --- UDAIPUR ---
  {
    id: "hotel-taj-lake-palace",
    name: "Taj Lake Palace",
    city: "Udaipur",
    state_country: "Rajasthan, India",
    address: "Lake Pichola, Udaipur, Rajasthan 313001",
    property_type: "heritage",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 640,
    price_per_night: 28500,
    original_price: 36000,
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Lake View", "Swimming Pool", "Jiva Spa", "Free WiFi", "Royal Dining", "Butler Service", "Airport Shuttle"],
    description: "An 18th-century royal floating palace carved in gleaming white marble, sitting majestically on the turquoise waters of Lake Pichola with peerless hospitality.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM", "Free cancellation up to 48 hours prior"],
    is_recommended: true,
    rooms: [
      { id: "room-tlp-1", name: "Luxury Lake View Room", type: "deluxe", price_per_night: 28500, max_guests: 2, bed_type: "1 King Bed" },
      { id: "room-tlp-2", name: "Palace Historical Suite", type: "suite", price_per_night: 45000, max_guests: 3, bed_type: "1 Royal King Bed" },
      { id: "room-tlp-3", name: "Grand Royal Presidential Suite", type: "villa", price_per_night: 85000, max_guests: 4, bed_type: "2 King Beds" }
    ]
  },
  {
    id: "hotel-oberoi-udaivilas",
    name: "The Oberoi Udaivilas",
    city: "Udaipur",
    state_country: "Rajasthan, India",
    address: "Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur 313001",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 820,
    price_per_night: 32000,
    original_price: 40000,
    cover_image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Semi-Private Pool Access", "Peacock Gardens", "Luxury Spa", "Lake Boat Transfers", "Fine Dining"],
    description: "Spread over 50 acres on the banks of Lake Pichola, featuring grand domes, hand-painted frescoes, and reflection pools.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-ou-1", name: "Premier Room with Semi-Private Pool", type: "deluxe", price_per_night: 32000, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- GOA ---
  {
    id: "hotel-alila-diwa-goa",
    name: "Alila Diwa Goa - Hyatt Resort",
    city: "Goa",
    state_country: "Goa, India",
    address: "48/10 Adao Waddo, Majorda, South Goa 403713",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.8,
    reviews_count: 520,
    price_per_night: 13500,
    original_price: 18000,
    cover_image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Infinity Pool", "Paddy Field View", "Private Beach Shuttle", "Ayurvedic Spa", "Kids Club", "Fine Dining"],
    description: "Nestled amidst lush emerald paddy fields in South Goa, blending contemporary Goan architecture with infinity pools and open courtyards.",
    policies: ["Check-in: 3:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-adg-1", name: "Terrace Room with Paddy View", type: "deluxe", price_per_night: 13500, max_guests: 2, bed_type: "King Bed" },
      { id: "room-adg-2", name: "Diwa Club Suite with Private Balcony", type: "suite", price_per_night: 21000, max_guests: 3, bed_type: "King Bed + Sofa" }
    ]
  },
  {
    id: "hotel-taj-exotica-goa",
    name: "Taj Exotica Resort & Spa Goa",
    city: "Goa",
    state_country: "Goa, India",
    address: "Calwaddo, Benaulim, South Goa 403716",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 910,
    price_per_night: 18500,
    original_price: 24000,
    cover_image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Direct Beachfront", "Golf Course", "Jiva Spa", "Free WiFi", "Tennis Courts", "Multi-Cuisine Restaurants"],
    description: "Spread across 56 acres of manicured gardens along Benaulim Beach, offering Mediterranean villas and private plunge pool rooms.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-teg-1", name: "Premium Sea View Villa", type: "villa", price_per_night: 18500, max_guests: 2, bed_type: "King Bed" }
    ]
  },
  {
    id: "hotel-w-goa",
    name: "W Goa Beach Resort",
    city: "Goa",
    state_country: "Goa, India",
    address: "Vagator Beach, Bardez, North Goa 403509",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.7,
    reviews_count: 670,
    price_per_night: 16000,
    original_price: 21000,
    cover_image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Rock Pool Sunset Lounge", "Vagator Beach Walk", "AWAY Spa", "Free High-Speed WiFi", "Fitness Center"],
    description: "High-energy beachfront luxury overlooking Chapora Fort and Vagator cliffs, famous for dramatic sunset sessions and vibrant nightlife.",
    policies: ["Check-in: 3:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-wg-1", name: "Fabulous Villa Room", type: "deluxe", price_per_night: 16000, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- JAIPUR ---
  {
    id: "hotel-rambagh-palace",
    name: "Rambagh Palace - The Jewel of Jaipur",
    city: "Jaipur",
    state_country: "Rajasthan, India",
    address: "Bhawani Singh Road, Rambagh, Jaipur 302005",
    property_type: "heritage",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 1250,
    price_per_night: 35000,
    original_price: 45000,
    cover_image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Former Royal Residence", "Peacock Gardens", "Jiva Grande Spa", "Suvarna Mahal Royal Dining", "Indoor & Outdoor Pools"],
    description: "Former residence of the Maharaja of Jaipur, ranked among the finest luxury heritage palace hotels in the world.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-rbp-1", name: "Palace Room with Garden View", type: "deluxe", price_per_night: 35000, max_guests: 2, bed_type: "Maharaja King Bed" },
      { id: "room-rbp-2", name: "Historical Royal Suite", type: "suite", price_per_night: 60000, max_guests: 3, bed_type: "King Bed" }
    ]
  },
  {
    id: "hotel-itc-rajputana",
    name: "ITC Rajputana, A Luxury Collection Hotel",
    city: "Jaipur",
    state_country: "Rajasthan, India",
    address: "Palace Road, Gopalbari, Jaipur 302006",
    property_type: "hotel",
    star_rating: 5,
    user_rating: 4.8,
    reviews_count: 780,
    price_per_night: 11500,
    original_price: 15500,
    cover_image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Courtyard Swimming Pool", "Kaya Kalp Spa", "Peshawri Restaurant", "Free WiFi", "Royal Architecture"],
    description: "Inspired by the grand havelis of Rajasthan with central water bodies, marble courtyards, and signature North-West frontier cuisine.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-itc-1", name: "Rajputana Chamber", type: "deluxe", price_per_night: 11500, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- KASHMIR ---
  {
    id: "hotel-khyber-gulmarg",
    name: "The Khyber Himalayan Resort & Spa",
    city: "Kashmir",
    state_country: "Jammu & Kashmir, India",
    address: "Gulmarg Highlands, Gulmarg, Kashmir 193403",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 890,
    price_per_night: 24000,
    original_price: 31000,
    cover_image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Heated Indoor Pool", "Mountain View", "L'Occitane Spa", "Ski-in Ski-out", "Fine Dining", "Central Heating"],
    description: "Perched 8,825 feet above sea level amidst majestic Pir Panjal range, offering sweeping vistas of Apharwat peaks and snow-clad pine forests.",
    policies: ["Check-in: 2:00 PM", "Check-out: 11:00 AM"],
    is_recommended: true,
    rooms: [
      { id: "room-khy-1", name: "Premier Mountain View Room", type: "deluxe", price_per_night: 24000, max_guests: 2, bed_type: "King Bed" },
      { id: "room-khy-2", name: "Luxury Himalayan Pine Suite", type: "suite", price_per_night: 38000, max_guests: 3, bed_type: "King Bed" }
    ]
  },
  {
    id: "hotel-welcomhotel-pahalgam",
    name: "Welcomhotel Pine N Peak Pahalgam",
    city: "Kashmir",
    state_country: "Jammu & Kashmir, India",
    address: "Aru Road, Pahalgam, Kashmir 192126",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.8,
    reviews_count: 540,
    price_per_night: 18000,
    original_price: 23000,
    cover_image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Lidder River View", "Centralized Heating", "Lawn Bonfire", "Kashmiri Wazwan Dining", "Spa Sanctuary"],
    description: "Set atop Rajwas plateau overlooking pine-draped Lidder river valley, providing serenity and alpine mountain warmth.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-pnp-1", name: "Valley View Deluxe Room", type: "deluxe", price_per_night: 18000, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- MANALI ---
  {
    id: "hotel-wildflower-hall",
    name: "Wildflower Hall, An Oberoi Resort",
    city: "Manali",
    state_country: "Himachal Pradesh, India",
    address: "Chharabra, Shimla & Manali Hills, Himachal 171012",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 670,
    price_per_night: 26000,
    original_price: 34000,
    cover_image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Outdoor Heated Jacuzzi", "Himalayan Cedar Woods", "Indoor Heated Pool", "Forest Spa", "Fine Dining"],
    description: "Former colonial residence set in 23 acres of protected cedar forest with breathtaking views over the snow-covered Himalayan peaks.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-wfh-1", name: "Premier Mountain View Room", type: "deluxe", price_per_night: 26000, max_guests: 2, bed_type: "King Bed" }
    ]
  },
  {
    id: "hotel-the-himalayan-manali",
    name: "The Himalayan Luxury Castle & Resort",
    city: "Manali",
    state_country: "Himachal Pradesh, India",
    address: "Hadimba Road, Manali, Himachal Pradesh 175131",
    property_type: "heritage",
    star_rating: 5,
    user_rating: 4.8,
    reviews_count: 430,
    price_per_night: 14500,
    original_price: 19000,
    cover_image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Victorian Gothic Castle", "Apple Orchard", "Fireplace in Rooms", "Mountain Pool", "Fine Dining"],
    description: "Built in Victorian Gothic style amidst apple orchards with antique furnishings, cast-iron fireplaces, and private stone cottages.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-thm-1", name: "Castle Grand Chamber", type: "deluxe", price_per_night: 14500, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- KERALA ---
  {
    id: "hotel-kumarakom-lake-resort",
    name: "Kumarakom Lake Resort",
    city: "Kerala",
    state_country: "Kerala, India",
    address: "Vembanad Lake, Kumarakom, Kerala 686566",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.8,
    reviews_count: 730,
    price_per_night: 19500,
    original_price: 25000,
    cover_image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Meandering Pool Access", "Vembanad Lake View", "Ayurvedic Sanctuary", "Sunset Cruise", "Seafood Bar"],
    description: "Heritage luxury resort alongside Vembanad Lake, featuring authentic reconstructed 16th-century traditional Kerala homesteads.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-klr-1", name: "Heritage Villa with Private Courtyard", type: "villa", price_per_night: 19500, max_guests: 2, bed_type: "Traditional Teak King Bed" }
    ]
  },
  {
    id: "hotel-elixir-hills-munnar",
    name: "Elixir Hills Suites Resort Munnar",
    city: "Kerala",
    state_country: "Kerala, India",
    address: "Near Letchmi Tea Estate, Munnar, Kerala 685565",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.8,
    reviews_count: 510,
    price_per_night: 12500,
    original_price: 16500,
    cover_image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Infinity Mist Pool", "Dense Rainforest View", "Spa & Wellness", "Tea Plantation Walk", "Kids Activity Zone"],
    description: "Perched amidst Munnar's rolling cardamom hills and mist-draped tea estates, featuring panoramic floor-to-ceiling glass suites.",
    policies: ["Check-in: 2:00 PM", "Check-out: 11:00 AM"],
    is_recommended: true,
    rooms: [
      { id: "room-ehm-1", name: "Valley View Luxury Suite", type: "suite", price_per_night: 12500, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- VARANASI ---
  {
    id: "hotel-brijrama-palace",
    name: "BrijRama Palace Heritage Hotel",
    city: "Varanasi",
    state_country: "Uttar Pradesh, India",
    address: "Darbhanga Ghat, Dashashwamedh, Varanasi 221001",
    property_type: "heritage",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 610,
    price_per_night: 22000,
    original_price: 29000,
    cover_image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Ganga Riverfront", "Historic 18th Century Palace", "Pure Vegetarian Royal Dining", "Private Boat Ghat Pickup", "Live Classical Music"],
    description: "One of the oldest landmarks on the Ganges, accessible by royal boat, offering front-row vistas of the spiritual morning and evening Ganga Aarti.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-brp-1", name: "Nadidhara River View Chamber", type: "deluxe", price_per_night: 22000, max_guests: 2, bed_type: "Royal King Bed" }
    ]
  },

  // --- NEW DELHI ---
  {
    id: "hotel-leela-palace-delhi",
    name: "The Leela Palace New Delhi",
    city: "New Delhi",
    state_country: "Delhi NCR, India",
    address: "Diplomatic Enclave, Chanakyapuri, New Delhi 110023",
    property_type: "hotel",
    star_rating: 5,
    user_rating: 4.8,
    reviews_count: 1100,
    price_per_night: 17500,
    original_price: 22000,
    cover_image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Rooftop Pool", "ESPA Spa", "Michelin-starred Le Cirque", "Free WiFi", "Fitness Center"],
    description: "An architectural marvel influenced by Lutyens' design, adorned with silver leafing, Murano crystal chandeliers, and grand hand-woven tapestries.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-lld-1", name: "Grand Deluxe Room", type: "deluxe", price_per_night: 17500, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- MUMBAI ---
  {
    id: "hotel-taj-mahal-mumbai",
    name: "The Taj Mahal Palace Mumbai",
    city: "Mumbai",
    state_country: "Maharashtra, India",
    address: "Apollo Bunder, Colaba, Mumbai 400001",
    property_type: "heritage",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 2400,
    price_per_night: 27000,
    original_price: 35000,
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Gateway of India View", "Arabian Sea Panorama", "Jiva Spa", "10 Iconic Restaurants", "Swimming Pool"],
    description: "Legendary 1903 flagship landmark overlooking Gateway of India, welcoming world royalty, heads of state, and discerning travelers for over a century.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-tpm-1", name: "Palace Wing Sea View Room", type: "deluxe", price_per_night: 27000, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- DUBAI ---
  {
    id: "hotel-atlantis-royal",
    name: "Atlantis The Royal Dubai",
    city: "Dubai",
    state_country: "United Arab Emirates",
    address: "Crescent Rd, Palm Jumeirah, Dubai",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 1450,
    price_per_night: 48000,
    original_price: 60000,
    cover_image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Cloud 22 Sky Pool", "Private Beach", "Celebrity Chef Dining", "Aquaventure Access", "Luxury Spa"],
    description: "An ultra-luxury architectural icon on Palm Jumeirah, offering 90 swimming pools, dramatic fire-meets-water fountains, and royal suites.",
    policies: ["Check-in: 3:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-atr-1", name: "Palm Scape Luxury Room", type: "deluxe", price_per_night: 48000, max_guests: 2, bed_type: "King Bed" }
    ]
  },

  // --- BALI ---
  {
    id: "hotel-four-seasons-sayan",
    name: "Four Seasons Resort Bali at Sayan",
    city: "Bali",
    state_country: "Indonesia",
    address: "Sayan, Ubud, Gianyar, Bali 80571",
    property_type: "resort",
    star_rating: 5,
    user_rating: 4.9,
    reviews_count: 870,
    price_per_night: 38000,
    original_price: 49000,
    cover_image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"],
    amenities: ["Ayung River View", "Suspended Lotus Pond", "Sacred River Spa", "Private Plunge Pool", "Yoga Shala"],
    description: "Architectural masterpiece immersed in Ubud's lush jungle valley, entered across a dramatic suspension bridge over an emerald lotus pond.",
    policies: ["Check-in: 2:00 PM", "Check-out: 12:00 PM"],
    is_recommended: true,
    rooms: [
      { id: "room-fss-1", name: "One-Bedroom Riverfront Pool Villa", type: "villa", price_per_night: 38000, max_guests: 2, bed_type: "King Bed" }
    ]
  }
];

// ----------------------------------------------------------------------------
// SEED DATA: Holiday Packages
// ----------------------------------------------------------------------------
const SEED_PACKAGES = [
  {
    id: "pkg-kashmir-heaven",
    title: "Mesmerizing Kashmir: Srinagar, Gulmarg & Pahalgam",
    destination: "Kashmir",
    duration_days: 6,
    duration_nights: 5,
    category: "honeymoon",
    price: 24999,
    original_price: 34999,
    cover_image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    highlights: ["1 Night Luxury Houseboat on Dal Lake", "Gulmarg Gondola Cable Car Ride", "Pahalgam Betaab & Aru Valleys", "All Transfers in Private Sedan"],
    inclusions: ["Breakfast & Dinner Daily", "Private Cab for Sightseeing", "Shikara Ride on Dal Lake", "Toll, Parking, Driver Allowance"],
    exclusions: ["Airfare", "Gondola Phase 2 Tickets", "Pony/Horse Rides", "Personal Expenses"],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar & Dal Lake Shikara", activities: "Welcome drink at Houseboat, 1-hour sunset Shikara ride, authentic Kashmiri dinner" },
      { day: 2, title: "Srinagar to Gulmarg Day Trip", activities: "Drive through pine groves, ride Gulmarg Gondola up to snow line, evening return" },
      { day: 3, title: "Srinagar to Pahalgam (Valley of Shepherds)", activities: "Visit Avantipur ruins and saffron fields en route, check-in to Riverside hotel" },
      { day: 4, title: "Explore Betaab & Chandanwari", activities: "Excursion to pristine valleys, stroll along Lidder river, local market shopping" },
      { day: 5, title: "Pahalgam to Srinagar Mughal Gardens", activities: "Visit Shalimar Bagh, Nishat Bagh, and Shankaracharya Temple hilltop" },
      { day: 6, title: "Departure with Sweet Memories", activities: "Morning dry fruit shopping, transfer to Srinagar International Airport" }
    ],
    rating: 4.9,
    reviews_count: 320,
    is_featured: true
  },
  {
    id: "pkg-kerala-backwaters",
    title: "Kerala Bliss: Munnar Tea Hills & Alleppey Houseboat",
    destination: "Kerala",
    duration_days: 5,
    duration_nights: 4,
    category: "family",
    price: 19999,
    original_price: 27999,
    cover_image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    highlights: ["2 Nights in Misty Munnar Hills", "1 Night Alleppey AC Deluxe Houseboat", "Spice Plantation Tour & Tea Museum", "Cheeyappara Waterfalls"],
    inclusions: ["All Meals on Houseboat", "Daily Breakfast at Munnar Hotel", "Private AC Cab for 5 Days", "GST & State Permits"],
    exclusions: ["Train / Flight Tickets", "Ayurvedic Spa Packages", "Entry fees at National Parks"],
    itinerary: [
      { day: 1, title: "Kochi to Munnar via Waterfalls", activities: "Pick up at Cochin Airport, drive past rubber and tea plantations, check-in to Munnar resort" },
      { day: 2, title: "Munnar Sightseeing Tour", activities: "Visit Eravikulam National Park, Mattupetty Dam, Echo Point and Tata Tea Museum" },
      { day: 3, title: "Munnar to Thekkady Spice Sanctuary", activities: "Periyar Wildlife boat safari, spice garden guided tour, evening Kathakali show" },
      { day: 4, title: "Thekkady to Alleppey Houseboat", activities: "Board traditional wooden houseboat at 12 PM, cruise scenic backwaters, overnight stay" },
      { day: 5, title: "Departure from Cochin", activities: "Checkout after breakfast, sightseeing in Fort Kochi (Chinese Fishing Nets), airport drop" }
    ],
    rating: 4.8,
    reviews_count: 280,
    is_featured: true
  },
  {
    id: "pkg-goa-sun-sand",
    title: "Vibrant Goa: Beachfront Holiday & Watersports Combo",
    destination: "Goa",
    duration_days: 4,
    duration_nights: 3,
    category: "weekend",
    price: 12499,
    original_price: 18500,
    cover_image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    highlights: ["4-Star Beach Resort with Swimming Pool", "5 Watersports Combo at Calangute", "Sunset Mandovi River Cruise", "Airport Transfers Included"],
    inclusions: ["3 Nights Accommodation", "Daily Buffet Breakfast", "Watersports Package (Parasailing, Jet Ski, Banana Ride)", "South Goa Tour"],
    exclusions: ["Flight tickets", "Beverages and Club Entry Charges"],
    itinerary: [
      { day: 1, title: "Welcome to Goa", activities: "Airport pickup, check into beach resort, relax at pool, evening Anjuna flea market" },
      { day: 2, title: "Watersports Thrills & North Goa Forts", activities: "Parasailing & jet ski at Calangute, Aguada Fort photo stop, Chapora Fort sunset" },
      { day: 3, title: "Heritage South Goa & Cruise", activities: "Old Goa Churches, Mangueshi Temple, Latin Quarter walk, Mandovi sunset cruise" },
      { day: 4, title: "Farewell Goa", activities: "Breakfast, souvenir shopping at Panjim, transfer to airport" }
    ],
    rating: 4.7,
    reviews_count: 410,
    is_featured: true
  },
  {
    id: "pkg-rajasthan-royal",
    title: "Royal Rajasthan: Jaipur, Jodhpur & Udaipur Grandeur",
    destination: "Jaipur",
    duration_days: 7,
    duration_nights: 6,
    category: "luxury",
    price: 32999,
    original_price: 45000,
    cover_image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Amber Fort Jeep Ride & Sound Show", "Mehrangarh Fort in Blue City Jodhpur", "Lake Pichola Sunset Boat in Udaipur", "Heritage Haveli Stays"],
    inclusions: ["Breakfast Daily", "Chauffeur Driven AC Sedan", "Monument Guide Fees", "Traditional Rajasthani Cultural Dinner"],
    exclusions: ["Flights", "Camera Fees", "Gratuities"],
    itinerary: [
      { day: 1, title: "Pink City Arrival (Jaipur)", activities: "Check into Haveli, visit Albert Hall Museum, evening Chokhi Dhani dinner" },
      { day: 2, title: "Jaipur Forts & Palaces", activities: "Amber Fort, Hawa Mahal, City Palace, royal observatory Jantar Mantar" },
      { day: 3, title: "Jaipur to Jodhpur via Pushkar", activities: "Visit holy Brahma Temple in Pushkar, arrive in Sun City Jodhpur" },
      { day: 4, title: "Mehrangarh Fort & Jaswant Thada", activities: "Explore Mehrangarh ramparts, Umaid Bhawan Palace, blue houses walk" },
      { day: 5, title: "Jodhpur to Udaipur via Ranakpur", activities: "Marvel at 1444 marble pillars at Ranakpur Jain Temple, reach Udaipur" },
      { day: 6, title: "Venice of the East (Udaipur)", activities: "City Palace complex, Saheliyon-ki-Bari, romantic boat ride on Lake Pichola" },
      { day: 7, title: "Departure", activities: "Breakfast and transfer to Udaipur Airport" }
    ],
    rating: 4.9,
    reviews_count: 195,
    is_featured: true
  }
];

// ----------------------------------------------------------------------------
// SEED DATA: Active Coupons & Offers
// ----------------------------------------------------------------------------
const SEED_COUPONS = [
  {
    code: "WANDER20",
    title: "Mega Travel Carnival: 20% OFF",
    description: "Get 20% instant discount up to ₹3,000 on all flights, hotels and holiday packages.",
    discount_percent: 20,
    max_discount: 3000,
    min_spend: 5000,
    service_type: "all",
    valid_until: "2027-12-31"
  },
  {
    code: "FLYINDIA",
    title: "Domestic Flight Saver: Flat ₹1,500 OFF",
    description: "Save flat ₹1,500 on all domestic flights across IndiGo, Air India, and Vistara.",
    discount_percent: 15,
    max_discount: 1500,
    min_spend: 4000,
    service_type: "flight",
    valid_until: "2027-12-31"
  },
  {
    code: "HOTELSUMMER",
    title: "Luxury Staycation: Up to ₹4,000 OFF",
    description: "Save big on 4-star and 5-star luxury hotels, resorts and heritage palaces.",
    discount_percent: 25,
    max_discount: 4000,
    min_spend: 8000,
    service_type: "hotel",
    valid_until: "2027-12-31"
  },
  {
    code: "WELCOME500",
    title: "New Traveler Bonus: Flat ₹500 OFF",
    description: "Instant ₹500 off on your very first booking with no minimum spend restriction.",
    discount_percent: 10,
    max_discount: 500,
    min_spend: 1000,
    service_type: "all",
    valid_until: "2027-12-31"
  }
];

// ----------------------------------------------------------------------------
// SEED DATA: Demo Flights Generator
// ----------------------------------------------------------------------------
function generateSampleFlights(from = "Delhi (DEL)", to = "Goa (GOI)", date = "2026-10-20") {
  return [
    {
      id: "fl-6e-204",
      airline: "IndiGo",
      airline_code: "6E-204",
      logo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=120&q=80",
      from: from,
      from_code: from.match(/\(([A-Z]{3})\)/)?.[1] || "DEL",
      to: to,
      to_code: to.match(/\(([A-Z]{3})\)/)?.[1] || "GOI",
      departure_time: "06:15",
      arrival_time: "08:45",
      duration: "2h 30m",
      stops: 0,
      stops_text: "Non-stop",
      price: 5499,
      original_price: 6800,
      cabin_class: "Economy",
      seats_left: 7,
      meal_included: false,
      baggage: "15 kg Check-in, 7 kg Cabin"
    },
    {
      id: "fl-ai-882",
      airline: "Air India",
      airline_code: "AI-882",
      logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=120&q=80",
      from: from,
      from_code: from.match(/\(([A-Z]{3})\)/)?.[1] || "DEL",
      to: to,
      to_code: to.match(/\(([A-Z]{3})\)/)?.[1] || "GOI",
      departure_time: "09:30",
      arrival_time: "12:10",
      duration: "2h 40m",
      stops: 0,
      stops_text: "Non-stop",
      price: 6250,
      original_price: 7500,
      cabin_class: "Economy",
      seats_left: 4,
      meal_included: true,
      baggage: "25 kg Check-in, 7 kg Cabin"
    },
    {
      id: "fl-uk-991",
      airline: "Vistara",
      airline_code: "UK-991",
      logo: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=120&q=80",
      from: from,
      from_code: from.match(/\(([A-Z]{3})\)/)?.[1] || "DEL",
      to: to,
      to_code: to.match(/\(([A-Z]{3})\)/)?.[1] || "GOI",
      departure_time: "13:45",
      arrival_time: "16:20",
      duration: "2h 35m",
      stops: 0,
      stops_text: "Non-stop",
      price: 6890,
      original_price: 8200,
      cabin_class: "Economy",
      seats_left: 9,
      meal_included: true,
      baggage: "20 kg Check-in, 7 kg Cabin"
    },
    {
      id: "fl-qp-1102",
      airline: "Akasa Air",
      airline_code: "QP-1102",
      logo: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=120&q=80",
      from: from,
      from_code: from.match(/\(([A-Z]{3})\)/)?.[1] || "DEL",
      to: to,
      to_code: to.match(/\(([A-Z]{3})\)/)?.[1] || "GOI",
      departure_time: "18:20",
      arrival_time: "21:05",
      duration: "2h 45m",
      stops: 0,
      stops_text: "Non-stop",
      price: 4999,
      original_price: 6200,
      cabin_class: "Economy",
      seats_left: 12,
      meal_included: false,
      baggage: "15 kg Check-in, 7 kg Cabin"
    },
    {
      id: "fl-sg-441",
      airline: "SpiceJet",
      airline_code: "SG-441",
      logo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=120&q=80",
      from: from,
      from_code: from.match(/\(([A-Z]{3})\)/)?.[1] || "DEL",
      to: to,
      to_code: to.match(/\(([A-Z]{3})\)/)?.[1] || "GOI",
      departure_time: "21:00",
      arrival_time: "02:15 (+1d)",
      duration: "5h 15m",
      stops: 1,
      stops_text: "1 Stop (BOM)",
      price: 4450,
      original_price: 5900,
      cabin_class: "Economy",
      seats_left: 5,
      meal_included: false,
      baggage: "15 kg Check-in, 7 kg Cabin"
    }
  ];
}

// ----------------------------------------------------------------------------
// SEED DATA: Demo Users
// ----------------------------------------------------------------------------
const SEED_PROFILES = [
  {
    id: "usr-traveler",
    email: "traveler@wanderyatra.com",
    password: "traveler123",
    full_name: "Rahul Sharma",
    phone: "+91 98765 43210",
    role: "traveler",
    avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "usr-owner",
    email: "owner@luxuryhotels.com",
    password: "owner123",
    full_name: "Vikramaditya Singhania",
    phone: "+91 98111 22334",
    role: "hotel_owner",
    avatar_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "usr-admin",
    email: "admin@wanderyatra.com",
    password: "admin123",
    full_name: "Aparna Sen (Administrator)",
    phone: "+91 99000 11223",
    role: "admin",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  }
];

// Initial Sample Bookings for Traveler
const SEED_BOOKINGS = [
  {
    id: "bkg-1001",
    booking_reference: "WY-FL-89210",
    user_id: "usr-traveler",
    booking_type: "flight",
    item_title: "IndiGo 6E-204: Delhi to Goa",
    item_subtitle: "Departure: 06:15 AM | 2 Travellers | Economy",
    booking_details: {
      from: "Delhi (DEL)",
      to: "Goa (GOI)",
      date: "2026-11-15",
      time: "06:15 AM",
      airline: "IndiGo",
      passengers: 2,
      cabin_class: "Economy"
    },
    traveler_info: {
      name: "Rahul Sharma",
      email: "traveler@wanderyatra.com",
      phone: "+91 98765 43210"
    },
    base_amount: 10998,
    tax_amount: 1980,
    discount_amount: 1500,
    total_amount: 11478,
    payment_method: "upi",
    payment_status: "completed",
    payment_transaction_id: "UPI-TXN-984321789",
    booking_status: "confirmed",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "bkg-1002",
    booking_reference: "WY-HT-44912",
    user_id: "usr-traveler",
    booking_type: "hotel",
    item_title: "Alila Diwa Goa - Hyatt Luxury Resort",
    item_subtitle: "Majorda, South Goa | 3 Nights | Terrace Room",
    booking_details: {
      hotel_name: "Alila Diwa Goa",
      city: "Goa",
      check_in: "2026-11-15",
      check_out: "2026-11-18",
      nights: 3,
      guests: 2,
      room_type: "Terrace Room with Paddy View"
    },
    traveler_info: {
      name: "Rahul Sharma",
      email: "traveler@wanderyatra.com",
      phone: "+91 98765 43210"
    },
    base_amount: 40500,
    tax_amount: 7290,
    discount_amount: 3000,
    total_amount: 44790,
    payment_method: "card",
    payment_status: "completed",
    payment_transaction_id: "CRD-TXN-77821039",
    booking_status: "confirmed",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

// ----------------------------------------------------------------------------
// DATABASE ENGINE INITIALIZATION
// ----------------------------------------------------------------------------
class DBManager {
  constructor() {
    this.initLocalStorage();
  }

  initLocalStorage() {
    // Sync destinations if empty or if seed count increased
    try {
      const storedDest = JSON.parse(localStorage.getItem(DB_KEYS.DESTINATIONS) || "[]");
      if (!storedDest.length || storedDest.length < SEED_DESTINATIONS.length) {
        localStorage.setItem(DB_KEYS.DESTINATIONS, JSON.stringify(SEED_DESTINATIONS));
      }
    } catch (e) {
      localStorage.setItem(DB_KEYS.DESTINATIONS, JSON.stringify(SEED_DESTINATIONS));
    }

    // Sync hotels if empty or if seed count increased (e.g. upgrades to all 11 destinations)
    try {
      const storedHotels = JSON.parse(localStorage.getItem(DB_KEYS.HOTELS) || "[]");
      if (!storedHotels.length || storedHotels.length < SEED_HOTELS.length) {
        localStorage.setItem(DB_KEYS.HOTELS, JSON.stringify(SEED_HOTELS));
      }
    } catch (e) {
      localStorage.setItem(DB_KEYS.HOTELS, JSON.stringify(SEED_HOTELS));
    }

    if (!localStorage.getItem(DB_KEYS.PACKAGES)) {
      localStorage.setItem(DB_KEYS.PACKAGES, JSON.stringify(SEED_PACKAGES));
    }
    if (!localStorage.getItem(DB_KEYS.COUPONS)) {
      localStorage.setItem(DB_KEYS.COUPONS, JSON.stringify(SEED_COUPONS));
    }
    if (!localStorage.getItem(DB_KEYS.PROFILES)) {
      localStorage.setItem(DB_KEYS.PROFILES, JSON.stringify(SEED_PROFILES));
    }
    if (!localStorage.getItem(DB_KEYS.BOOKINGS)) {
      localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(SEED_BOOKINGS));
    }
    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
      localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify({
        gst_percent: 18.0,
        service_fee_percent: 2.5,
        commission_percent: 10.0,
        support_email: "support@tourismandhospitality.com",
        support_phone: "+91 1800 200 4567"
      }));
    }
  }

  // --- Supabase Config Helper ---
  getSupabaseConfig() {
    const raw = localStorage.getItem(DB_KEYS.SUPABASE_CONFIG);
    return raw ? JSON.parse(raw) : null;
  }

  setSupabaseConfig(url, key) {
    if (!url || !key) {
      localStorage.removeItem(DB_KEYS.SUPABASE_CONFIG);
    } else {
      localStorage.setItem(DB_KEYS.SUPABASE_CONFIG, JSON.stringify({ url, key }));
    }
  }

  // --- DESTINATIONS ---
  async getDestinations() {
    const data = JSON.parse(localStorage.getItem(DB_KEYS.DESTINATIONS) || "[]");
    return data;
  }

  async getDestinationById(id) {
    const items = await this.getDestinations();
    return items.find(d => d.id === id) || null;
  }

  async saveDestination(destData) {
    const items = await this.getDestinations();
    if (destData.id) {
      const idx = items.findIndex(d => d.id === destData.id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...destData, updated_at: new Date().toISOString() };
      } else {
        items.unshift(destData);
      }
    } else {
      destData.id = "dest-" + Date.now();
      items.unshift(destData);
    }
    localStorage.setItem(DB_KEYS.DESTINATIONS, JSON.stringify(items));
    return destData;
  }

  async deleteDestination(id) {
    let items = await this.getDestinations();
    items = items.filter(d => d.id !== id);
    localStorage.setItem(DB_KEYS.DESTINATIONS, JSON.stringify(items));
    return true;
  }

  // --- HOTELS ---
  async getHotels() {
    return JSON.parse(localStorage.getItem(DB_KEYS.HOTELS) || "[]");
  }

  async getHotelById(id) {
    const hotels = await this.getHotels();
    return hotels.find(h => h.id === id) || null;
  }

  async saveHotel(hotelData) {
    const hotels = await this.getHotels();
    if (hotelData.id) {
      const idx = hotels.findIndex(h => h.id === hotelData.id);
      if (idx !== -1) {
        hotels[idx] = { ...hotels[idx], ...hotelData, updated_at: new Date().toISOString() };
      } else {
        hotels.unshift(hotelData);
      }
    } else {
      hotelData.id = "hotel-" + Date.now();
      if (!hotelData.rooms) {
        hotelData.rooms = [
          { id: "room-" + Date.now() + "-1", name: "Standard Deluxe Room", type: "deluxe", price_per_night: hotelData.price_per_night, max_guests: 2, bed_type: "King Bed" }
        ];
      }
      hotels.unshift(hotelData);
    }
    localStorage.setItem(DB_KEYS.HOTELS, JSON.stringify(hotels));
    return hotelData;
  }

  async deleteHotel(id) {
    let hotels = await this.getHotels();
    hotels = hotels.filter(h => h.id !== id);
    localStorage.setItem(DB_KEYS.HOTELS, JSON.stringify(hotels));
    return true;
  }

  // --- PACKAGES ---
  async getPackages() {
    return JSON.parse(localStorage.getItem(DB_KEYS.PACKAGES) || "[]");
  }

  async getPackageById(id) {
    const pkgs = await this.getPackages();
    return pkgs.find(p => p.id === id) || null;
  }

  async savePackage(pkgData) {
    const pkgs = await this.getPackages();
    if (pkgData.id) {
      const idx = pkgs.findIndex(p => p.id === pkgData.id);
      if (idx !== -1) pkgs[idx] = { ...pkgs[idx], ...pkgData };
      else pkgs.unshift(pkgData);
    } else {
      pkgData.id = "pkg-" + Date.now();
      pkgs.unshift(pkgData);
    }
    localStorage.setItem(DB_KEYS.PACKAGES, JSON.stringify(pkgs));
    return pkgData;
  }

  async deletePackage(id) {
    let pkgs = await this.getPackages();
    pkgs = pkgs.filter(p => p.id !== id);
    localStorage.setItem(DB_KEYS.PACKAGES, JSON.stringify(pkgs));
    return true;
  }

  // --- FLIGHTS ---
  async getFlights(from = "Delhi (DEL)", to = "Goa (GOI)", date = "") {
    return generateSampleFlights(from, to, date);
  }

  // --- BOOKINGS ---
  async getBookings() {
    return JSON.parse(localStorage.getItem(DB_KEYS.BOOKINGS) || "[]");
  }

  async getUserBookings(userId) {
    const all = await this.getBookings();
    return all.filter(b => b.user_id === userId);
  }

  async getBookingByRef(ref) {
    const all = await this.getBookings();
    return all.find(b => b.booking_reference === ref || b.id === ref) || null;
  }

  async createBooking(bookingPayload) {
    const all = await this.getBookings();
    const reference = "WY-" + (bookingPayload.booking_type || "TRIP").toUpperCase().slice(0, 2) + "-" + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: "bkg-" + Date.now(),
      booking_reference: reference,
      booking_status: "confirmed",
      payment_status: "completed",
      payment_transaction_id: "TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      created_at: new Date().toISOString(),
      ...bookingPayload
    };
    all.unshift(newBooking);
    localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(all));
    return newBooking;
  }

  async cancelBooking(bookingId, reason = "Requested by user") {
    const all = await this.getBookings();
    const idx = all.findIndex(b => b.id === bookingId || b.booking_reference === bookingId);
    if (idx === -1) return null;

    const b = all[idx];
    const refundAmount = Math.max(0, Math.round(b.total_amount * 0.85)); // 85% refundable
    b.booking_status = "cancelled";
    b.cancellation_reason = reason;
    b.refund_amount = refundAmount;
    b.updated_at = new Date().toISOString();

    all[idx] = b;
    localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(all));
    return b;
  }

  // --- COUPONS ---
  async getCoupons() {
    return JSON.parse(localStorage.getItem(DB_KEYS.COUPONS) || "[]");
  }

  async validateCoupon(code, amount = 0, serviceType = "all") {
    const coupons = await this.getCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) return { valid: false, message: "Invalid coupon code" };
    if (amount < (coupon.min_spend || 0)) {
      return { valid: false, message: `Minimum spend of ₹${coupon.min_spend} required for this coupon` };
    }
    if (coupon.service_type !== 'all' && coupon.service_type !== serviceType) {
      return { valid: false, message: `Coupon applicable only on ${coupon.service_type} bookings` };
    }
    let discount = Math.round((amount * coupon.discount_percent) / 100);
    if (coupon.max_discount && discount > coupon.max_discount) {
      discount = coupon.max_discount;
    }
    return {
      valid: true,
      coupon,
      discount_amount: discount,
      message: `Coupon applied! You saved ₹${discount}`
    };
  }

  async saveCoupon(couponData) {
    const coupons = await this.getCoupons();
    if (couponData.id) {
      const idx = coupons.findIndex(c => c.id === couponData.id);
      if (idx !== -1) coupons[idx] = { ...coupons[idx], ...couponData };
      else coupons.unshift(couponData);
    } else {
      couponData.id = "cpn-" + Date.now();
      coupons.unshift(couponData);
    }
    localStorage.setItem(DB_KEYS.COUPONS, JSON.stringify(coupons));
    return couponData;
  }

  // --- AUTHENTICATION & PROFILES ---
  async getProfiles() {
    return JSON.parse(localStorage.getItem(DB_KEYS.PROFILES) || "[]");
  }

  async authenticate(email, password) {
    const profiles = await this.getProfiles();
    const user = profiles.find(p => p.email.toLowerCase() === email.trim().toLowerCase() && p.password === password);
    if (!user) return null;
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async registerUser({ full_name, email, password, phone, role = "traveler" }) {
    const profiles = await this.getProfiles();
    const existing = profiles.find(p => p.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) throw new Error("An account with this email already exists");

    const newUser = {
      id: "usr-" + Date.now(),
      email,
      password,
      full_name,
      phone: phone || "+91 90000 00000",
      role,
      avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      created_at: new Date().toISOString()
    };
    profiles.push(newUser);
    localStorage.setItem(DB_KEYS.PROFILES, JSON.stringify(profiles));
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  }

  // --- SETTINGS ---
  async getSettings() {
    return JSON.parse(localStorage.getItem(DB_KEYS.SETTINGS) || "{}");
  }

  async updateSettings(newSettings) {
    const current = await this.getSettings();
    const merged = { ...current, ...newSettings };
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(merged));
    return merged;
  }
}

// Global Singleton Export
window.db = new DBManager();
