import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "catalog", label: "Каталог", icon: "Film" },
  { id: "marvel", label: "Marvel TOP 10", icon: "Zap" },
  { id: "player", label: "Плеер", icon: "Play" },
  { id: "games", label: "Мини-игры", icon: "Gamepad2" },
  { id: "subscription", label: "Подписка", icon: "Star" },
  { id: "profile", label: "Кабинет", icon: "User" },
  { id: "support", label: "Поддержка", icon: "MessageCircle" },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(8,11,20,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a2540' }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 group">
          <span className="font-bebas text-2xl tracking-widest" style={{ color: 'var(--neon-pink)', textShadow: '0 0 15px var(--neon-pink)' }}>CINEON</span>
          <span className="font-bebas text-sm text-gray-500 tracking-wider">КИНО & ИГРЫ</span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-golos font-medium transition-all duration-200 ${
                currentPage === item.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={currentPage === item.id ? {
                color: 'var(--neon-pink)',
                background: 'rgba(255,0,128,0.1)',
                boxShadow: '0 0 10px rgba(255,0,128,0.2)'
              } : {}}
            >
              <Icon name={item.icon} size={14} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("subscription")}
            className="hidden lg:flex btn-neon-pink px-4 py-1.5 rounded-full text-sm font-golos font-semibold text-white"
          >
            PRO 10₽/мес
          </button>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-1 animate-fade-in" style={{ background: 'rgba(8,11,20,0.98)' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-golos ${
                currentPage === item.id ? 'text-white bg-pink-500/10' : 'text-gray-400'
              }`}
              style={currentPage === item.id ? { color: 'var(--neon-pink)' } : {}}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
