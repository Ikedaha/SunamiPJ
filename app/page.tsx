// app/page.tsx
'use client';

import { FormEvent, TouchEvent, useState } from 'react';

const PICKUP_TIME_OPTIONS = [
  '13:00ごろ',
  '13:30ごろ',
  '14:00ごろ',
  '14:30ごろ',
  '15:00ごろ',
  'おまかせ',
];

const NAV_ITEMS = [
  { id: 'top', label: 'Top' },
  { id: 'info', label: 'Details' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'form', label: 'Reply' },
] as const;

type NavId = (typeof NAV_ITEMS)[number]['id'];

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    setIsSent(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('送信に失敗しました。時間をおいて再度お試しください。');
      }

      setIsSent(true);
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.message || 'エラーが発生しました。');
    } finally {
      setIsSending(false);
    }
  }

  function goTo(id: NavId) {
    const idx = NAV_ITEMS.findIndex((n) => n.id === id);
    if (idx >= 0) setCurrentIndex(idx);
  }

  // スワイプ操作
  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    setTouchEndX(e.touches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStartX === null || touchEndX === null) return;
    const diff = touchStartX - touchEndX;
    const threshold = 60;

    if (diff > threshold && currentIndex < NAV_ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (diff < -threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setTouchStartX(null);
    setTouchEndX(null);
  }

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 横スライダーコンテナ */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: `${NAV_ITEMS.length * 100}vw`,
            height: '100%',
            transform: `translateX(-${currentIndex * 100}vw)`,
            transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          {/* 1. TOP */}
          <section
            style={{
              width: '100vw',
              height: '100vh',
              padding: '72px 20px 96px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* 背景の柔らかいグラデーションレイヤー */}
            <div
              style={{
                position: 'absolute',
                top: '-15%',
                left: '-30%',
                width: '80%',
                height: '45%',
                background: 'linear-gradient(135deg, rgba(193,230,235,0.9), rgba(244,196,207,0.9))',
                transform: 'rotate(-12deg)',
                borderRadius: 60,
                opacity: 0.7,
                filter: 'blur(1px)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-25%',
                right: '-25%',
                width: 260,
                height: 260,
                background: 'radial-gradient(circle at 20% 20%, #fdf2ff, #bfdbfe)',
                borderRadius: '60% 40% 55% 45%',
                opacity: 0.6,
              }}
            />

            <div
              style={{
                position: 'relative',
                maxWidth: 420,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                    marginBottom: 12,
                  }}
                >
                  SUNAMI WEDDING GATHERING
                </div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 34,
                    lineHeight: 1.15,
                    color: '#0f172a',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: 'Georgia, "Times New Roman", "游明朝", "Yu Mincho", serif',
                  }}
                >
                  Sunami Wedding
                  <br />
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 4,
                      fontSize: 26,
                      letterSpacing: '0.08em',
                    }}
                  >
                    Celebration
                  </span>
                </h1>
                <p
                  style={{
                    marginTop: 16,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: '#4b5563',
                  }}
                >
                  ひゆう・ともかの結婚を祝って、
                  <br />
                  いつもの5人で集まる会を予定しています。
                </p>
                <div
                  style={{
                    marginTop: 18,
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  2025.11.22 Sat
                </div>
              </div>

              {/* 中央〜中段にかけて、写真を曲線で重ねる */}
              <div
                style={{
                  position: 'relative',
                  marginTop: 32,
                  height: 230,
                }}
              >
                {/* 大きいビーチの有機的なブロブ */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 10,
                    width: '78%',
                    height: '78%',
                    backgroundImage: 'url("/images/beach.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '60% 40% 55% 45%',
                    boxShadow: '0 18px 45px rgba(15,23,42,0.45)',
                    transform: 'rotate(-4deg)',
                  }}
                />
                {/* 手前のチューリップ円 */}
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: 96,
                    height: 96,
                    borderRadius: '50%',
                    backgroundImage: 'url("/images/tulips.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 16px 32px rgba(15,23,42,0.45)',
                    border: '3px solid #ffffff',
                  }}
                />
              </div>
            </div>
          </section>

          {/* 2. 案内 */}
          <section
            style={{
              width: '100vw',
              height: '100vh',
              padding: '72px 20px 96px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* 背景ブロブ */}
            <div
              style={{
                position: 'absolute',
                top: '16%',
                right: '-18%',
                width: 260,
                height: 260,
                backgroundImage: 'url("/images/nanohana.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '45% 55% 60% 40%',
                opacity: 0.9,
                filter: 'brightness(1.1)',
              }}
            />
            {/* 花びらハートの小さめブロブ */}
            <div
              style={{
                position: 'absolute',
                left: '-6%',
                bottom: '16%',
                width: 130,
                height: 130,
                backgroundImage: 'url("/images/petals-heart.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50% 50% 40% 60%',
                boxShadow: '0 12px 28px rgba(15,23,42,0.45)',
              }}
            />

            <div
              style={{
                position: 'relative',
                maxWidth: 420,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: 24,
                  padding: '18px 16px',
                  boxShadow: '0 12px 30px rgba(148,163,184,0.7)',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#0f172a',
                  }}
                >
                  Party Details
                </h2>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: '#4b5563',
                  }}
                >
                  明石エリアの会場での開催を予定しています。
                  <br />
                  詳しい場所や集合方法は、決まり次第あらためて共有します。
                </p>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: '#4b5563',
                  }}
                >
                  当日は、角南の自宅までこちらからお迎えに上がります。
                  <br />
                  ざっくりとしたお迎えの時間帯だけ、教えてもらえたら助かります。
                </p>
              </div>
            </div>
          </section>

          {/* 3. 当日の流れ */}
          <section
            style={{
              width: '100vw',
              height: '100vh',
              padding: '72px 20px 96px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* 背景のサンフラワーブロブ */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '-18%',
                width: 260,
                height: 260,
                backgroundImage: 'url("/images/sunflowers.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '55% 45% 60% 40%',
                opacity: 0.75,
                filter: 'brightness(1.05)',
              }}
            />
            {/* 車のブロブ（右下） */}
            <div
              style={{
                position: 'absolute',
                right: '-10%',
                bottom: '12%',
                width: 180,
                height: 140,
                backgroundImage: 'url("/images/pickup-truck.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '40% 60% 55% 45%',
                boxShadow: '0 16px 38px rgba(15,23,42,0.6)',
              }}
            />

            <div
              style={{
                position: 'relative',
                maxWidth: 420,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#0f172a',
                  }}
                >
                  Schedule (tentative)
                </h2>
                <p
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: '#6b7280',
                  }}
                >
                  時間や内容は、今後調整する可能性があります。
                </p>

                {/* 中央にタイムライン */}
                <div
                  style={{
                    marginTop: 20,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      paddingLeft: 18,
                    }}
                  >
                    {/* 縦ライン（少し曲線風にグラデーション） */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 6,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        background: 'linear-gradient(180deg, #C1E6EB, #F4C4CF)',
                        borderRadius: 999,
                      }}
                    />
                    {[
                      {
                        time: '13:00 ごろ',
                        text: '角南宅周辺に集合（順番にお迎え）',
                      },
                      {
                        time: '16:00 ごろ',
                        text: '明石エリアの会場へ移動',
                      },
                      {
                        time: '20:30 ごろ',
                        text: '解散（その場の雰囲気で前後する可能性あり）',
                      },
                    ].map((item, index) => (
                      <div
                        key={item.time}
                        style={{
                          display: 'flex',
                          marginBottom: index === 2 ? 0 : 14,
                        }}
                      >
                        {/* ドット */}
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            marginTop: 2,
                            marginRight: 8,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #C1E6EB, #F4C4CF)',
                            boxShadow:
                              '0 0 0 4px rgba(255,255,255,0.9), 0 6px 14px rgba(15,23,42,0.35)',
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#111827',
                            }}
                          >
                            {item.time}
                          </div>
                          <div
                            style={{
                              marginTop: 2,
                              fontSize: 13,
                              color: '#4b5563',
                            }}
                          >
                            {item.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. ひとこと・時間フォーム */}
          <section
            style={{
              width: '100vw',
              height: '100vh',
              padding: '72px 20px 96px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* 背景にカップル＆ホテルをブロブで重ねる */}
            <div
              style={{
                position: 'absolute',
                top: '8%',
                right: '-14%',
                width: 220,
                height: 200,
                backgroundImage: 'url("/images/couple-mirror.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50% 60% 40% 60%',
                opacity: 0.95,
                boxShadow: '0 16px 34px rgba(15,23,42,0.55)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '-18%',
                bottom: '10%',
                width: 230,
                height: 180,
                backgroundImage: 'url("/images/hotel-lobby.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '60% 40% 55% 45%',
                opacity: 0.8,
                filter: 'brightness(0.98)',
              }}
            />

            <div
              style={{
                position: 'relative',
                maxWidth: 420,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: 22,
                  padding: '16px 16px 14px',
                  boxShadow: '0 14px 32px rgba(148,163,184,0.75)',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#0f172a',
                  }}
                >
                  Your Message
                </h2>
                <p
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: '#4b5563',
                  }}
                >
                  大まかな集合時間と、アレルギーやひとことがあれば教えてください。
                  <br />
                  ざっくりで大丈夫です。
                </p>

                <form
                  onSubmit={handleSubmit}
                  style={{
                    marginTop: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    textAlign: 'left',
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      fontSize: 13,
                      color: '#111827',
                    }}
                  >
                    <span>お迎え希望時間帯</span>
                    <select
                      name="pickupTime"
                      required
                      defaultValue=""
                      style={{
                        font: 'inherit',
                        padding: '9px 11px',
                        borderRadius: 10,
                        border: '1px solid rgba(148,163,184,0.9)',
                        background: '#F9FAFB',
                        color: '#111827',
                      }}
                    >
                      <option value="" disabled>
                        選択してください
                      </option>
                      {PICKUP_TIME_OPTIONS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      fontSize: 13,
                      color: '#111827',
                    }}
                  >
                    <span>ひとこと・アレルギーなどあれば</span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="アレルギーや、当日の希望などあれば自由に書いてください。"
                      style={{
                        font: 'inherit',
                        padding: '9px 11px',
                        borderRadius: 10,
                        border: '1px solid rgba(148,163,184,0.9)',
                        background: '#F9FAFB',
                        color: '#111827',
                        resize: 'vertical',
                      }}
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={isSending}
                    style={{
                      marginTop: 6,
                      padding: 10,
                      borderRadius: 999,
                      border: 'none',
                      background: 'linear-gradient(135deg, #C1E6EB, #F4C4CF)',
                      color: '#111827',
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: isSending ? 'default' : 'pointer',
                      transition: 'transform 0.08s ease, box-shadow 0.08s ease, opacity 0.1s ease',
                      boxShadow: isSending ? 'none' : '0 8px 20px rgba(148,163,184,0.7)',
                      opacity: isSending ? 0.7 : 1,
                    }}
                  >
                    {isSending ? '送信中…' : '送信する'}
                  </button>

                  {isSent && (
                    <p
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        color: '#166534',
                        textAlign: 'center',
                      }}
                    >
                      入力ありがとうございました。いただいた内容をもとに、当日の段取りを整えます。
                    </p>
                  )}
                  {error && (
                    <p
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        color: '#B91C1C',
                        textAlign: 'center',
                      }}
                    >
                      {error}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 下部ナビゲーション */}
      <nav
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 40,
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6,
          padding: '4px 6px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 10px 28px rgba(148,163,184,0.8)',
          zIndex: 10,
        }}
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(item.id)}
              style={{
                minWidth: 68,
                padding: '6px 10px',
                borderRadius: 999,
                border: 'none',
                fontSize: 12,
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                background: isActive ? 'linear-gradient(135deg, #C1E6EB, #F4C4CF)' : 'transparent',
                color: isActive ? '#111827' : '#6B7280',
                boxShadow: isActive ? '0 4px 12px rgba(148,163,184,0.7)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* 全画面共通のフッター */}
      <footer
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 10,
          transform: 'translateX(-50%)',
          fontSize: 11,
          color: '#6B7280',
          zIndex: 5,
          textAlign: 'center',
        }}
      >
        角南夫妻お祝い実行委員会
      </footer>
    </main>
  );
}
