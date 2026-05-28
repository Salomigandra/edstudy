export default function Logo({ size = 36, showText = true }) {
  return (
    <div className="flex items-center gap-2.5">
      {/*
        "The Open Path" — EdStudy logo mark.

        Concept (inspired by reference):
          · Open book — knowledge base, the platform itself
          · Orange left page + green right page — warmth, growth (and India flag tones)
          · Winding white S-path through the book — the education journey / pathways
          · 4-pointed star sparkle — the guiding light inside the cap
          · Graduation cap (navy) — academic achievement sitting on top

        No container background — transparent mark, designed for white/light surfaces.
        ViewBox 0 0 40 40, centre at (20, 20).

        Layer order (bottom → top):
          1  Orange arc "sun" — visible in the gap between pages and cap
          2  Left page fill (orange)
          3  Right page fill (green)
          4  Book spine + outline strokes (navy)
          5  Cap dome / body (navy)
          6  Mortarboard flat board (navy)
          7  Tassel (navy)
          8  White winding S-path
          9  4-pointed star sparkle (white, inside the cap board)
      */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        {/* ── 1 · Orange arc — sun / horizon between cap and book ──────── */}
        {/*
          Filled dome from (11, 18.5) → (29, 18.5), peaking at ~y 11.
          Covered by the nav cap in the middle; the orange "sliver" shows
          at the sides where pages begin and cap ends.
        */}
        <path d="M11 18.5 A10 7.5 0 0 1 29 18.5 Z" fill="#fb923c" />

        {/* ── 2 · Left page (orange) ───────────────────────────────────── */}
        <path
          d="M20 21
             L4  17
             L4  31
             C7.5 36.5  13.5 39  20 39
             Z"
          fill="#fb923c"
        />

        {/* ── 3 · Right page (green) ───────────────────────────────────── */}
        <path
          d="M20 21
             L36 17
             L36 31
             C32.5 36.5  26.5 39  20 39
             Z"
          fill="#16a34a"
        />

        {/* ── 4 · Book spine + outer frame (navy) ──────────────────────── */}
        {/* Sides + bottom curve — top is intentionally open (open book) */}
        <path
          d="M4 17
             L4 31
             C7.5 37  13.5 39.5  20 39.5
             C26.5 39.5  32.5 37  36 31
             L36 17"
          stroke="#1e3a8a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Centre spine fold */}
        <line
          x1="20" y1="21"
          x2="20" y2="39.5"
          stroke="#1e3a8a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* ── 5 · Cap dome / crown (navy) ──────────────────────────────── */}
        <path
          d="M14 8
             L14 13
             C14 15.2  16.8 16.5  20 16.5
             C23.2 16.5  26 15.2  26 13
             L26 8"
          fill="#1e3a8a"
        />

        {/* ── 6 · Mortarboard flat board (navy diamond) ────────────────── */}
        <path d="M20 2 L33 8 L20 14 L7 8 Z" fill="#1e3a8a" />

        {/* ── 7 · Tassel (curves off the right corner of the board) ─────── */}
        <path
          d="M33 8 C34 11  35.5 14.5  34.5 17.5"
          stroke="#1e3a8a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="34.5" cy="19" r="1.8" fill="#1e3a8a" />

        {/* ── 8 · White winding S-path — the education journey ─────────── */}
        {/*
          Starts at spine top (20, 21), winds left through the orange page,
          crosses back through the green page, exits near the spine bottom.
          The S-shape echoes a road / river — "your path through knowledge".
        */}
        <path
          d="M20 21
             C18 24  15.5 27  18 30
             C20.5 33  22.5 36  20 38.5"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* ── 9 · 4-pointed star sparkle (white, inside the cap board) ─── */}
        {/*
          Tight bezier "compass rose" centred at (20, 10).
          Fully enclosed by the navy diamond — shows as a bright white
          guiding-light gem inside the graduation cap.
        */}
        <path
          d="M20 7
             C20.4 8.6  21.5 9.6  23.2 10.2
             C21.5 10.8  20.4 11.8  20 13.4
             C19.6 11.8  18.5 10.8  16.8 10.2
             C18.5 9.6  19.6 8.6  20 7
             Z"
          fill="white"
        />
      </svg>

      {/* Wordmark — "Ed" near-black, "Study" deep navy to match the mark */}
      {showText && (
        <span className="text-[18px] font-black tracking-tight leading-none text-slate-900">
          Ed<span className="text-[#1e3a8a]">Study</span>
        </span>
      )}
    </div>
  );
}
