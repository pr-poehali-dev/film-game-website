import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { marvelTop10, catalogMovies } from "@/data/movies";

interface GamesPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const quizQuestions = [
  { q: "Как зовут Железного Человека?", answers: ["Тони Старк", "Стив Роджерс", "Тор Одинсон", "Брюс Бэннер"], correct: 0 },
  { q: "Какой камень был на планете Зандар?", answers: ["Разума", "Силы", "Пространства", "Времени"], correct: 1 },
  { q: "Кто играет Капитана Америка?", answers: ["Роберт Дауни мл.", "Крис Эванс", "Крис Хемсворт", "Марк Руффало"], correct: 1 },
  { q: "В каком году вышли первые Мстители?", answers: ["2010", "2011", "2012", "2013"], correct: 2 },
  { q: "Что такое вибраниум?", answers: ["Металл Асгарда", "Редкий металл из Ваканды", "Камень бесконечности", "Артефакт Таноса"], correct: 1 },
  { q: "Как зовут сестру Тора?", answers: ["Фрейя", "Сиф", "Хела", "Валькирия"], correct: 2 },
  { q: "Кто убил Гамору?", answers: ["Железный человек", "Танос", "Гаморра сама", "Ворота Вечности"], correct: 1 },
  { q: "Кодовое слово для Зимнего Солдата?", answers: ["Красная книга", "Железный кулак", "Желёзный", "Гидра"], correct: 0 },
];

const guessMovies = [...marvelTop10, ...catalogMovies.slice(0, 20)].slice(0, 12);

const GAMES = [
  { id: "quiz", icon: "HelpCircle", name: "Кино-Квиз", desc: "10 вопросов о Marvel и кино", color: "var(--neon-pink)", emoji: "🎯" },
  { id: "guess", icon: "Eye", name: "Угадай фильм", desc: "Угадай по постеру и описанию", color: "var(--neon-blue)", emoji: "🎬" },
  { id: "memory", icon: "Brain", name: "Мемори-кино", desc: "Найди пары постеров", color: "var(--neon-green)", emoji: "🧠" },
  { id: "reaction", icon: "Zap", name: "Реакция", desc: "Нажимай как можно быстрее", color: "var(--neon-yellow)", emoji: "⚡" },
  { id: "typing", icon: "Type", name: "Кино-Тайпинг", desc: "Набери название фильма быстро", color: "var(--neon-purple)", emoji: "⌨️" },
];

