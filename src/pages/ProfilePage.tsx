import { useState } from "react";
import Icon from "@/components/ui/icon";
import { marvelTop10 } from "@/data/movies";

interface ProfilePageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const tabs = ["Профиль", "Избранное", "История", "Подписка"];

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [tab, setTab] = useState(0);
  const [name, setName] = useState("Кинозритель");
  const [editName, setEditName] = useState(false);

  const watched = marvelTop10.slice(0, 5);
  const favorites = marvelTop10.slice(0, 3);

  const tabColors = ['var(--neon-pink)', 'var(--neon-blue)', 'var(--neon-green)', 'var(--neon-yellow)'];

  return (
    <div className="min-h-screen pt-14" style={{ background: 'var(--dark-bg)' }}>
      {/* Header */}
      <div className="py-12 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0010 0%, #080b14 70%)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-5xl mx-auto relative z-10 flex items-center gap-6 flex-wrap">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl border-animated"
              style={{ background: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))', border: '2px solid var(--neon-pink)' }}>
              🎬
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'var(--neon-green)', border: '2px solid var(--dark-bg)' }}>
              <Icon name="Check" size={12} style={{ color: '#000' }} />
            </div>
          </div>

          <div>
            {editName ? (
              <div className="flex items-center gap-2">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="font-bebas text-3xl bg-transparent border-b outline-none text-white"
                  style={{ borderColor: 'var(--neon-pink)' }}
                  onBlur={() => setEditName(false)}
                  onKeyDown={e => e.key === "Enter" && setEditName(false)}
                  autoFocus
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="font-bebas text-4xl text-white">{name}</div>
                <button onClick={() => setEditName(true)} className="text-gray-600 hover:text-white transition-colors">
                  <Icon name="Pencil" size={16} />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 mt-1">
              <div className="px-2.5 py-0.5 rounded-full text-xs font-golos font-bold" style={{ background: 'var(--neon-pink)', color: '#000' }}>
                PRO
              </div>
              <span className="font-golos text-gray-500 text-sm">Активна до 3 мая 2024</span>
            </div>
          </div>

          <div className="ml-auto flex gap-6">
            {[
              { val: "47", label: "Просмотрено" },
              { val: "12", label: "Избранных" },
              { val: "8", label: "Игр сыграно" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-bebas text-3xl" style={{ color: tabColors[i] }}>{s.val}</div>
                <div className="font-golos text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-14 z-40 px-6 py-0" style={{ background: 'rgba(8,11,20,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="max-w-5xl mx-auto flex">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className="px-6 py-4 font-golos font-medium text-sm transition-all relative"
              style={tab === i ? { color: tabColors[i] } : { color: '#64748b' }}
            >
              {t}
              {tab === i && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: tabColors[i] }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Profile settings */}
        {tab === 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
              <div className="font-bebas text-2xl mb-4" style={{ color: 'var(--neon-pink)' }}>НАСТРОЙКИ</div>
              <div className="space-y-4">
                {["Имя пользователя", "Email", "Пароль"].map((field, i) => (
                  <div key={i}>
                    <label className="block font-golos text-sm text-gray-500 mb-1">{field}</label>
                    <input
                      type={field === "Пароль" ? "password" : "text"}
                      defaultValue={field === "Email" ? "user@cineon.ru" : field === "Пароль" ? "••••••••" : name}
                      className="w-full px-4 py-2.5 rounded-xl font-golos text-white outline-none text-sm"
                      style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}
                    />
                  </div>
                ))}
                <button className="btn-neon-pink px-6 py-2.5 rounded-xl font-golos font-semibold text-sm text-white">
                  Сохранить
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl p-6" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
                <div className="font-bebas text-2xl mb-4" style={{ color: 'var(--neon-blue)' }}>УВЕДОМЛЕНИЯ</div>
                <div className="space-y-3">
                  {["Новые фильмы", "Обновления Marvel", "Новые игры", "Напоминание о подписке"].map((n, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="font-golos text-gray-300 text-sm">{n}</span>
                      <div className="w-12 h-6 rounded-full relative cursor-pointer"
                        style={{ background: i < 2 ? 'var(--neon-blue)' : 'var(--dark-border)' }}>
                        <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                          style={{ left: i < 2 ? '26px' : '2px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
                <div className="font-bebas text-2xl mb-3" style={{ color: 'var(--neon-green)' }}>ДОСТИЖЕНИЯ</div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { emoji: "🎬", name: "Первый фильм" },
                    { emoji: "⚡", name: "Marvel-фанат" },
                    { emoji: "🏆", name: "Квиз-чемпион" },
                    { emoji: "🔥", name: "7 дней подряд" },
                    { emoji: "👑", name: "PRO участник" },
                    { emoji: "🎮", name: "Игрок" },
                  ].map((a, i) => (
                    <div key={i} className="text-center p-3 rounded-xl"
                      style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}>
                      <div className="text-2xl mb-1">{a.emoji}</div>
                      <div className="font-golos text-xs text-gray-500">{a.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites */}
        {tab === 1 && (
          <div>
            <h2 className="font-bebas text-3xl mb-6" style={{ color: 'var(--neon-blue)' }}>ИЗБРАННЫЕ ФИЛЬМЫ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {favorites.map(film => (
                <button
                  key={film.id}
                  onClick={() => onNavigate("player", film)}
                  className="card-dark rounded-xl overflow-hidden text-left"
                >
                  <div className="relative">
                    <img src={film.poster} alt={film.title} className="w-full h-52 object-cover" />
                    <div className="movie-overlay absolute inset-0" />
                    <div className="absolute top-2 right-2">
                      <Icon name="Heart" size={18} style={{ color: 'var(--neon-pink)', fill: 'var(--neon-pink)' }} />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-golos font-semibold text-sm text-white truncate">{film.title}</div>
                    <div className="font-golos text-xs text-gray-500 mt-0.5">{film.year}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {tab === 2 && (
          <div>
            <h2 className="font-bebas text-3xl mb-6" style={{ color: 'var(--neon-green)' }}>ИСТОРИЯ ПРОСМОТРОВ</h2>
            <div className="space-y-3">
              {watched.map((film, i) => (
                <button
                  key={film.id}
                  onClick={() => onNavigate("player", film)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                  style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}
                >
                  <img src={film.poster} alt={film.title} className="w-14 h-18 object-cover rounded-lg" style={{ height: '72px' }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-golos font-semibold text-white">{film.title}</div>
                    <div className="font-golos text-sm text-gray-500">{film.year} · {film.duration}</div>
                    <div className="mt-2 h-1 rounded-full" style={{ background: 'var(--dark-border)' }}>
                      <div className="h-full rounded-full" style={{ width: `${20 + i * 15}%`, background: 'var(--neon-green)' }} />
                    </div>
                  </div>
                  <div className="text-gray-600 font-golos text-sm">{20 + i * 15}%</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Subscription tab */}
        {tab === 3 && (
          <div className="max-w-md">
            <div className="rounded-2xl p-6" style={{ background: 'var(--dark-card)', border: '1px solid var(--neon-pink)', boxShadow: '0 0 20px rgba(255,0,128,0.1)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="font-bebas text-3xl" style={{ color: 'var(--neon-pink)' }}>PRO ПОДПИСКА</div>
                <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(0,255,136,0.2)', color: 'var(--neon-green)' }}>АКТИВНА</div>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { label: "Следующее списание", val: "3 мая 2024" },
                  { label: "Сумма", val: "10₽/месяц" },
                  { label: "Способ оплаты", val: "•••• 1234" },
                  { label: "Статус", val: "Активна" },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--dark-border)' }}>
                    <span className="font-golos text-sm text-gray-500">{r.label}</span>
                    <span className="font-golos text-sm text-white font-medium">{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => onNavigate("subscription")} className="flex-1 py-2.5 rounded-xl font-golos font-semibold text-sm btn-neon-pink text-white">
                  Продлить
                </button>
                <button className="px-4 py-2.5 rounded-xl font-golos text-sm text-red-500 hover:bg-red-500/10 transition-colors" style={{ border: '1px solid rgba(239,68,68,0.3)' }}>
                  Отменить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
