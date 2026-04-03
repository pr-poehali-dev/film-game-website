import { useState } from "react";
import Icon from "@/components/ui/icon";
import { catalogMovies, marvelTop10, Movie } from "@/data/movies";

interface PlayerPageProps {
  film?: Movie;
  onNavigate: (page: string, data?: unknown) => void;
}

const allMovies = [...marvelTop10, ...catalogMovies.slice(0, 20)];

export default function PlayerPage({ film, onNavigate }: PlayerPageProps) {
  const [currentFilm, setCurrentFilm] = useState<Movie>(film || marvelTop10[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isFullDemo, setIsFullDemo] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setShowSubscribeModal(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen pt-14" style={{ background: 'var(--dark-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player */}
          <div className="lg:col-span-2">
            {/* Video area */}
            <div
              className="relative rounded-2xl overflow-hidden group"
              style={{
                background: '#000',
                border: '1px solid var(--dark-border)',
                aspectRatio: '16/9',
                boxShadow: '0 0 40px rgba(0,0,0,0.8)'
              }}
            >
              <img
                src={currentFilm.poster}
                alt={currentFilm.title}
                className="w-full h-full object-cover opacity-60"
              />

              {/* Cinematic bars */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-black" />
              <div className="absolute bottom-12 left-0 right-0 h-8 bg-black" />

              {/* Center play button */}
              {!isFullDemo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlay}
                    className="rounded-full p-6 transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,0,128,0.9)',
                      boxShadow: '0 0 40px var(--neon-pink)',
                    }}
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={40} style={{ color: '#fff' }} />
                  </button>
                </div>
              )}

              {/* DEMO badge */}
              <div className="absolute top-10 right-4 px-3 py-1 rounded-full font-golos font-bold text-xs"
                style={{ background: 'var(--neon-yellow)', color: '#000' }}>
                ДЕМО-ПРОСМОТР
              </div>

              {/* Film title overlay */}
              <div className="absolute top-10 left-4">
                <div className="font-bebas text-2xl text-white">{currentFilm.title}</div>
                <div className="font-golos text-sm text-gray-400">{currentFilm.year} · {currentFilm.duration}</div>
              </div>

              {/* Controls bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                {/* Progress */}
                <div className="mb-3 relative h-1 rounded-full cursor-pointer group/progress" style={{ background: 'rgba(255,255,255,0.2)' }}
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
                  }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--neon-pink)', boxShadow: '0 0 8px var(--neon-pink)' }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                    style={{ left: `${progress}%`, transform: 'translateX(-50%) translateY(-50%)', background: 'var(--neon-pink)', boxShadow: '0 0 8px var(--neon-pink)' }} />
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={handlePlay} className="text-white hover:text-pink-400 transition-colors">
                    <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                  </button>
                  <button className="text-white hover:text-pink-400 transition-colors">
                    <Icon name="SkipForward" size={18} />
                  </button>

                  <div className="flex items-center gap-2 ml-2">
                    <Icon name="Volume2" size={16} className="text-gray-400" />
                    <div className="w-20 h-1 rounded-full cursor-pointer relative" style={{ background: 'rgba(255,255,255,0.2)' }}
                      onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setVolume(Math.round(((e.clientX - rect.left) / rect.width) * 100));
                      }}>
                      <div className="h-full rounded-full" style={{ width: `${volume}%`, background: 'var(--neon-blue)' }} />
                    </div>
                  </div>

                  <div className="ml-auto font-golos text-sm text-gray-400">
                    {Math.floor(progress / 100 * 120)}:{String(Math.floor((progress / 100 * 120 * 60) % 60)).padStart(2, '0')} / {currentFilm.duration}
                  </div>

                  <button className="text-white hover:text-pink-400 transition-colors">
                    <Icon name="Maximize" size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Film info */}
            <div className="mt-6 p-6 rounded-2xl" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="font-bebas text-4xl text-white mb-1">{currentFilm.title}</h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1" style={{ color: 'var(--neon-yellow)' }}>
                      <Icon name="Star" size={16} style={{ fill: 'var(--neon-yellow)' }} />
                      <span className="font-golos font-semibold">{currentFilm.rating}</span>
                    </div>
                    <span className="font-golos text-gray-400">{currentFilm.year}</span>
                    <span className="font-golos text-gray-400">{currentFilm.duration}</span>
                    <span className="px-2 py-0.5 text-xs rounded font-golos" style={{ background: 'rgba(0,212,255,0.15)', color: 'var(--neon-blue)' }}>
                      {currentFilm.genre}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setLiked(l => !l)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full font-golos text-sm transition-all"
                    style={liked ? { background: 'rgba(255,0,128,0.2)', color: 'var(--neon-pink)', border: '1px solid var(--neon-pink)' } : { border: '1px solid var(--dark-border)', color: '#94a3b8' }}>
                    <Icon name="Heart" size={16} style={liked ? { fill: 'var(--neon-pink)' } : {}} />
                    {liked ? "В избранном" : "В избранное"}
                  </button>
                  <button className="px-4 py-2 rounded-full font-golos text-sm flex items-center gap-1.5"
                    style={{ border: '1px solid var(--dark-border)', color: '#94a3b8' }}>
                    <Icon name="Share2" size={16} />
                    Поделиться
                  </button>
                </div>
              </div>

              <p className="font-golos text-gray-300 mt-4 leading-relaxed">{currentFilm.description}</p>
            </div>
          </div>

          {/* Sidebar - playlist */}
          <div>
            <h3 className="font-bebas text-2xl mb-4" style={{ color: 'var(--neon-blue)' }}>СМОТРЕТЬ ДАЛЕЕ</h3>
            <div className="space-y-3 max-h-screen overflow-y-auto pr-1">
              {allMovies.slice(0, 15).map(m => (
                <button
                  key={m.id}
                  onClick={() => { setCurrentFilm(m); setProgress(0); setIsPlaying(false); }}
                  className="w-full flex gap-3 p-2 rounded-xl text-left transition-all duration-200"
                  style={currentFilm.id === m.id ? {
                    background: 'rgba(255,0,128,0.1)',
                    border: '1px solid rgba(255,0,128,0.3)'
                  } : {
                    background: 'var(--dark-card)',
                    border: '1px solid var(--dark-border)'
                  }}
                >
                  <div className="relative shrink-0">
                    <img src={m.poster} alt={m.title} className="w-16 h-20 object-cover rounded-lg" />
                    {currentFilm.id === m.id && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                        <Icon name="Play" size={16} style={{ color: 'var(--neon-pink)' }} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-golos font-semibold text-sm text-white leading-tight line-clamp-2">{m.title}</div>
                    <div className="font-golos text-xs text-gray-500 mt-1">{m.year} · {m.duration}</div>
                    <div className="flex items-center gap-1 mt-1" style={{ color: 'var(--neon-yellow)' }}>
                      <Icon name="Star" size={10} style={{ fill: 'var(--neon-yellow)' }} />
                      <span className="text-xs font-golos">{m.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="rounded-2xl p-8 max-w-md w-full text-center animate-scale-in"
            style={{ background: 'var(--dark-card)', border: '1px solid var(--neon-pink)', boxShadow: '0 0 40px rgba(255,0,128,0.3)' }}>
            <div className="font-bebas text-5xl mb-2" style={{ color: 'var(--neon-pink)' }}>ПОЛНЫЙ ДОСТУП</div>
            <p className="font-golos text-gray-300 mb-6">Для просмотра фильмов без ограничений подключи PRO подписку за <strong className="text-white">10₽/месяц</strong></p>
            <div className="space-y-3 mb-6 text-left">
              {["500+ фильмов HD качества", "Без рекламы", "Автосписание, отмена в любой момент", "Доступ ко всем мини-играм"].map((f, i) => (
                <div key={i} className="flex items-center gap-2 font-golos text-sm text-gray-300">
                  <Icon name="CheckCircle" size={16} style={{ color: 'var(--neon-green)' }} />
                  {f}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowSubscribeModal(false); onNavigate("subscription"); }}
                className="flex-1 btn-neon-pink py-3 rounded-xl font-golos font-bold text-white"
              >
                Подключить 10₽/мес
              </button>
              <button
                onClick={() => setShowSubscribeModal(false)}
                className="px-4 py-3 rounded-xl font-golos text-gray-500 hover:text-white transition-colors"
                style={{ border: '1px solid var(--dark-border)' }}
              >
                Позже
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
