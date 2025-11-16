// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sunami Wedding Gathering',
  description: 'ひゆう＆ともか 結婚お祝いパーティーのご案内ページ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif',
          backgroundImage: `
            radial-gradient(circle at top left, rgba(193,230,235,0.9), transparent 55%),
            radial-gradient(circle at bottom right, rgba(244,196,207,0.9), transparent 50%),
            linear-gradient(135deg, #fdfcfb, #e7f3ff)
          `,
          color: '#0f172a',
          overflow: 'hidden',
        }}
      >
        {children}
      </body>
    </html>
  );
}
