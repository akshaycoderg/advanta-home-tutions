import { CalendarCheck, GraduationCap, ShieldCheck } from "lucide-react";

/** Original SVG illustration used on the tutor recruitment page. */
export function TutorIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[31rem]">
      <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-white/30 blur-2xl" />
      <svg
        viewBox="0 0 520 440"
        role="img"
        aria-label="Illustration of a friendly home tutor holding a book, with a shelf of books and a verification badge"
        className="relative h-auto w-full drop-shadow-[0_22px_44px_rgba(4,26,51,0.14)]"
      >
        <defs>
          <linearGradient id="tutor-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FBFF" />
            <stop offset="100%" stopColor="#E7F1FD" />
          </linearGradient>
          <clipPath id="tutor-round">
            <rect x="10" y="10" width="500" height="420" rx="36" />
          </clipPath>
        </defs>

        <g clipPath="url(#tutor-round)">
          <rect x="10" y="10" width="500" height="420" rx="36" fill="url(#tutor-bg)" />
          <circle cx="258" cy="210" r="178" fill="#DCE9F7" opacity="0.7" />
          <circle cx="88" cy="86" r="58" fill="#FFE8D3" opacity="0.75" />
          <circle cx="442" cy="360" r="44" fill="#C5DAEF" opacity="0.6" />

          <path d="M10 382h500v14c0 24-16 34-40 34H50c-24 0-40-10-40-34Z" fill="#E3EEFA" />

          {/* Shelf */}
          <g>
            <rect x="360" y="132" width="112" height="9" rx="4.5" fill="#C5DAEF" />
            <rect x="368" y="98" width="11" height="34" rx="4" fill="#1559B7" />
            <rect x="383" y="106" width="9" height="26" rx="4" fill="#FE6F09" />
            <rect x="396" y="92" width="12" height="40" rx="4" fill="#003F7E" />
            <rect x="412" y="108" width="9" height="24" rx="4" fill="#FFB070" />
            <rect x="425" y="100" width="11" height="32" rx="4" fill="#609AFA" />
            <rect x="440" y="111" width="9" height="21" rx="4" fill="#C5DAEF" />
            <rect x="454" y="96" width="10" height="36" rx="4" fill="#003F7E" opacity="0.55" />
          </g>

          {/* Figure */}
          <g>
            <path d="M226 338v58c0 7-6 13-13 13h-4c-7 0-13-6-13-13v-58Z" fill="#06294E" />
            <path d="M274 338v58c0 7-6 13-13 13h-4c-7 0-13-6-13-13v-58Z" fill="#06294E" />
            <rect x="196" y="404" width="46" height="16" rx="8" fill="#041E3B" />
            <rect x="258" y="404" width="46" height="16" rx="8" fill="#041E3B" />

            <rect x="190" y="196" width="128" height="156" rx="46" fill="#003F7E" />
            <path d="M254 200l-16 16-16-16" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
            <rect x="244" y="178" width="20" height="28" rx="10" fill="#E7B48E" />
            <circle cx="254" cy="148" r="39" fill="#F2C7A5" />
            <circle cx="286" cy="120" r="17" fill="#3A261C" />
            <path
              d="M216 150c-2-29 15-48 39-48 23 0 39 16 37 43-8-15-21-22-38-22-18 0-31 9-38 27Z"
              fill="#3A261C"
            />
            <circle cx="241" cy="152" r="10" fill="none" stroke="#17324D" strokeWidth="2.4" />
            <circle cx="267" cy="152" r="10" fill="none" stroke="#17324D" strokeWidth="2.4" />
            <path d="M251 152h6" stroke="#17324D" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M245 166c5 4 12 4 17 0" stroke="#17324D" strokeWidth="2.4" strokeLinecap="round" fill="none" />

            {/* Lanyard and ID card */}
            <path d="M240 208l14 26 14-26" stroke="#FE6F09" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="238" y="234" width="38" height="46" rx="6" fill="#FFFFFF" />
            <rect x="245" y="241" width="24" height="17" rx="3" fill="#DCE9F7" />
            <rect x="245" y="263" width="24" height="3.5" rx="1.75" fill="#93B9DD" />
            <rect x="245" y="270" width="16" height="3.5" rx="1.75" fill="#C5DAEF" />

            {/* Arms */}
            <path d="M196 230c-20 16-36 32-44 50" stroke="#F2C7A5" strokeWidth="15" strokeLinecap="round" fill="none" />
            <path d="M312 230c20 16 34 32 42 50" stroke="#F2C7A5" strokeWidth="15" strokeLinecap="round" fill="none" />
            <circle cx="150" cy="284" r="9" fill="#F2C7A5" />
            <circle cx="356" cy="284" r="9" fill="#F2C7A5" />

            {/* Book held at the side */}
            <g transform="rotate(-8 140 318)">
              <rect x="112" y="292" width="58" height="72" rx="7" fill="#FE6F09" />
              <rect x="118" y="298" width="46" height="60" rx="4" fill="#FFFFFF" />
              <rect x="146" y="292" width="7" height="72" rx="3.5" fill="#E85C00" />
              <path d="M124 310h16M124 320h16M124 330h10" stroke="#93B9DD" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>

          {/* Verification badge */}
          <g>
            <circle cx="112" cy="112" r="33" fill="#FFFFFF" stroke="#D3E4F8" strokeWidth="3" />
            <path d="M99 112l9 9 17-19" stroke="#0F7A55" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>

          {/* Accents */}
          <path d="M420 66l4 9 9 4-9 4-4 9-4-9-9-4 9-4Z" fill="#FE6F09" opacity="0.85" />
          <circle cx="70" cy="260" r="5" fill="#FE6F09" opacity="0.7" />
          <circle cx="456" cy="240" r="6" fill="#1559B7" opacity="0.35" />
          <path d="M46 330h28M60 316v28" stroke="#93B9DD" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>
      </svg>

      <div className="pointer-events-none absolute -top-2 right-0 hidden animate-float rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-soft backdrop-blur sm:block">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[0.8rem] font-bold text-navy-900">Structured review</span>
            <span className="block text-[0.65rem] text-muted">Documents stay private</span>
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-0 animate-float-slow rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-soft backdrop-blur">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <GraduationCap className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[0.8rem] font-bold text-navy-900">Freshers welcome</span>
            <span className="block text-[0.65rem] text-muted">Graduates &amp; B.Ed too</span>
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute right-2 bottom-24 hidden animate-float rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-soft backdrop-blur sm:block">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-700">
            <CalendarCheck className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[0.8rem] font-bold text-navy-900">Flexible timings</span>
            <span className="block text-[0.65rem] text-muted">Discuss availability</span>
          </span>
        </div>
      </div>
    </div>
  );
}
