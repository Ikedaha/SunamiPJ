// app/page.tsx
'use client';

import { TouchEvent, WheelEvent, useRef, useState } from 'react';

const NAV_ITEMS = [
  { id: 'top', label: 'Top' },
  { id: 'info', label: 'Details' },
  { id: 'schedule', label: 'Flow' },
  { id: 'form', label: 'Contact' },
] as const;

type NavId = (typeof NAV_ITEMS)[number]['id'];

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // ★ ホイール連打防止用のタイムスタンプ
  const lastWheelTimeRef = useRef(0);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const now = Date.now();

    // 連続でガンガン切り替わらないようにクールダウン
    if (now - lastWheelTimeRef.current < 500) return;

    const threshold = 20; // 微妙な揺れは無視
    if (Math.abs(e.deltaY) < threshold) return;

    // 下方向スクロール → 次のページへ
    if (e.deltaY > 0 && currentIndex < NAV_ITEMS.length - 1) {
      lastWheelTimeRef.current = now;
      setCurrentIndex((prev) => Math.min(prev + 1, NAV_ITEMS.length - 1));
    }

    // 上方向スクロール → 前のページへ
    if (e.deltaY < 0 && currentIndex > 0) {
      lastWheelTimeRef.current = now;
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

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
        height: '100dvh', // ← スマホ向けの実高さ
        overflow: 'hidden',
        position: 'fixed', // ← ビューポートに固定
        inset: 0, // ← top/right/bottom/left: 0
      }}
    >
      {/* 横スライダーコンテナ */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
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
              padding: '56px 20px 80px',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* 背景グラデーション（他ページとつながるベース） */}
            <div
              style={{
                position: 'absolute',
                top: '-18%',
                left: '-30%',
                width: '85%',
                height: '50%',
                background:
                  'linear-gradient(135deg, rgba(193,230,235,0.85), rgba(244,196,207,0.85))',
                transform: 'rotate(-14deg)',
                borderRadius: 70,
                opacity: 0.6,
                filter: 'blur(2px)',
                zIndex: 0,
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
                opacity: 0.5,
                zIndex: 0,
              }}
            />

            {/* ビーチ画像（中心はしっかり、外側フェードアウト） */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("/images/beach.png")',
                backgroundSize: '120% 120%',
                backgroundPosition: 'center 75%',
                opacity: 0.95,
                zIndex: 1,

                WebkitMaskImage:
                  'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 38%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)',
                maskImage:
                  'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 38%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
            />

            {/* タイトルブロック（ガラスカード） */}
            <div
              style={{
                position: 'relative',
                maxWidth: 420,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                zIndex: 3,
              }}
            >
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 12,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  color: '#374151',
                  opacity: 0.9,
                }}
              >
                SUNAMI'S FRIENDS PRESENTS
              </div>
              <div
                style={{
                  padding: '18px 28px',
                  borderRadius: 28,
                  background: 'rgba(255, 255, 255, 0.28)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
                  textAlign: 'center',
                  color: '#0f172a',
                  width: 'fit-content',
                  margin: '0 auto',
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Georgia, "Times New Roman", "游明朝", "Yu Mincho", serif',
                  }}
                >
                  HIYUU & TOMOKA
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    color: '#374151',
                    opacity: 0.9,
                  }}
                >
                  WEDDING SELEBLATION
                </div>
              </div>
            </div>
          </section>

          {/* 2. DETAIL */}
          <section
            style={{
              width: '100vw',
              height: '100vh',
              padding: '72px 20px 96px',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* 背景のグラデ（このセクション専用） */}
            <div
              style={{
                position: 'absolute',
                top: '-16%',
                right: '-22%',
                width: '70%',
                height: '50%',
                background:
                  'radial-gradient(circle at 0% 0%, rgba(254,249,195,0.8), rgba(252,231,243,0.8))',
                borderRadius: 80,
                opacity: 0.7,
                filter: 'blur(2px)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-18%',
                left: '-5%',
                width: '65%',
                height: '45%',
                background:
                  'radial-gradient(circle at 100% 100%, rgba(191,219,254,0.9), rgba(248,250,252,0.9))',
                borderRadius: 80,
                opacity: 0.5,
                zIndex: 0,
              }}
            />

            {/* 浮いている写真たち（カードに少しかぶる位置） */}
            <div
              style={{
                position: 'absolute',
                top: '10%', // タイトルより下・カード上辺あたり
                right: '0%',
                width: 140,
                height: 140,
                borderRadius: '40% 60% 55% 45%',
                backgroundImage: 'url("/images/hero-couple.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 14px 30px rgba(15,23,42,0.45)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '14%',
                left: '6%',
                width: 200,
                height: 200,
                borderRadius: '50% 40% 60% 40%',
                backgroundImage: 'url("/images/petals-heart.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 14px 30px rgba(15,23,42,0.45)',
                zIndex: 1,
              }}
            />
            {/* 追加の写真（ミラー＆ロビー） */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '4%',
                width: 150,
                height: 150,
                borderRadius: '52% 48% 58% 42%',
                backgroundImage: 'url("/images/nanohana.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 12px 26px rgba(15,23,42,0.45)',
                opacity: 0.95,
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-1%',
                right: '-4%',
                width: 200,
                height: 150,
                borderRadius: '46% 54% 52% 48%',
                backgroundImage: 'url("/images/hotel-lobby.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 12px 26px rgba(15,23,42,0.5)',
                opacity: 0.95,
                zIndex: 1,
              }}
            />

            {/* コンテンツ本体 */}
            <div
              style={{
                position: 'relative',
                maxWidth: 420,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 2,
              }}
            >
              {/* タイトル（カード外・大きめ） */}
              <header
                style={{
                  marginBottom: 20,
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                    marginBottom: -4,
                  }}
                >
                  ご案内
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 40,
                    letterSpacing: '0.01em',
                    fontWeight: 700,
                    color: '#0f172a',
                    fontFamily: 'Georgia, "Times New Roman", "游明朝", "Yu Mincho", serif',
                  }}
                >
                  DETAILS
                </h2>
              </header>

              {/* 詳細カード：ガラス調＋文字は濃いめで読みやすく */}
              <div
                style={{
                  padding: '22px 20px 26px',
                  borderRadius: 28,
                  background: 'rgba(255, 255, 255, 0.26)', // さっきより少し透明寄り
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.45)',
                  boxShadow: '0 6px 30px rgba(0,0,0,0.18)',
                  minHeight: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                {/* 小ラベル */}
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#6b7280',
                    marginBottom: 4,
                  }}
                >
                  INFORMATION
                </div>

                {/* 本文 */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                    fontSize: 16, // ← 少し大きめ
                    lineHeight: 1.8,
                    color: '#111827', // ← 濃い色で読みやすく
                  }}
                >
                  {/* 日時 */}
                  <div
                    style={{
                      paddingBottom: 10,
                      borderBottom: '1px solid rgba(255,255,255,0.5)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        color: '#6b7280',
                        marginBottom: 2,
                      }}
                    >
                      日時
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      2025年11月23日(日)
                      {/* ※必要なら日付はここで調整 */}
                    </div>
                  </div>

                  {/* 集合 */}
                  <div
                    style={{
                      paddingBottom: 10,
                      borderBottom: '1px solid rgba(255,255,255,0.5)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        color: '#6b7280',
                        marginBottom: 2,
                      }}
                    >
                      集合
                    </div>
                    <div>
                      当日<strong>15:00ごろ</strong>に角南宅までお迎え
                    </div>
                  </div>

                  {/* 場所 */}
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        color: '#6b7280',
                        marginBottom: 2,
                      }}
                    >
                      場所
                    </div>
                    <div>兵庫県内を予定</div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: '#6b7280',
                      }}
                    >
                      ※ 詳細な会場名は、当日のお楽しみとさせてください。
                    </div>
                  </div>
                </div>
              </div>

              {/* 下の余白（ナビとの距離） */}
              <div style={{ height: 20 }} />
            </div>
          </section>

          {/* 3. FLOW */}
          <section
            style={{
              width: '100vw',
              height: '100vh',
              padding: '72px 20px 96px',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* 背景のグラデ（2ページ目とトーンを合わせる） */}
            <div
              style={{
                position: 'absolute',
                top: '-18%',
                left: '-24%',
                width: '70%',
                height: '50%',
                background:
                  'radial-gradient(circle at 0% 0%, rgba(191,219,254,0.9), rgba(252,231,243,0.8))',
                borderRadius: 80,
                opacity: 0.75,
                filter: 'blur(2px)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-20%',
                right: '-18%',
                width: '65%',
                height: '45%',
                background:
                  'radial-gradient(circle at 100% 100%, rgba(252,231,243,0.9), rgba(248,250,252,0.9))',
                borderRadius: 80,
                opacity: 0.7,
                zIndex: 0,
              }}
            />

            {/* 浮いている写真たち（未使用の素材を中心に配置） */}
            <div
              style={{
                position: 'absolute',
                top: '-2%',
                right: '-5%',
                width: 200,
                height: 150,
                borderRadius: '40% 60% 55% 45%',
                backgroundImage: 'url("/images/pool-garden.png")', // ← 未使用のロビーのやつ
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 14px 30px rgba(15,23,42,0.45)',
                zIndex: 1,
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '5%',
                right: '10%', // 少しはみ出す＋次ページに続く感じ
                width: 300,
                height: 200,
                borderRadius: '50% 40% 60% 40%',
                backgroundImage: 'url("/images/wedding-papers.png")', // ← 手元アップ写真
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 14px 30px rgba(15,23,42,0.45)',
                zIndex: 1,
              }}
            />

            <div
              style={{
                position: 'absolute',
                top: '20%',
                right: '55%',
                width: 110,
                height: 110,
                borderRadius: '46% 54% 48% 52%',
                backgroundImage: 'url("/images/tulips.png")', // ← 花束の未使用のやつ
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 12px 26px rgba(15,23,42,0.4)',
                zIndex: 1,
              }}
            />

            {/* コンテンツ本体 */}
            <div
              style={{
                position: 'relative',
                maxWidth: 420,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 2,
              }}
            >
              {/* タイトル（2ページ目と構成を揃える） */}
              <header
                style={{
                  marginBottom: 20,
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                    marginBottom: -4,
                  }}
                >
                  当日のながれ
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 40,
                    letterSpacing: '0.01em',
                    fontWeight: 700,
                    color: '#0f172a',
                    fontFamily: 'Georgia, "Times New Roman", "游明朝", "Yu Mincho", serif',
                  }}
                >
                  FLOW
                </h2>
              </header>

              {/* タイムラインカード（ガラス調・5項目ぶんの枠だけ用意） */}
              <div
                style={{
                  padding: '22px 20px 26px',
                  borderRadius: 28,
                  background: 'rgba(255, 255, 255, 0.26)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.45)',
                  boxShadow: '0 6px 30px rgba(0,0,0,0.18)',
                  minHeight: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#6b7280',
                    marginBottom: 4,
                  }}
                >
                  SCHEDULE
                </div>

                {/* ここは後で文言をいじってもらう想定 */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: '#111827',
                  }}
                >
                  {/* 1 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        minWidth: 64,
                        fontSize: 12,
                        color: '#6b7280',
                      }}
                    >
                      {/* TODO: 時間を入れる */}
                      15:00ごろ
                    </div>
                    <div>
                      <strong>角南様宅 お迎え</strong>
                      <div
                        style={{
                          fontSize: 13,
                          color: '#6b7280',
                          marginTop: 2,
                        }}
                      >
                        ご自宅でお待ちください。
                      </div>
                    </div>
                  </div>

                  {/* 2 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        minWidth: 64,
                        fontSize: 12,
                        color: '#6b7280',
                      }}
                    >
                      16:00ごろ
                    </div>
                    <div>
                      <strong>会場着</strong>
                      <div
                        style={{
                          fontSize: 13,
                          color: '#6b7280',
                          marginTop: 2,
                        }}
                      >
                        会場まで、1時間ほどの予定です。
                      </div>
                    </div>
                  </div>

                  {/* 3 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        minWidth: 64,
                        fontSize: 12,
                        color: '#6b7280',
                      }}
                    >
                      16:00-
                    </div>
                    <div>
                      <strong>パーティ</strong>
                      <div
                        style={{
                          fontSize: 13,
                          color: '#6b7280',
                          marginTop: 2,
                        }}
                      >
                        お酒と食事をお楽しみください。
                      </div>
                    </div>
                  </div>

                  {/* 4 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        minWidth: 64,
                        fontSize: 12,
                        color: '#6b7280',
                      }}
                    >
                      21:00―
                    </div>
                    <div>
                      <strong>解散予定</strong>
                    </div>
                  </div>

                  {/* 5 */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        minWidth: 64,
                        fontSize: 12,
                        color: '#6b7280',
                      }}
                    >
                      22:00ごろ
                    </div>
                    <div>
                      <strong>角南様宅 到着</strong>
                      <div
                        style={{
                          fontSize: 13,
                          color: '#6b7280',
                          marginTop: 2,
                        }}
                      >
                        終了時間の詳細は当日相談できればと思います。
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 下の余白（ナビとの距離） */}
              <div style={{ height: 20 }} />
            </div>
          </section>

          {/* 4. CONTACT */}
          <section
            style={{
              width: '100vw',
              height: '100vh',
              padding: '72px 20px 96px',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* 背景グラデーション（柔らかめトーン） */}
            <div
              style={{
                position: 'absolute',
                top: '-20%',
                left: '-18%',
                width: '70%',
                height: '50%',
                background:
                  'radial-gradient(circle at 0% 0%, rgba(191,219,254,0.9), rgba(221,239,253,0.9))',
                borderRadius: 80,
                opacity: 0.85,
                filter: 'blur(2px)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-22%',
                right: '-20%',
                width: '70%',
                height: '50%',
                background:
                  'radial-gradient(circle at 100% 100%, rgba(252,231,243,0.95), rgba(248,250,252,0.95))',
                borderRadius: 80,
                opacity: 0.8,
                zIndex: 0,
              }}
            />

            {/* ピックアップトラック画像を大きく */}
            <div
              style={{
                position: 'absolute',
                top: '13%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 320,
                height: 220,
                backgroundImage: 'url("/images/pickup-truck.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '42% 58% 55% 45%',
                boxShadow: '0 16px 40px rgba(15,23,42,0.45)',
                opacity: 0.98,
                zIndex: 1,
              }}
            />

            {/* コンテンツ本体 */}
            <div
              style={{
                position: 'relative',
                maxWidth: 420,
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 2,
              }}
            >
              {/* タイトル */}
              <header
                style={{
                  marginBottom: 20,
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                    marginBottom: -4,
                  }}
                >
                  ご連絡について
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 32,
                    letterSpacing: '0.01em',
                    fontWeight: 700,
                    color: '#0f172a',
                    fontFamily: 'Georgia, "Times New Roman", "游明朝", "Yu Mincho", serif',
                  }}
                >
                  CONTACT
                </h2>
              </header>

              {/* ガラスカード：LINE で送ってもらう案内 */}
              <div
                style={{
                  marginTop: 120, // ← ここをしっかり下げた！（12 → 70）
                  padding: '22px 20px 26px',
                  borderRadius: 28,
                  background: 'rgba(255, 255, 255, 0.26)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.45)',
                  boxShadow: '0 6px 30px rgba(0,0,0,0.18)',
                  minHeight: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: '#4b5563',
                    lineHeight: 1.6,
                  }}
                >
                  準備のため、下記の内容をお知らせ下さい。
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    fontSize: 15,
                    color: '#111827',
                  }}
                >
                  <li>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: 13,
                        color: '#6b7280',
                        marginBottom: 6,
                      }}
                    >
                      1. アレルギー・苦手なもの
                    </span>
                    <div>
                      食べられない食材やお酒のNGなどがあれば
                      <br />
                      教えてください。
                    </div>
                  </li>
                  <li>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: 13,
                        color: '#6b7280',
                        marginBottom: 6,
                      }}
                    >
                      2. 当日のご要望
                    </span>
                    <div>
                      ペースや体調面での配慮、
                      <br />
                      こうしてほしい等があればぜひ。
                    </div>
                  </li>
                  <li>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: 13,
                        color: '#6b7280',
                        marginBottom: 6,
                      }}
                    >
                      3. 質問・確認したいこと
                    </span>
                    <div>
                      服装・持ち物・その他気になることがあれば、
                      <br />
                      お気軽にどうぞ。
                    </div>
                  </li>
                </ul>

                {/* LINE へのリンク（URLはあとで差し替え） */}
                <div
                  style={{
                    marginTop: 0,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <a
                    href="https://line.me/ti/p/58rr3fs6Mp" // TODO: ここを実際のLINEアカウントURLに変更
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 18px',
                      borderRadius: 999,
                      border: '1px solid rgba(15,23,42,0.12)',
                      background: 'rgba(255,255,255,0.9)',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#111827',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(148,163,184,0.6)',
                    }}
                  >
                    PUSH TO CONTACT
                  </a>
                </div>

                <div
                  style={{
                    marginTop: 0,
                    paddingBottom: 4,
                    fontSize: 11,
                    color: '#6b7280',
                    textAlign: 'center',
                  }}
                >
                  ※ うまく開かない場合は、水間のLINEに直接ご連絡ください。
                </div>
              </div>

              {/* 下の余白（ナビとの距離） */}
              <div style={{ height: 20 }} />
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
        角南夫妻大スーパーお祝い実行委員会
      </footer>
    </main>
  );
}
