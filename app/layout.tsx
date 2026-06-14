import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "GYM-Split",
  description: "6-Day Hypertrophy Tracker",
};

// This prevents the phone from auto-zooming when you tap the screen
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#141414" }}>
        {children}
      </body>
    </html>
  );
}