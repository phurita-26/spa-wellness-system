import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>spa & wellness</h1>
      <p>ระบบสั่งบริการสปาและดูแลสุขภาพ</p>

      <nav style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <Link href="/generate-qr">สำหรับต้อนรับ (สร้าง QR)</Link>
        <Link href="/kitchen">สำหรับพนักงานเตรียมสปา</Link>
      </nav>
    </main>
  );
}
