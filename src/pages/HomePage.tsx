import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { marvelTop10 } from "@/data/movies";

interface HomePageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const heroFilms = [
  {
    title: "ДЮНА: ЧАСТЬ 2",
    subtitle: "Эпическое путешествие через пески Арракиса",
    badge: "НОВИНКА",
    bg: "linear-gradient(135deg, #1a0533 0%, #080b14 60%)",
    accent: "#bf00ff",
  },
  {
    title: "МСТИТЕЛИ: ФИНАЛ",
    subtitle: "Битва за существование всей вселенной",
    badge: "TOP MARVEL",
    bg: "linear-gradient(135deg, #001a33 0%, #080b14 60%)",
    accent: "#00d4ff",
  },
  {
    title: "МАТРИЦА: ВОСКРЕШЕНИЕ",
    subtitle: "Реальность — это только то, что ты выбираешь",
    badge: "КУЛЬТ",
    bg: "linear-gradient(135deg, #001a0d 0%, #080b14 60%)",
    accent: "#00ff88",
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % heroFilms.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 100);
    return () => clearInterval(t);
  }, []);

  const hero = heroFilms[heroIdx];

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark-bg)' }}>
      {/* Hero */}
      <div
        className="relative min-h-screen flex items-center grid-bg scanlines overflow-hidden"
        style={{ background: hero.bg, transition: 'background 1s ease' }}
      >
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 4)}px`,
                height: `${2 + (i % 4)}px`,
                background: hero.accent,
                left: `${(i * 17 + tick * 0.3) % 100}%`,
                top: `${(i * 13 + 5) % 100}%`,
                opacity: 0.3 + (i % 5) * 0.1,
                boxShadow: `0 0 6px ${hero.accent}`,
                transition: 'left 0.1s linear',
              }}
            />
          ))}
        </div>

        {/* Neon grid lines */}
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${hero.accent}15, transparent)`,
            borderTop: `1px solid ${hero.accent}30`
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-golos font-bold tracking-widest rounded-full"
                style={{ background: hero.accent, color: '#000' }}>
                {hero.badge}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Icon name="Circle" size={8} style={{ fill: hero.accent, color: hero.accent }} />
                <span>В ЭФИРЕ</span>
              </div>
            </div>
            <h1
              className="font-bebas leading-none mb-4 glitch"
              style={{
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                color: '#fff',
                textShadow: `0 0 20px ${hero.accent}80, 0 0 60px ${hero.accent}40`
              }}
            >
              {hero.title}
            </h1>
            <p className="font-golos text-xl text-gray-300 mb-10 max-w-lg">{hero.subtitle}</p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("player")}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-golos font-semibold text-lg text-black"
                style={{ background: hero.accent, boxShadow: `0 0 30px ${hero.accent}80` }}
              >
                <Icon name="Play" size={20} />
                Смотреть
              </button>
              <button
                onClick={() => onNavigate("catalog")}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-golos font-semibold text-lg border"
                style={{ borderColor: hero.accent, color: hero.accent }}
              >
                <Icon name="Search" size={18} />
                Каталог
              </button>
            </div>

            {/* Hero dots */}
            <div className="flex gap-2 mt-10">
              {heroFilms.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === heroIdx ? '32px' : '8px',
                    height: '8px',
                    background: i === heroIdx ? hero.accent : '#333',
                    boxShadow: i === heroIdx ? `0 0 8px ${hero.accent}` : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs">
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
          <span>SCROLL</span>
        </div>
      </div>

      {/* Stats */}
      <div className="py-16 border-y" style={{ borderColor: 'var(--dark-border)', background: 'var(--dark-card)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "500+", label: "Фильмов", icon: "Film", color: 'var(--neon-pink)' },
              { val: "10", label: "Marvel хитов", icon: "Zap", color: 'var(--neon-blue)' },
              { val: "5", label: "Мини-игр", icon: "Gamepad2", color: 'var(--neon-green)' },
              { val: "10₽", label: "Подписка/мес", icon: "Crown", color: 'var(--neon-yellow)' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Icon name={s.icon} size={28} style={{ color: s.color }} />
                <div className="font-bebas text-5xl" style={{ color: s.color, textShadow: `0 0 20px ${s.color}` }}>
                  {s.val}
                </div>
                <div className="font-golos text-sm text-gray-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marvel TOP 10 preview */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded" style={{ background: 'var(--neon-pink)', boxShadow: '0 0 10px var(--neon-pink)' }} />
            <h2 className="font-bebas text-4xl" style={{ color: 'var(--neon-pink)' }}>ТОП-10 MARVEL</h2>
          </div>
          <button
            onClick={() => onNavigate("marvel")}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Все фильмы <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {marvelTop10.slice(0, 5).map((film, i) => (
            <button
              key={film.id}
              onClick={() => onNavigate("player", film)}
              className="card-dark rounded-xl overflow-hidden text-left group"
            >
              <div className="relative">
                <img src={film.poster} alt={film.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="movie-overlay absolute inset-0" />
                <div
                  className="absolute top-2 left-2 font-bebas text-4xl leading-none"
                  style={{ color: 'var(--neon-pink)', textShadow: '0 0 20px var(--neon-pink)', WebkitTextStroke: '1px rgba(255,0,128,0.5)' }}
                >
                  {i + 1}
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-xs" style={{ color: 'var(--neon-yellow)' }}>
                  <Icon name="Star" size={10} style={{ fill: 'var(--neon-yellow)' }} />
                  {film.rating}
                </div>
              </div>
              <div className="p-3">
                <div className="font-golos font-semibold text-sm text-white truncate">{film.title}</div>
                <div className="font-golos text-xs text-gray-500 mt-0.5">{film.year} · {film.duration}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Games promo */}
      <section className="py-16" style={{ background: 'var(--dark-card)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0d1220 0%, #1a0033 100%)', border: '1px solid var(--dark-border)' }}>
            <div className="absolute top-4 right-4 text-8xl opacity-10">🎮</div>
            <div className="relative z-10 max-w-lg">
              <div className="font-bebas text-5xl md:text-7xl mb-4" style={{ color: 'var(--neon-green)', textShadow: '0 0 30px var(--neon-green)' }}>
                МИНИ-ИГРЫ
              </div>
              <p className="font-golos text-gray-300 text-lg mb-6">
                Угадай фильм по кадру, тест на знание Marvel, киновикторина и другие интерактивные развлечения
              </p>
              <button
                onClick={() => onNavigate("games")}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-golos font-semibold text-black text-lg"
                style={{ background: 'var(--neon-green)', boxShadow: '0 0 20px rgba(0,255,136,0.5)' }}
              >
                <Icon name="Gamepad2" size={20} />
                Играть
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-16 max-w-7xl mx-auto px-6 text-center">
        <div className="font-bebas text-6xl md:text-8xl mb-4">
          <span style={{ color: 'var(--neon-blue)' }}>PRO</span>
          <span className="text-white"> ПОДПИСКА</span>
        </div>
        <p className="font-golos text-xl text-gray-400 mb-8">Все 500+ фильмов, без рекламы, в HD качестве</p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="font-bebas text-7xl" style={{ color: 'var(--neon-pink)', textShadow: '0 0 30px var(--neon-pink)' }}>
            10₽
          </div>
          <div className="text-left">
            <div className="font-golos text-gray-500 text-sm">в месяц</div>
            <div className="font-golos text-white font-semibold">Автосписание</div>
            <div className="font-golos text-gray-500 text-xs">Отменить в любой момент</div>
          </div>
          <button
            onClick={() => onNavigate("subscription")}
            className="btn-neon-pink px-10 py-4 rounded-full font-golos font-bold text-xl text-white"
          >
            Подключить PRO
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center font-golos text-gray-600 text-sm" style={{ borderColor: 'var(--dark-border)' }}>
        <div className="font-bebas text-2xl mb-2" style={{ color: 'var(--neon-pink)' }}>CINEON</div>
        <p>© 2024 CINEON — Кино, игры, Marvel</p>
      </footer>
    </div>
  );
}
