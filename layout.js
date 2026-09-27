export const metadata = {
  title: "spa & wellness",
  description: "ระบบสั่งบริการสปาและดูแลสุขภาพ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
