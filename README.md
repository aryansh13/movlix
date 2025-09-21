# 🎬 CinePulse - Platform Movie Discovery & Review Indonesia

CinePulse adalah platform komunitas film Indonesia yang menginspirasi pengalaman menonton film yang lebih baik. Seperti "IMDb" atau "Letterboxd" versi Indonesia, CinePulse memungkinkan pengguna untuk menemukan, menilai, dan berbagi film favorit mereka dengan komunitas penggemar film terbesar di Indonesia.

## ✨ Fitur Utama

### 🎯 **Database Film Lengkap**
- Katalog film Indonesia dan internasional yang komprehensif
- Informasi detail film: sinopsis, cast, crew, rating, dan metadata
- Integrasi dengan API film populer untuk data real-time

### ⭐ **Sistem Rating & Review**
- Rating bintang interaktif (1-5 bintang)
- Review user-generated dengan sistem helpful votes
- Deteksi spoiler dan peringatan konten
- Sistem verifikasi reviewer

### 🔍 **Pencarian & Filter Canggih**
- Pencarian real-time dengan autocomplete
- Filter berdasarkan genre, tahun, rating, dan bahasa
- Sorting berdasarkan relevansi, popularitas, dan rating
- Pencarian berdasarkan aktor, sutradara, dan keyword

### 📝 **Watchlist Personal**
- Kelola daftar film yang ingin ditonton
- Status tracking: "Ingin Ditonton", "Sedang Ditonton", "Sudah Ditonton"
- Progress tracking untuk film yang sedang ditonton
- Rating dan review pribadi

### 🤖 **Recommendation Engine**
- Rekomendasi personal berdasarkan preferensi user
- Trending films berdasarkan popularitas global
- Hidden gems berdasarkan rating tinggi
- Film serupa berdasarkan genre dan rating

### 👥 **Social Features**
- Follow pengguna lain untuk melihat aktivitas mereka
- Komunitas diskusi film
- Leaderboard reviewer terbaik
- Share review ke media sosial
- Sistem poin dan badge

### 💰 **Monetization Ready**
- Space untuk iklan banner dan sponsored content
- Premium features untuk user berbayar
- Affiliate links ke platform streaming
- Partnership dengan bioskop dan distributor

## 🚀 Teknologi yang Digunakan

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Styling**: Custom CSS dengan glassmorphism effects
- **Icons**: Lucide React
- **Responsive**: Mobile-first design
- **Performance**: Optimized images dan lazy loading

## 📱 Halaman Utama

### 🏠 **Homepage**
- Hero section dengan film trending
- Featured movies carousel
- Trending section dengan tab filter
- Movie grid dengan infinite scroll

### 🎬 **Detail Film**
- Informasi lengkap film dengan backdrop
- Tab navigation: Overview, Reviews, Cast & Crew, Details
- Sistem rating dan review terintegrasi
- Film serupa recommendations

### 🔍 **Search Page**
- Search bar dengan real-time suggestions
- Filter sidebar: genre, tahun, rating
- Sorting options
- Grid layout dengan pagination

### 📋 **Watchlist**
- Tab-based organization
- Status management
- Progress tracking
- Personal ratings dan reviews

### 🎯 **Recommendations**
- Personalized recommendations
- Trending films
- Hidden gems
- Similar movies

### 👥 **Community**
- Recent reviews feed
- Active users directory
- Discussion forums
- Leaderboard

## 🎨 Design System

### **Color Palette**
- Primary: Purple gradient (#8b5cf6 to #ec4899)
- Background: Dark gradient (#0f0f23 to #16213e)
- Cards: Glassmorphism dengan backdrop blur
- Text: White dengan gray variations

### **Components**
- MovieCard: Hover effects dengan overlay
- RatingStars: Interactive rating system
- ReviewCard: Rich review display
- Header: Fixed navigation dengan search
- Footer: Comprehensive links dan social media

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone https://github.com/yourusername/cinepulse.git
cd cinepulse
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
```

3. **Run development server**
```bash
npm run dev
# atau
yarn dev
```

4. **Open browser**
```
http://localhost:3000
```

## 📁 Struktur Project

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── Header.js       # Navigation header
│   │   ├── Footer.js       # Site footer
│   │   ├── Hero.js         # Hero section
│   │   ├── MovieCard.js    # Movie display card
│   │   ├── MovieGrid.js    # Movie grid layout
│   │   ├── RatingStars.js  # Rating component
│   │   ├── ReviewCard.js   # Review display
│   │   └── ReviewForm.js   # Review submission
│   ├── movie/[id]/         # Dynamic movie detail pages
│   ├── search/             # Search functionality
│   ├── watchlist/          # User watchlist
│   ├── recommendations/    # Recommendation engine
│   ├── community/          # Social features
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Homepage
```

## 🔮 Roadmap

### Phase 1: Core Features ✅
- [x] Homepage dengan hero section
- [x] Movie detail pages
- [x] Search & filter functionality
- [x] Watchlist management
- [x] Rating & review system
- [x] Recommendation engine
- [x] Social features

### Phase 2: Enhanced Features 🚧
- [ ] User authentication & profiles
- [ ] Real database integration
- [ ] API endpoints
- [ ] Advanced recommendation algorithms
- [ ] Mobile app (React Native)
- [ ] Push notifications

### Phase 3: Monetization 💰
- [ ] Advertisement system
- [ ] Premium subscriptions
- [ ] Affiliate partnerships
- [ ] Cinema integration
- [ ] Merchandise store

### Phase 4: Advanced Features 🚀
- [ ] AI-powered recommendations
- [ ] Video reviews
- [ ] Live streaming events
- [ ] International expansion
- [ ] API for third-party developers

## 🤝 Contributing

Kami menyambut kontribusi dari komunitas! Silakan:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- **Website**: [cinepulse.id](https://cinepulse.id)
- **Email**: hello@cinepulse.id
- **Twitter**: [@CinePulseID](https://twitter.com/CinePulseID)
- **Instagram**: [@cinepulse.id](https://instagram.com/cinepulse.id)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) untuk API film
- [Next.js](https://nextjs.org/) untuk framework React
- [Tailwind CSS](https://tailwindcss.com/) untuk styling
- Komunitas penggemar film Indonesia

---

**Made with ❤️ in Indonesia** 🇮🇩