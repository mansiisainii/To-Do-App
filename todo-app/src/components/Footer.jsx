import { useMemo } from "react";
import quotes from "../data/quotes";

/**
 * Footer displays a motivational quote that is seeded by today's date,
 * ensuring it stays the same all day and changes the next day.
 */
export default function Footer() {
  const todaysQuote = useMemo(() => {
    // Build a simple date seed: YYYYMMDD → integer
    const now = new Date();
    const seed =
      now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    const index = seed % quotes.length;
    return quotes[index];
  }, []);

  return (
    <footer className="app-footer">
      <p className="quote">"{todaysQuote}"</p>
    </footer>
  );
}