export default function GamesPage({ onNavigate }: GamesPageProps) {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Quiz state
  const [qIdx, setQIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  // Guess state
  const [guessIdx, setGuessIdx] = useState(0);
  const [guessScore, setGuessScore] = useState(0);
  const [guessDone, setGuessDone] = useState(false);
  const [guessRevealed, setGuessRevealed] = useState(false);

  // Memory state
  const [cards, setCards] = useState<{ id: number; movieId: number; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memScore, setMemScore] = useState(0);

  // Reaction state
  const [reactionActive, setReactionActive] = useState(false);
  const [reactionStart, setReactionStart] = useState(0);
  const [reactionResult, setReactionResult] = useState<number | null>(null);
  const [reactionReady, setReactionReady] = useState(false);

  // Typing state
  const [typingInput, setTypingInput] = useState("");
  const [typingTarget, setTypingTarget] = useState(marvelTop10[0].title);
  const [typingScore, setTypingScore] = useState(0);
  const [typingIdx, setTypingIdx] = useState(0);

  const resetQuiz = () => { setQIdx(0); setQuizScore(0); setQuizAnswered(null); setQuizDone(false); };
  const resetGuess = () => { setGuessIdx(0); setGuessScore(0); setGuessDone(false); setGuessRevealed(false); };

  const initMemory = () => {
    const pool = guessMovies.slice(0, 6);
    const doubled = [...pool, ...pool].map((m, i) => ({ id: i, movieId: m.id, flipped: false, matched: false }));
    setCards(doubled.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMemScore(0);
  };

  useEffect(() => { if (activeGame === "memory") initMemory(); }, [activeGame]);

  const flipCard = (idx: number) => {
    if (cards[idx].flipped || cards[idx].matched || flippedCards.length === 2) return;
    const newFlipped = [...flippedCards, idx];
    const newCards = cards.map((c, i) => i === idx ? { ...c, flipped: true } : c);
    setCards(newCards);
    setFlippedCards(newFlipped);
    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (newCards[a].movieId === newCards[b].movieId) {
        setTimeout(() => {
          setCards(c => c.map((card, i) => newFlipped.includes(i) ? { ...card, matched: true } : card));
          setFlippedCards([]);
          setMemScore(s => s + 1);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(c => c.map((card, i) => newFlipped.includes(i) ? { ...card, flipped: false } : card));
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  const startReaction = () => {
    setReactionResult(null);
    setReactionActive(false);
    setReactionReady(true);
    const delay = 1500 + Math.random() * 3000;
    setTimeout(() => { setReactionActive(true); setReactionStart(Date.now()); }, delay);
  };

  const clickReaction = () => {
    if (!reactionReady) return;
    if (!reactionActive) { setReactionResult(-1); setReactionReady(false); return; }
    setReactionResult(Date.now() - reactionStart);
    setReactionActive(false);
    setReactionReady(false);
  };

  const checkTyping = (val: string) => {
    setTypingInput(val);
    if (val.toLowerCase().trim() === typingTarget.toLowerCase().trim()) {
      setTypingScore(s => s + 1);
      const next = (typingIdx + 1) % marvelTop10.length;
      setTypingIdx(next);
      setTypingTarget(marvelTop10[next].title);
      setTypingInput("");
    }
  };

  if (!activeGame) {
    return (
      <div className="min-h-screen pt-14" style={{ background: 'var(--dark-bg)' }}>
        <div className="py-16 px-6 grid-bg" style={{ borderBottom: '1px solid var(--dark-border)' }}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="font-bebas text-7xl md:text-9xl mb-4" style={{ color: 'var(--neon-green)', textShadow: '0 0 40px var(--neon-green)' }}>
              МИНИ-ИГРЫ
            </div>
            <p className="font-golos text-xl text-gray-400">Проверь свои знания о кино и Marvel!</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map(game => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className="card-dark rounded-2xl p-8 text-left group hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{game.emoji}</div>
              <div className="font-bebas text-3xl mb-2" style={{ color: game.color }}>{game.name}</div>
              <p className="font-golos text-gray-400 text-sm">{game.desc}</p>
              <div className="mt-6 flex items-center gap-2 font-golos font-semibold text-sm" style={{ color: game.color }}>
                Играть <Icon name="ArrowRight" size={16} />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 px-4 py-8" style={{ background: 'var(--dark-bg)' }}>
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setActiveGame(null)} className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 font-golos transition-colors">
          <Icon name="ArrowLeft" size={16} /> Все игры
        </button>

        {/* QUIZ */}
        {activeGame === "quiz" && (
          <div className="rounded-2xl p-8" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
            <div className="font-bebas text-4xl mb-2" style={{ color: 'var(--neon-pink)' }}>КИНО-КВИЗ</div>
            {quizDone ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🏆</div>
                <div className="font-bebas text-6xl" style={{ color: 'var(--neon-yellow)' }}>{quizScore}/{quizQuestions.length}</div>
                <p className="font-golos text-gray-300 mt-2 mb-6">{quizScore >= 7 ? "Ты настоящий эксперт Marvel!" : quizScore >= 4 ? "Хороший результат!" : "Попробуй ещё раз!"}</p>
                <button onClick={resetQuiz} className="btn-neon-pink px-8 py-3 rounded-full font-golos font-bold text-white">
                  Ещё раз
                </button>
              </div>
            ) : (
              <>
                <div className="mb-2 font-golos text-sm text-gray-500">Вопрос {qIdx + 1} / {quizQuestions.length} · Счёт: {quizScore}</div>
                <div className="h-1 rounded-full mb-6" style={{ background: 'var(--dark-border)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(qIdx / quizQuestions.length) * 100}%`, background: 'var(--neon-pink)' }} />
                </div>
                <h2 className="font-golos text-xl font-semibold text-white mb-6">{quizQuestions[qIdx].q}</h2>
                <div className="space-y-3">
                  {quizQuestions[qIdx].answers.map((ans, i) => (
                    <button
                      key={i}
                      disabled={quizAnswered !== null}
                      onClick={() => {
                        setQuizAnswered(i);
                        if (i === quizQuestions[qIdx].correct) setQuizScore(s => s + 1);
                        setTimeout(() => {
                          if (qIdx + 1 >= quizQuestions.length) setQuizDone(true);
                          else { setQIdx(q => q + 1); setQuizAnswered(null); }
                        }, 1000);
                      }}
                      className="w-full text-left px-5 py-3 rounded-xl font-golos font-medium transition-all"
                      style={
                        quizAnswered === null ? { background: 'var(--dark-bg)', border: '1px solid var(--dark-border)', color: '#e2e8f0' } :
                        i === quizQuestions[qIdx].correct ? { background: 'rgba(0,255,136,0.2)', border: '1px solid var(--neon-green)', color: 'var(--neon-green)' } :
                        quizAnswered === i ? { background: 'rgba(255,0,128,0.2)', border: '1px solid var(--neon-pink)', color: 'var(--neon-pink)' } :
                        { background: 'var(--dark-bg)', border: '1px solid var(--dark-border)', color: '#555' }
                      }
                    >
                      {String.fromCharCode(65 + i)}. {ans}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* GUESS */}
        {activeGame === "guess" && (
          <div className="rounded-2xl p-8" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
            <div className="font-bebas text-4xl mb-2" style={{ color: 'var(--neon-blue)' }}>УГАДАЙ ФИЛЬМ</div>
            {guessDone ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎬</div>
                <div className="font-bebas text-6xl" style={{ color: 'var(--neon-blue)' }}>{guessScore}/{guessMovies.length}</div>
                <p className="font-golos text-gray-300 mb-6">Угадано правильно!</p>
                <button onClick={resetGuess} className="btn-neon-blue px-8 py-3 rounded-full font-golos font-bold text-black">Ещё раз</button>
              </div>
            ) : (
              <>
                <div className="mb-4 font-golos text-sm text-gray-500">Фильм {guessIdx + 1} / {guessMovies.length} · Угадано: {guessScore}</div>
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img
                    src={guessMovies[guessIdx].poster}
                    alt="?"
                    className="w-full h-64 object-cover"
                    style={{ filter: guessRevealed ? 'none' : 'blur(20px) brightness(0.3)' }}
                  />
                  {!guessRevealed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="font-bebas text-6xl text-white opacity-40">?</div>
                    </div>
                  )}
                </div>
                <p className="font-golos text-gray-300 mb-4">{guessMovies[guessIdx].description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setGuessRevealed(true)}
                    className="flex-1 py-3 rounded-xl font-golos font-semibold"
                    style={{ border: '1px solid var(--neon-blue)', color: 'var(--neon-blue)' }}
                  >Показать постер</button>
                  <button
                    onClick={() => {
                      setGuessScore(s => s + 1);
                      if (guessIdx + 1 >= guessMovies.length) setGuessDone(true);
                      else { setGuessIdx(i => i + 1); setGuessRevealed(false); }
                    }}
                    className="flex-1 py-3 rounded-xl font-golos font-bold text-black"
                    style={{ background: 'var(--neon-blue)' }}
                  >✓ Угадал!</button>
                  <button
                    onClick={() => {
                      if (guessIdx + 1 >= guessMovies.length) setGuessDone(true);
                      else { setGuessIdx(i => i + 1); setGuessRevealed(false); }
                    }}
                    className="flex-1 py-3 rounded-xl font-golos font-medium text-gray-400"
                    style={{ border: '1px solid var(--dark-border)' }}
                  >✗ Не знаю</button>
                </div>
                {guessRevealed && (
                  <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
                    <span className="font-bebas text-2xl" style={{ color: 'var(--neon-blue)' }}>{guessMovies[guessIdx].title}</span>
                    <span className="font-golos text-gray-400 ml-2">{guessMovies[guessIdx].year}</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* MEMORY */}
        {activeGame === "memory" && (
          <div className="rounded-2xl p-6" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bebas text-4xl" style={{ color: 'var(--neon-green)' }}>МЕМОРИ</div>
              <div className="font-golos text-gray-400">Найдено: <span className="text-white font-bold">{memScore}/6</span></div>
            </div>
            {memScore === 6 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🧠</div>
                <div className="font-bebas text-4xl" style={{ color: 'var(--neon-green)' }}>ОТЛИЧНО!</div>
                <p className="font-golos text-gray-300 mb-4">Все пары найдены!</p>
                <button onClick={initMemory} className="px-8 py-3 rounded-full font-golos font-bold text-black" style={{ background: 'var(--neon-green)' }}>Заново</button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {cards.map((card, idx) => {
                  const movie = guessMovies.find(m => m.id === card.movieId);
                  return (
                    <button
                      key={card.id}
                      onClick={() => flipCard(idx)}
                      className="aspect-[2/3] rounded-lg overflow-hidden transition-all duration-300"
                      style={card.matched ? { border: '2px solid var(--neon-green)', boxShadow: '0 0 10px rgba(0,255,136,0.4)' } :
                        card.flipped ? { border: '1px solid var(--neon-blue)' } :
                        { background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}
                    >
                      {card.flipped || card.matched ? (
                        <img src={movie?.poster} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🎬</div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* REACTION */}
        {activeGame === "reaction" && (
          <div className="rounded-2xl p-8 text-center" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
            <div className="font-bebas text-4xl mb-6" style={{ color: 'var(--neon-yellow)' }}>ТЕСТ РЕАКЦИИ</div>
            <div
              onClick={clickReaction}
              className="rounded-2xl h-48 flex items-center justify-center cursor-pointer transition-all duration-200 select-none mb-6"
              style={{
                background: reactionActive ? 'var(--neon-green)' : reactionReady ? 'rgba(255,0,128,0.2)' : 'var(--dark-bg)',
                border: reactionActive ? '2px solid var(--neon-green)' : '2px solid var(--dark-border)',
                boxShadow: reactionActive ? '0 0 40px rgba(0,255,136,0.6)' : 'none'
              }}
            >
              <div className="font-bebas text-4xl" style={{ color: reactionActive ? '#000' : '#666' }}>
                {reactionActive ? "ЖМИТЕ!" : reactionReady ? "Ждите..." : "Нажмите Start"}
              </div>
            </div>
            {reactionResult !== null && (
              <div className="mb-6 font-bebas text-5xl" style={{ color: reactionResult === -1 ? 'var(--neon-pink)' : 'var(--neon-yellow)' }}>
                {reactionResult === -1 ? "СЛИШКОМ РАНО!" : `${reactionResult} мс`}
              </div>
            )}
            <button onClick={startReaction} className="px-8 py-3 rounded-full font-golos font-bold text-black" style={{ background: 'var(--neon-yellow)' }}>
              {reactionReady ? "Отменить" : "Start"}
            </button>
          </div>
        )}

        {/* TYPING */}
        {activeGame === "typing" && (
          <div className="rounded-2xl p-8" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
            <div className="font-bebas text-4xl mb-2" style={{ color: 'var(--neon-purple)' }}>КИНО-ТАЙПИНГ</div>
            <p className="font-golos text-gray-400 mb-6">Набери название фильма без ошибок. Счёт: <span className="text-white font-bold">{typingScore}</span></p>
            <div className="p-4 rounded-xl mb-4 text-center" style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}>
              <div className="font-bebas text-3xl text-white">{typingTarget}</div>
            </div>
            <input
              type="text"
              value={typingInput}
              onChange={e => checkTyping(e.target.value)}
              placeholder="Начни набирать..."
              className="w-full px-4 py-3 rounded-xl font-golos text-white outline-none text-lg"
              style={{
                background: 'var(--dark-bg)',
                border: `2px solid ${typingInput.length > 0 && typingTarget.toLowerCase().startsWith(typingInput.toLowerCase()) ? 'var(--neon-green)' : typingInput.length > 0 ? 'var(--neon-pink)' : 'var(--dark-border)'}`
              }}
              autoFocus
            />
            <p className="font-golos text-xs text-gray-600 mt-2">Вводи точное название фильма на русском</p>
          </div>
        )}
      </div>
    </div>
  );
}
