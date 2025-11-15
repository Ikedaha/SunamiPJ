export default function Page() {
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "serif",
        background: "#faf8f5",
        paddingBottom: 40,
      }}
    >
      {/* --- Hero Image (Replace later with real couple photo) --- */}
      <img
        src="https://picsum.photos/900/400?grayscale"
        alt="couple photo dummy"
        style={{ width: "100%", maxHeight: "350px", objectFit: "cover" }}
      />

      {/* --- Title Section --- */}
      <h1 style={{ marginTop: 30, fontSize: 36 }}>Wedding Party Invitation</h1>
      <p style={{ fontSize: 18, marginTop: -10 }}>
        大切な仲間とともに祝う特別なひととき
      </p>

      {/* --- Date Section --- */}
      <h2 style={{ marginTop: 40 }}>📅 日時</h2>
      <p style={{ fontSize: 20 }}>2025年11月22日（土）</p>
      <p style={{ fontSize: 16, marginTop: -10 }}>
        当日は角南の自宅までお迎えに上がります。
      </p>

      {/* --- Venue Section --- */}
      <h2 style={{ marginTop: 40 }}>📍 会場（仮）</h2>
      <p style={{ fontSize: 20 }}>HARBOR VIEW HALL AKASHI（仮名）</p>
      <p style={{ fontSize: 14, marginTop: -10 }}>
        ※会場は後ほど正式にご案内します
      </p>

      {/* --- Map Section --- */}
      <div style={{ marginTop: 20 }}>
        {/* TODO: 後で正式な会場のGoogle Maps埋め込みURLに差し替えること */}
        <iframe
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.5900377089635!2d134.99738517629074!3d34.648433785928736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3554dd84896a5d0b%3A0xf16c445828a53ea4!2z5pel5pys44CB56We5aWI!5e0!3m2!1sja!2sjp!4v9999999999999"
        />
      </div>

      {/* --- RSVP Section --- */}
      <h2 style={{ marginTop: 50 }}>📩 RSVP</h2>
      <p>参加可否のご回答はこちらからお願いします。</p>
      <a
        href="https://forms.gle/example"
        target="_blank"
        style={{ fontSize: 18 }}
      >
        Google Form
      </a>
    </div>
  );
}
