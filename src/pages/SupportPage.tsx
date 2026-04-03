import { useState } from "react";
import Icon from "@/components/ui/icon";

const faqs = [
  { q: "Как отменить подписку?", a: "Перейдите в Личный кабинет → вкладка «Подписка» → кнопка «Отменить». Отмена происходит мгновенно, доступ сохраняется до конца оплаченного периода." },
  { q: "Как смотреть фильмы на телевизоре?", a: "Откройте сайт в браузере Smart TV или используйте функцию отображения экрана (Chromecast, AirPlay) со смартфона или ноутбука." },
  { q: "Почему видео грузится медленно?", a: "Проверьте скорость интернета. Для HD необходимо минимум 5 Мбит/с. Также попробуйте снизить качество видео в настройках плеера." },
  { q: "Можно ли смотреть без подписки?", a: "Да, без подписки доступен бесплатный демо-режим. Для полного доступа ко всем 500+ фильмам нужна PRO подписка за 10₽/мес." },
  { q: "На скольких устройствах работает подписка?", a: "PRO подписка позволяет смотреть на 3 устройствах одновременно." },
  { q: "Как изменить способ оплаты?", a: "В Личном кабинете перейдите на вкладку «Подписка» → «Изменить способ оплаты» и введите новые данные карты." },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState("general");

  const handleSend = () => {
    if (!formEmail || !formMsg) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-14" style={{ background: 'var(--dark-bg)' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #001020 0%, #080b14 70%)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10">
          <div className="font-bebas text-7xl md:text-9xl" style={{ color: 'var(--neon-blue)', textShadow: '0 0 40px var(--neon-blue)' }}>
            ПОДДЕРЖКА
          </div>
          <p className="font-golos text-xl text-gray-400 mt-2">Мы всегда готовы помочь 24/7</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Quick contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: "Mail", title: "Email", val: "support@cineon.ru", color: "var(--neon-pink)" },
            { icon: "MessageCircle", title: "Telegram", val: "@cineon_support", color: "var(--neon-blue)" },
            { icon: "Clock", title: "Время работы", val: "24/7, без выходных", color: "var(--neon-green)" },
          ].map((c, i) => (
            <div key={i} className="p-5 rounded-2xl flex items-center gap-4"
              style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${c.color}20`, border: `1px solid ${c.color}40` }}>
                <Icon name={c.icon} size={22} style={{ color: c.color }} />
              </div>
              <div>
                <div className="font-golos text-sm text-gray-500">{c.title}</div>
                <div className="font-golos font-semibold text-white text-sm">{c.val}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* FAQ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded" style={{ background: 'var(--neon-yellow)', boxShadow: '0 0 10px var(--neon-yellow)' }} />
              <h2 className="font-bebas text-4xl" style={{ color: 'var(--neon-yellow)' }}>ЧАСТЫЕ ВОПРОСЫ</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl overflow-hidden transition-all"
                  style={{ background: 'var(--dark-card)', border: `1px solid ${openFaq === i ? 'var(--neon-yellow)' : 'var(--dark-border)'}` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-golos font-semibold text-white pr-4">{faq.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={18}
                      style={{ color: 'var(--neon-yellow)', shrink: 0 }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 animate-fade-in">
                      <div className="h-px mb-4" style={{ background: 'var(--dark-border)' }} />
                      <p className="font-golos text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded" style={{ background: 'var(--neon-green)', boxShadow: '0 0 10px var(--neon-green)' }} />
              <h2 className="font-bebas text-4xl" style={{ color: 'var(--neon-green)' }}>НАПИСАТЬ НАМ</h2>
            </div>

            {sent ? (
              <div className="text-center py-12 rounded-2xl"
                style={{ background: 'var(--dark-card)', border: '1px solid var(--neon-green)' }}>
                <div className="text-5xl mb-4">✅</div>
                <div className="font-bebas text-4xl mb-2" style={{ color: 'var(--neon-green)' }}>ОТПРАВЛЕНО!</div>
                <p className="font-golos text-gray-400">Мы ответим в течение 2 часов</p>
                <button
                  onClick={() => { setSent(false); setFormMsg(""); setFormName(""); setFormEmail(""); }}
                  className="mt-6 px-6 py-2.5 rounded-xl font-golos text-sm"
                  style={{ border: '1px solid var(--dark-border)', color: '#94a3b8' }}
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <div className="rounded-2xl p-6 space-y-4"
                style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-border)' }}>
                {/* Category */}
                <div>
                  <label className="block font-golos text-sm text-gray-500 mb-2">Категория</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { val: "general", label: "Общее" },
                      { val: "payment", label: "Оплата" },
                      { val: "technical", label: "Техническое" },
                      { val: "content", label: "Контент" },
                    ].map(c => (
                      <button
                        key={c.val}
                        onClick={() => setCategory(c.val)}
                        className="px-3 py-1.5 rounded-full text-xs font-golos font-medium transition-all"
                        style={category === c.val ? {
                          background: 'var(--neon-green)',
                          color: '#000'
                        } : {
                          background: 'var(--dark-bg)',
                          border: '1px solid var(--dark-border)',
                          color: '#94a3b8'
                        }}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-golos text-sm text-gray-500 mb-1.5">Имя</label>
                  <input
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-2.5 rounded-xl font-golos text-white outline-none text-sm"
                    style={{ background: 'var(--dark-bg)', border: '1px solid var(--dark-border)' }}
                  />
                </div>

                <div>
                  <label className="block font-golos text-sm text-gray-500 mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl font-golos text-white outline-none text-sm"
                    style={{ background: 'var(--dark-bg)', border: `1px solid ${formEmail ? 'var(--neon-green)' : 'var(--dark-border)'}` }}
                  />
                </div>

                <div>
                  <label className="block font-golos text-sm text-gray-500 mb-1.5">Сообщение *</label>
                  <textarea
                    value={formMsg}
                    onChange={e => setFormMsg(e.target.value)}
                    placeholder="Опишите вашу проблему или вопрос..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl font-golos text-white outline-none text-sm resize-none"
                    style={{ background: 'var(--dark-bg)', border: `1px solid ${formMsg ? 'var(--neon-green)' : 'var(--dark-border)'}` }}
                  />
                </div>

                <button
                  onClick={handleSend}
                  disabled={!formEmail || !formMsg}
                  className="w-full py-3 rounded-xl font-golos font-bold transition-all"
                  style={formEmail && formMsg ? {
                    background: 'var(--neon-green)',
                    color: '#000',
                    boxShadow: '0 0 20px rgba(0,255,136,0.4)'
                  } : {
                    background: 'var(--dark-border)',
                    color: '#555'
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="Send" size={16} />
                    Отправить сообщение
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
