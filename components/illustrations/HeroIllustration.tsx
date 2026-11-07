import { Home, ShieldCheck, Target, MapPin } from "lucide-react";

/**
 * Original, lightweight SVG illustration of a one-to-one home tuition session.
 * Decorative cards are HTML overlays so text stays legible at every size.
 */
export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[35rem] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[3rem] bg-white/45 blur-2xl"
      />
      <svg
        viewBox="0 0 600 560"
        role="img"
        aria-label="Illustration of a home tutor and a student studying together at a desk, with books, a window and a plant"
        className="relative h-auto w-full drop-shadow-[0_24px_50px_rgba(4,26,51,0.12)]"
      >
        <defs>
          <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FBFF" />
            <stop offset="100%" stopColor="#E9F2FE" />
          </linearGradient>
          <linearGradient id="hero-window" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8E9FC" />
            <stop offset="100%" stopColor="#F4FAFF" />
          </linearGradient>
          <linearGradient id="hero-desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D3A6B" />
            <stop offset="100%" stopColor="#06294E" />
          </linearGradient>
          <clipPath id="hero-round">
            <rect x="12" y="12" width="576" height="536" rx="42" />
          </clipPath>
        </defs>

        <g clipPath="url(#hero-round)">
          <rect x="12" y="12" width="576" height="536" rx="42" fill="url(#hero-bg)" />

          {/* Ambient shapes */}
          <circle cx="88" cy="92" r="86" fill="#C5DAEF" opacity="0.45" />
          <circle cx="524" cy="104" r="72" fill="#FFE8D3" opacity="0.6" />
          <circle cx="556" cy="330" r="46" fill="#DCE9F7" opacity="0.7" />
          <path
            d="M58 452c60-28 126-28 186 0"
            stroke="#93B9DD"
            strokeWidth="2"
            strokeDasharray="4 9"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />

          {/* Window with arched top */}
          <path
            d="M70 332V190a110 110 0 0 1 220 0v142Z"
            fill="url(#hero-window)"
            stroke="#C5DAEF"
            strokeWidth="6"
          />
          <path d="M180 82v250M70 232h220" stroke="#C5DAEF" strokeWidth="5" />
          <circle cx="126" cy="172" r="26" fill="#FFD0A8" />
          <path d="M70 300c34-26 62-38 92-32 26 5 44 17 62 32v32H70Z" fill="#C5DAEF" opacity="0.85" />
          <path d="M196 304c26-18 52-24 94-16v44H196Z" fill="#93B9DD" opacity="0.55" />

          {/* Wall shelf with books */}
          <g>
            <rect x="462" y="120" width="108" height="10" rx="5" fill="#D3E4F8" />
            <rect x="468" y="80" width="12" height="40" rx="4" fill="#FE6F09" />
            <rect x="484" y="88" width="10" height="32" rx="4" fill="#1559B7" />
            <rect x="498" y="74" width="13" height="46" rx="4" fill="#003F7E" />
            <rect x="515" y="90" width="9" height="30" rx="4" fill="#FFB070" />
            <rect x="528" y="82" width="12" height="38" rx="4" fill="#609AFA" />
            <rect x="544" y="94" width="10" height="26" rx="4" fill="#C5DAEF" />
            <circle cx="522" cy="58" r="14" fill="#FFE8D3" />
            <path d="M522 48v20M512 58h20" stroke="#FE6F09" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Framed wall art */}
          <g>
            <rect x="340" y="106" width="96" height="82" rx="14" fill="#FFFFFF" stroke="#D3E4F8" strokeWidth="4" />
            <circle cx="378" cy="140" r="13" fill="#FFB070" />
            <path d="M350 166l22-22 20 18 14-10 20 20" stroke="#003F7E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M350 176h76" stroke="#C5DAEF" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Floor */}
          <path d="M12 448h576v58c0 24-18 42-42 42H54c-24 0-42-18-42-42Z" fill="#E8F1FB" />
          <ellipse cx="300" cy="496" rx="228" ry="20" fill="#D3E4F8" opacity="0.75" />

          {/* Chairs */}
          <rect x="200" y="318" width="114" height="118" rx="28" fill="#FFE8D3" />
          <rect x="372" y="288" width="148" height="150" rx="34" fill="#D3E4F8" />

          {/* Student */}
          <g>
            <rect x="224" y="316" width="96" height="110" rx="38" fill="#1559B7" />
            <path d="M286 322l-14 14-14-14" stroke="#DCE9F7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="256" y="296" width="20" height="26" rx="10" fill="#E7B48E" />
            <circle cx="270" cy="282" r="33" fill="#F2C7A5" />
            <path
              d="M238 282c0-25 14-40 33-40s32 15 32 40c-6-15-17-22-32-22s-26 7-33 22Z"
              fill="#17324D"
            />
            <circle cx="259" cy="283" r="2.6" fill="#17324D" />
            <circle cx="281" cy="283" r="2.6" fill="#17324D" />
            <path d="M263 294c4 4 10 4 14 0" stroke="#17324D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M308 348c14 8 22 22 24 38" stroke="#F2C7A5" strokeWidth="13" strokeLinecap="round" fill="none" />
            <circle cx="333" cy="388" r="8" fill="#F2C7A5" />
          </g>

          {/* Tutor */}
          <g>
            <rect x="384" y="296" width="116" height="128" rx="40" fill="#003F7E" />
            <path d="M438 300l-14 16-14-16" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
            <rect x="426" y="270" width="20" height="30" rx="10" fill="#E7B48E" />
            <circle cx="438" cy="258" r="34" fill="#F2C7A5" />
            <circle cx="468" cy="232" r="16" fill="#3A261C" />
            <path
              d="M405 260c-2-26 13-43 35-43 20 0 34 14 33 38-7-13-18-19-33-19-16 0-28 8-35 24Z"
              fill="#3A261C"
            />
            <circle cx="426" cy="262" r="9" fill="none" stroke="#17324D" strokeWidth="2.4" />
            <circle cx="449" cy="262" r="9" fill="none" stroke="#17324D" strokeWidth="2.4" />
            <path d="M435 262h5" stroke="#17324D" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M430 274c4 4 10 4 14 0" stroke="#17324D" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M398 346c-16 12-28 26-38 42" stroke="#F2C7A5" strokeWidth="14" strokeLinecap="round" fill="none" />
            <circle cx="358" cy="390" r="8.5" fill="#F2C7A5" />
            <path d="M407 342v36" stroke="#FE6F09" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* Desk */}
          <rect x="68" y="400" width="464" height="22" rx="11" fill="url(#hero-desk)" />
          <rect x="68" y="414" width="464" height="7" rx="3.5" fill="#041E3B" opacity="0.55" />
          <rect x="102" y="422" width="15" height="84" rx="7" fill="#0A335E" />
          <rect x="482" y="422" width="15" height="84" rx="7" fill="#0A335E" />

          {/* Open book */}
          <g>
            <path d="M300 396v-36c-14-7-28-6-36 0v36Z" fill="#FFFFFF" stroke="#C5DAEF" strokeWidth="2.5" />
            <path d="M300 396v-36c14-7 28-6 36 0v36Z" fill="#FFFFFF" stroke="#C5DAEF" strokeWidth="2.5" />
            <path d="M300 360v36" stroke="#C5DAEF" strokeWidth="2.5" />
            <path d="M274 371h18M274 380h16M308 371h18M308 380h16" stroke="#93B9DD" strokeWidth="2.4" strokeLinecap="round" />
          </g>

          {/* Pencil and mug */}
          <g transform="rotate(-18 350 386)">
            <rect x="344" y="376" width="34" height="7" rx="3.5" fill="#FE6F09" />
            <path d="M378 376l8 3.5-8 3.5Z" fill="#FFD0A8" />
          </g>
          <g>
            <rect x="404" y="368" width="27" height="32" rx="7" fill="#FFE8D3" />
            <path d="M431 376h6a6 6 0 0 1 0 12h-6" fill="none" stroke="#FFB070" strokeWidth="3.5" />
            <path d="M412 362v-6M422 362v-6" stroke="#93B9DD" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Plant */}
          <g>
            <path d="M546 438c0-26 10-44 24-56" stroke="#0F7A55" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M558 402c-16-2-26-12-28-26 16-1 27 8 28 26Z" fill="#128C5A" />
            <path d="M562 418c14-4 22-14 22-28-14 1-23 11-22 28Z" fill="#3DB37C" />
            <path d="M538 444h44l-6 40h-32Z" fill="#FFB070" />
            <rect x="548" y="484" width="24" height="8" rx="4" fill="#FE6F09" opacity="0.7" />
          </g>

          {/* Accents */}
          <path d="M330 74l4.5 10 10 4.5-10 4.5-4.5 10-4.5-10-10-4.5 10-4.5Z" fill="#FE6F09" opacity="0.9" />
          <path d="M62 368l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#609AFA" opacity="0.8" />
          <circle cx="566" cy="286" r="5" fill="#FE6F09" opacity="0.6" />
          <circle cx="84" cy="250" r="4" fill="#1559B7" opacity="0.4" />
        </g>
      </svg>

      <div className="pointer-events-none absolute top-6 left-2 hidden animate-float rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-soft backdrop-blur sm:block lg:-left-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[0.8rem] font-bold text-navy-900">Demo class</span>
            <span className="block text-[0.65rem] text-muted">Subject to availability</span>
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-0 animate-float-slow rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-soft backdrop-blur lg:-left-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-700">
            <Home className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[0.8rem] font-bold text-navy-900">1-to-1 at home</span>
            <span className="block text-[0.65rem] text-muted">Personalised learning</span>
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute right-1 bottom-28 hidden animate-float rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-soft backdrop-blur md:block lg:-right-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <Target className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[0.8rem] font-bold text-navy-900">Matched to your child</span>
            <span className="block text-[0.65rem] text-muted">Class · board · subject</span>
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute top-1/3 right-3 hidden rounded-full border border-navy-100 bg-white/90 px-3 py-1.5 text-[0.68rem] font-bold tracking-wide text-navy-700 shadow-sm backdrop-blur sm:flex sm:items-center sm:gap-1.5">
        <MapPin className="h-3 w-3 text-orange-500" aria-hidden="true" />
        Varanasi
      </div>
    </div>
  );
}
