import { useState } from "react";
import Icon from "@/components/ui/icon";

interface SubscriptionPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const features = [
  { icon: "Film", text: "500+ фильмов в HD качестве" },
  { icon: "Wifi", text: "Онлайн-просмотр без буферизации" },
  { icon: "Ban", text: "Без рекламы и перебоев" },
  { icon: "Gamepad2", text: "Все мини-игры без ограничений" },
  { icon: "Star", text: "Ранний доступ к новинкам" },
  { icon: "Download", text: "Загрузка для просмотра офлайн" },
  { icon: "Users", text: "До 3 устройств одновременно" },
  { icon: "RefreshCw", text: "Отмена подписки в любой момент" },
];

export default function SubscriptionPage({ onNavigate }: SubscriptionPageProps) {
  const [step, setStep] = useState<"plan" | "pay" | "success">("plan");
  const [payMethod, setPayMethod] = useState("card");
  const [cardNum, setCardNum] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const formatCard = (val: string) => {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  };
  const formatDate = (val: string) => {
    return val.replace(/\D/g, "").slice(0, 4).replace(/(.{2})/, "$1/");
  };

  const handlePay = () => {
    if (!agree || !email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("success"); }, 2000);
  };

  return (
    <div className="min-h-screen pt-14" style={{ background: 'var(--dark-bg)' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a001a 0%, #080b14 60%)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, var(--neon-pink), var(--neon-purple))', boxShadow: '0 0 20px var(--neon-pink)' }} />
        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-golos font-bold mb-4"
            style={{ background: 'rgba(255,0,128,0.2)', border: '1px solid var(--neon-pink)', color: 'var(--neon-pink)' }}>
            ✦ СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
          </div>
          <div className="font-bebas text-7xl md:text-9xl" style={{ color: 'var(--neon-pink)', textShadow: '0 0 40px var(--neon-pink)' }}>
            PRO ДОСТУП
          </div>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="font-golos text-gray-500 line-through text-xl">299₽</span>
            <span className="font-bebas text-6xl" style={{ color: '#fff' }}>10₽</span>
            <span className="font-golos text-gray-400">/месяц</span>
          </div>
          <p className="font-golos text-gray-400 mt-2">Автосписание · Отмена в любой момент</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {step === "plan" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Features */}
            <div>
              <h2 className="font-bebas text-4xl mb-6" style={{ color: 'var(--neon-blue)' }}>ЧТО ВХОДИТ В PRO</h2>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(255,0,128,0.15)', border: '1px solid rgba(255,0,128,0.3)' }}>
                      <Icon name={f.icon} size={18} style={{ color: 'var(--neon-pink)' }} />
                    </div>
                    <span className="font-golos text-gray-200">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan card */}
            <div>
              <h2 className="font-bebas text-4xl mb-6" style={{ color: 'var(--neon-pink)' }}>ВЫБРАТЬ ПЛАН</h2>
              <div className="space-y-4">
                {[
                  { period: "1 месяц", price: "10₽", perMonth: "10₽/мес", popular: false },
                  { period: "6 месяцев", price: "50₽", perMonth: "8₽/мес", popular: true },
                  { period: "12 месяцев", price: "84₽", perMonth: "7₽/мес", popular: false },
                ].map((plan, i) => (
                  <button
                    key={i}
                    onClick={() => setStep("pay")}
                    className="w-full p-5 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] group relative"
                    style={plan.popular ? {
                      background: 'rgba(255,0,128,0.1)',
                      border: '2px solid var(--neon-pink)',
                      boxShadow: '0 0 20px rgba(255,0,128,0.2)'
                    } : {
                      background: 'var(--dark-card)',
                      border: '1px solid var(--dark-border)'
                    }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: 'var(--neon-pink)', color: '#000' }}>
                        ВЫГОДНЕЕ ВСЕГО
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-golos font-semibold text-white text-lg">{plan.period}</div>
                        <div className="font-golos text-gray-500 text-sm">{plan.perMonth}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bebas text-4xl" style={{ color: plan.popular ? 'var(--neon-pink)' : '#fff' }}>
                          {plan.price}
                        </div>
                        <div className="font-golos text-xs text-gray-500">единоразово</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 font-golos text-sm" style={{ color: 'var(--neon-pink)' }}>
                      Подключить <Icon name="ArrowRight" size={14} />
                    </div>
                  </button>
                ))}
              </div>
              <p className="font-golos text-xs text-gray-600 mt-4 text-center">
                Нажимая «Подключить», вы соглашаетесь с условиями сервиса и автоматическим продлением подписки
              </p>
            </div>
          </div>
        )}

        {step === "pay" && (
          <div className="max-w-md mx-auto">
            <button onClick={() => setStep("plan")} className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 font-golos transition-colors">
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>
            <div className="rounded-2xl p-8" style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
              <div className="font-bebas text-3xl mb-6" style={{ color: 'var(--neon-pink)' }}>ОПЛАТА</div>

              {/* Email */}
              <div className="mb-4">
                <label className="block font-golos text-sm text-gray-400 mb-1.5">Email для чека</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl font-golos text-white outline-none"
                  style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}
                />
              </div>

              {/* Pay method */}
              <div className="flex gap-2 mb-6">
                {["card", "sbp"].map(m => (
                  <button
                    key={m}
                    onClick={() => setPayMethod(m)}
                    className="flex-1 py-2 rounded-lg font-golos text-sm font-medium transition-all"
                    style={payMethod === m ? {
                      background: 'rgba(255,0,128,0.15)',
                      border: '1px solid var(--neon-pink)',
                      color: 'var(--neon-pink)'
                    } : {
                      background: 'var(--dark-bg)',
                      border: '1px solid var(--dark-border)',
                      color: '#94a3b8'
                    }}
                  >
                    {m === "card" ? "💳 Карта" : "📱 СБП"}
                  </button>
                ))}
              </div>

              {payMethod === "card" ? (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block font-golos text-sm text-gray-400 mb-1.5">Номер карты</label>
                    <input
                      type="text"
                      value={cardNum}
                      onChange={e => setCardNum(formatCard(e.target.value))}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 rounded-xl font-golos text-white outline-none tracking-widest"
                      style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-golos text-sm text-gray-400 mb-1.5">MM/ГГ</label>
                      <input
                        type="text"
                        value={cardDate}
                        onChange={e => setCardDate(formatDate(e.target.value))}
                        placeholder="12/27"
                        className="w-full px-4 py-3 rounded-xl font-golos text-white outline-none"
                        style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block font-golos text-sm text-gray-400 mb-1.5">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.slice(0, 3))}
                        placeholder="•••"
                        className="w-full px-4 py-3 rounded-xl font-golos text-white outline-none"
                        style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl text-center mb-6" style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}>
                  <div className="text-4xl mb-2">📱</div>
                  <p className="font-golos text-gray-400 text-sm">Оплата через СБП будет доступна после подключения платёжной системы</p>
                </div>
              )}

              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <div
                  onClick={() => setAgree(a => !a)}
                  className="mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all"
                  style={agree ? { background: 'var(--neon-pink)', border: '1px solid var(--neon-pink)' } : { border: '1px solid var(--dark-border)', background: 'transparent' }}
                >
                  {agree && <Icon name="Check" size={12} style={{ color: '#000' }} />}
                </div>
                <span className="font-golos text-sm text-gray-400">
                  Я соглашаюсь с <span style={{ color: 'var(--neon-blue)' }}>условиями сервиса</span> и автоматическим списанием <strong className="text-white">10₽/месяц</strong>
                </span>
              </label>

              <button
                onClick={handlePay}
                disabled={!agree || !email || loading}
                className="w-full py-4 rounded-xl font-golos font-bold text-lg transition-all"
                style={agree && email ? {
                  background: 'var(--neon-pink)',
                  color: '#fff',
                  boxShadow: '0 0 20px rgba(255,0,128,0.5)'
                } : {
                  background: 'var(--dark-border)',
                  color: '#666'
                }}
              >
                {loading ? "Обработка..." : "Оплатить 10₽"}
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="text-7xl mb-6 animate-bounce">🎉</div>
            <div className="font-bebas text-6xl mb-4" style={{ color: 'var(--neon-green)', textShadow: '0 0 30px var(--neon-green)' }}>
              ДОБРО ПОЖАЛОВАТЬ!
            </div>
            <p className="font-golos text-gray-300 text-lg mb-8">
              PRO подписка активирована. Следующее списание через 30 дней.
            </p>
            <div className="space-y-4 mb-8 text-left p-6 rounded-2xl" style={{ background: 'var(--dark-card)', border: '1px solid var(--neon-green)' }}>
              {["Доступ ко всем 500+ фильмам", "Мини-игры без ограничений", "Отсутствие рекламы", "Автопродление 10₽/мес"].map((f, i) => (
                <div key={i} className="flex items-center gap-3 font-golos text-gray-200">
                  <Icon name="CheckCircle" size={18} style={{ color: 'var(--neon-green)' }} />
                  {f}
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => onNavigate("catalog")} className="btn-neon-pink px-8 py-3 rounded-full font-golos font-bold text-white">
                Смотреть фильмы
              </button>
              <button onClick={() => onNavigate("profile")} className="px-8 py-3 rounded-full font-golos" style={{ border: '1px solid var(--dark-border)', color: '#94a3b8' }}>
                Мой кабинет
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
