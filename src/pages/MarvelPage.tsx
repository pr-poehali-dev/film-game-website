import { useState } from "react";
import Icon from "@/components/ui/icon";
import { marvelTop10 } from "@/data/movies";

interface MarvelPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function MarvelPage({ onNavigate }: MarvelPageProps) {
  const [selected, setSelected] = useState(marvelTop10[0]);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-14" style={{ background: 'var(--dark-bg)' }}>
      {/* Hero with selected film */}
      <div className="relative py-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0010 0%, #080b14 70%)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--neon-pink), var(--neon-purple), var(--neon-blue))', boxShadow: '0 0 20px var(--neon-pink)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl neon-pulse">⚡</span>
            <h1 className="font-bebas text-6xl md:text-8xl" style={{ color: 'var(--neon-pink)', textShadow: '0 0 30px var(--neon-pink)' }}>
              ТОП-10 MARVEL
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Selected film info */}
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <div className="font-bebas text-9xl leading-none opacity-10 select-none"
                  style={{ color: 'var(--neon-pink)', fontSize: '160px' }}>
                  {marvelTop10.findIndex(f => f.id === selected.id) + 1}
                </div>
                <div>
                  <h2 className="font-bebas text-5xl text-white mb-2">{selected.title}</h2>
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <div className="flex items-center gap-1" style={{ color: 'var(--neon-yellow)' }}>
                      <Icon name="Star" size={18} style={{ fill: 'var(--neon-yellow)' }} />
                      <span className="font-bebas text-2xl">{selected.rating}</span>
                    </div>
                    <span className="font-golos text-gray-400">{selected.year}</span>
                    <span className="font-golos text-gray-400">{selected.duration}</span>
                    <span className="px-2 py-0.5 text-xs rounded font-golos" style={{ background: 'rgba(255,0,128,0.2)', color: 'var(--neon-pink)', border: '1px solid rgba(255,0,128,0.3)' }}>
                      {selected.genre}
                    </span>
                  </div>
                  <p className="font-golos text-gray-300 text-lg mb-6 max-w-lg">{selected.description}</p>
                  <button
                    onClick={() => onNavigate("player", selected)}
                    className="flex items-center gap-2 px-8 py-3 rounded-full font-golos font-bold text-lg text-black"
                    style={{ background: 'var(--neon-pink)', boxShadow: '0 0 30px rgba(255,0,128,0.6)' }}
                  >
                    <Icon name="Play" size={20} />
                    Смотреть сейчас
                  </button>
                </div>
              </div>
            </div>

            {/* Selected poster */}
            <div className="relative shrink-0">
              <div className="w-48 h-72 rounded-xl overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(255,0,128,0.4)', border: '2px solid var(--neon-pink)' }}>
                <img src={selected.poster} alt={selected.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -right-3 rounded-full w-14 h-14 flex items-center justify-center font-bebas text-2xl"
                style={{ background: 'var(--neon-pink)', boxShadow: '0 0 20px var(--neon-pink)', color: '#000' }}>
                #{marvelTop10.findIndex(f => f.id === selected.id) + 1}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {marvelTop10.map((film, i) => (
            <button
              key={film.id}
              onClick={() => setSelected(film)}
              onMouseEnter={() => setHovered(film.id)}
              onMouseLeave={() => setHovered(null)}
              className="text-left group"
            >
              <div
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={selected.id === film.id ? {
                  border: '2px solid var(--neon-pink)',
                  boxShadow: '0 0 25px rgba(255,0,128,0.4)',
                  transform: 'translateY(-4px)'
                } : hovered === film.id ? {
                  border: '1px solid var(--neon-pink)',
                  boxShadow: '0 0 12px rgba(255,0,128,0.2)',
                  transform: 'translateY(-2px)'
                } : {
                  border: '1px solid var(--dark-border)'
                }}
              >
                <div className="relative">
                  <img src={film.poster} alt={film.title} className="w-full h-48 object-cover" />
                  <div className="movie-overlay absolute inset-0" />

                  {/* Rank number */}
                  <div className="absolute top-2 left-2 font-bebas text-5xl leading-none"
                    style={{
                      color: i < 3 ? 'var(--neon-pink)' : 'rgba(255,255,255,0.6)',
                      textShadow: i < 3 ? '0 0 15px var(--neon-pink)' : 'none',
                      WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                    }}>
                    {i + 1}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded text-xs" style={{ color: 'var(--neon-yellow)' }}>
                    <Icon name="Star" size={10} style={{ fill: 'var(--neon-yellow)' }} />
                    {film.rating}
                  </div>

                  {selected.id === film.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="rounded-full p-3" style={{ background: 'var(--neon-pink)', boxShadow: '0 0 20px var(--neon-pink)' }}>
                        <Icon name="Eye" size={18} style={{ color: '#000' }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3" style={{ background: 'var(--dark-card)' }}>
                  <div className="font-golos font-semibold text-sm text-white truncate">{film.title}</div>
                  <div className="font-golos text-xs text-gray-500 mt-0.5">{film.year} · {film.duration}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Universe timeline */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded" style={{ background: 'var(--neon-purple)', boxShadow: '0 0 10px var(--neon-purple)' }} />
            <h2 className="font-bebas text-4xl" style={{ color: 'var(--neon-purple)' }}>ХРОНОЛОГИЯ MCU</h2>
          </div>
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, var(--neon-pink), var(--neon-purple), var(--neon-blue))' }} />
            <div className="grid grid-cols-5 lg:grid-cols-10 gap-4">
              {marvelTop10.sort((a, b) => a.year - b.year).map((film, i) => (
                <div key={film.id} className="text-center">
                  <div className="relative flex justify-center mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: 'var(--neon-pink)', boxShadow: '0 0 8px var(--neon-pink)' }} />
                  </div>
                  <div className="font-bebas text-xl" style={{ color: i % 2 === 0 ? 'var(--neon-blue)' : 'var(--neon-pink)' }}>{film.year}</div>
                  <div className="font-golos text-xs text-gray-500 leading-tight">{film.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
