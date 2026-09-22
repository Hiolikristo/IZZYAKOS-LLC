import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pantryster",
  description: "Community resource coordination for food, shelter, transportation, volunteers, donors and partners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
