export default function Page() {
  return (
  <div style={{ textAlign: "center" }}>
  <img
  src="https://picsum.photos/900/400"
  alt="dummy couple"
  style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
  />
  
  
  <h1>Wedding Party Invitation</h1>
  <p>〇〇 & 〇〇 の結婚をお祝いするパーティーにご招待します。</p>
  
  
  <h2>📅 日時</h2>
  <p>2025年3月15日（土） 17:00〜</p>
  
  
  <h2>📍 会場</h2>
  <p>THE PARTY HALL TOKYO</p>
  
  
  <div style={{ marginTop: 20 }}>
  <iframe
  width="100%"
  height="250"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
  src="https://www.google.com/maps/embed?pb=!1m18!..."
  />
  </div>
  
  
  <h2>📩 RSVP</h2>
  <p>参加可否の回答はこちらから</p>
  <a href="https://forms.gle/example" target="_blank">Google Form</a>
  </div>
  );
  }