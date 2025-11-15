export const metadata = {
  title: "Wedding Invitation",
  description: "Wedding Party Invitation Page",
  };
  
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="ja">
  <body style={{ margin: 0, fontFamily: "sans-serif" }}>{children}</body>
  </html>
  );
  }