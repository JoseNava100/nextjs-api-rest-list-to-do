import "./globals.css";

export const metadata = {
  title: "Next.js + Laravel",
  description: "Connect Next.js with Laravel API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
