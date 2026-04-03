import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { catalogMovies, Movie } from "@/data/movies";

interface CatalogPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const genres = ["Все", "Фантастика", "Боевик", "Приключения", "Триллер", "Ужасы"];
const sortOptions = [
  { value: "rating", label: "По рейтингу" },
  { value: "year", label: "По году" },
  { value: "title", label: "По алфавиту" },
];

const PAGE_SIZE = 40;

export default function CatalogPage({ onNavigate }: CatalogPageProps) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Все");
  const [sort, setSort] = useState("rating");
  const [page, setPage] = useState(1);
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = [...catalogMovies];
    if (search) list = list.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
    if (genre !== "Все") list = list.filter(m => m.genre === genre);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "year") list.sort((a, b) => b.year - a.year);
    else list.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    return list;
  }, [search, genre, sort]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="min-h-screen pt-14" style={{ background: 'var(--dark-bg)' }}>
      {/* Header */}
      <div className="py-12 px-6 grid-bg" style={{ borderBottom: '1px solid var(--dark-border)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded" style={{ background: 'var(--neon-blue)', boxShadow: '0 0 10px var(--neon-blue)' }} />
            <h1 className="font-bebas text-5xl" style={{ color: 'var(--neon-blue)' }}>КАТАЛОГ ФИЛЬМОВ</h1>
          </div>
          <p className="font-golos text-gray-500 ml-4">{filtered.length} фильмов в базе</p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-14 z-40 py-4 px-6" style={{ background: 'rgba(8,11,20,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск фильма..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 rounded-lg font-golos text-sm text-white outline-none"
              style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}
            />
          </div>

          {/* Genre filters */}
          <div className="flex gap-2 flex-wrap">
            {genres.map(g => (
              <button
                key={g}
                onClick={() => { setGenre(g); setPage(1); }}
                className="px-3 py-1.5 rounded-full text-xs font-golos font-medium transition-all duration-200"
                style={genre === g ? {
                  background: 'var(--neon-blue)',
                  color: '#000',
                  boxShadow: '0 0 10px rgba(0,212,255,0.5)'
                } : {
                  background: 'var(--dark-card)',
                  color: '#94a3b8',
                  border: '1px solid var(--dark-border)'
                }}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-1.5 rounded-lg font-golos text-sm text-gray-300 outline-none cursor-pointer"
            style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {paginated.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🎬</div>
            <div className="font-bebas text-3xl text-gray-600">НИЧЕГО НЕ НАЙДЕНО</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {paginated.map((film: Movie) => (
              <button
                key={film.id}
                onClick={() => onNavigate("player", film)}
                onMouseEnter={() => setHovered(film.id)}
                onMouseLeave={() => setHovered(null)}
                className="text-left group"
                style={{ animation: 'fadeIn 0.3s ease forwards' }}
              >
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={hovered === film.id ? {
                    boxShadow: '0 0 20px rgba(0,212,255,0.3), 0 8px 32px rgba(0,0,0,0.5)',
                    transform: 'translateY(-4px) scale(1.02)',
                    border: '1px solid var(--neon-blue)'
                  } : {
                    border: '1px solid var(--dark-border)'
                  }}
                >
                  <div className="relative">
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="movie-overlay absolute inset-0" />
                    {hovered === film.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 animate-fade-in">
                        <div className="rounded-full p-3" style={{ background: 'var(--neon-blue)', boxShadow: '0 0 20px var(--neon-blue)' }}>
                          <Icon name="Play" size={22} style={{ color: '#000' }} />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-black/70" style={{ color: 'var(--neon-yellow)' }}>
                      <Icon name="Star" size={10} style={{ fill: 'var(--neon-yellow)' }} />
                      {film.rating}
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs px-1.5 py-0.5 rounded font-golos" style={{ background: 'rgba(0,212,255,0.2)', color: 'var(--neon-blue)', border: '1px solid rgba(0,212,255,0.3)' }}>
                      {film.genre}
                    </div>
                  </div>
                  <div className="p-2.5" style={{ background: 'var(--dark-card)' }}>
                    <div className="font-golos font-semibold text-xs text-white leading-tight line-clamp-2 mb-1">{film.title}</div>
                    <div className="font-golos text-xs text-gray-600">{film.year} · {film.duration}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setPage(p => p + 1)}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-golos font-semibold"
              style={{ border: '1px solid var(--neon-blue)', color: 'var(--neon-blue)' }}
            >
              <Icon name="RotateCcw" size={16} />
              Загрузить ещё ({filtered.length - paginated.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
