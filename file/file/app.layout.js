export const metadata = {
  title: "LDP Eviction Appeal System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#f5f5f5", fontFamily: "Arial" }}>
        {children}
      </body>
    </html>
  );
}
