/**
 * @component ClosingFooter
 * @description The ask plus the footer. The questions block follows the
 *   dark numbered list of cargo-structured-data-1; the footer is Kelvin
 *   "Footer with CTA and Navigation" (kelvin-footer-6): link columns, a
 *   96px display CTA row between hairlines, and a mono base row with a
 *   square back-to-top button. Hover timings are the reference's
 *   (0.4s cubic-bezier(.22,1,.36,1)).
 */

import Link from "next/link";

const EASE = "[transition-timing-function:cubic-bezier(.22,1,.36,1)]";
const label = "uppercase tracking-[0.75px] font-mono text-xs font-medium leading-[1.2]";
const link = `text-[#FFFFFF99] text-[17px] leading-none no-underline transition-colors duration-[400ms] ${EASE} hover:text-[#FFFFFF]`;

// §19, shortened. The answers would sharpen or overturn the plan.
const QUESTIONS = [
  "Wordt er vandaag gestructureerd geluisterd, en waar landt dat?",
  "Van de 20 concepten per week: hoeveel gaan er live, en hoeveel zijn iteraties op iets dat al won?",
  "Wat is de huidige AOV, en welk aandeel van de orders is een bundel?",
  "Wat is de harde laatste besteldatum voor levering vóór 5 en vóór 25 december, per markt?",
  "Wat leveren de affiliate-codes van de makers op in orders en omzet?",
  "Welk aandeel van de omzet is damesriemen, en waarom staat er geen creative op?",
];

export default function ClosingFooter() {
  return (
    <>
      <section className="relative font-sans bg-[#0E0E0E] text-white pt-40 pb-24 max-[767px]:pt-24">
        <div className="w-full max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5">
          <div className="grid grid-cols-[1fr_1.5fr] gap-16 max-[991px]:grid-cols-1 max-[991px]:gap-10">
            <div className="flex flex-col gap-3 items-start">
              <div className={`${label} text-[#FFFFFF99]`}>Vóór week 1</div>
              <h2 className="m-0 text-[64px] max-[991px]:text-5xl max-[767px]:text-[40px] font-bold leading-none tracking-[-2px]">
                <span className="text-[#FFFFFF8c]">Wat ik graag</span> aan jullie zou vragen.
              </h2>
            </div>
            <ol className="m-0 p-0 list-none border-b border-[#FFFFFF1a]">
              {QUESTIONS.map((q, i) => (
                <li key={q} className="grid grid-cols-[4rem_1fr] max-[479px]:grid-cols-[3rem_1fr] gap-4 py-7 border-t border-[#FFFFFF1a]">
                  <span className="font-mono text-[#FCF2D3] text-sm pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[21px] max-[767px]:text-lg leading-snug">{q}</span>
                </li>
              ))}
              <li className="grid grid-cols-[4rem_1fr] max-[479px]:grid-cols-[3rem_1fr] gap-4 py-8 border-t border-[#FFFFFF1a]">
                <span className="font-mono text-[#FCF2D3] text-sm pt-2">{String(QUESTIONS.length + 1).padStart(2, "0")}</span>
                <span className="accent text-[30px] max-[767px]:text-2xl leading-tight">
                  Als ik in dertien weken maar één ding voor elkaar krijg, zou dat bij jullie ook de nichelus zijn?
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <footer className="relative font-sans bg-[#000000] text-white pt-[120px] pb-[120px] max-[991px]:py-24 max-[767px]:py-[72px] max-[479px]:py-14 text-[17px] leading-[1.5]">
        <div className="w-full max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5 relative">
          <div className="grid grid-cols-2 gap-16 pb-12 max-[991px]:grid-cols-1 max-[991px]:gap-10">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-start gap-4">
                <div className={label}>Lezen</div>
                <Link href="/strategie/" className={link}>Q4-strategie v3</Link>
                <Link href="/audit/" className={link}>Audience-audit YouTube</Link>
                <Link href="/strategie/#7-twaalf-niche-hypotheses-voor-buckley" className={link}>De nichelijst</Link>
                <Link href="/strategie/#15-q4-week-voor-week" className={link}>Q4, week voor week</Link>
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className={label}>Raamwerken</div>
                <Link href="/strategie/#8-octalysis-audit-welke-motivatie-koopt-dit-account-en-welke-laat-het-liggen" className={link}>Octalysis</Link>
                <Link href="/strategie/#9-blitzscaling-audit-welk-stadium-is-deze-engine-en-welke-branden-laten-we-branden" className={link}>Blitzscaling</Link>
                <Link href="/strategie/#10-the-one-thing-de-nichelus" className={link}>The ONE Thing</Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <div className={label}>De opdracht</div>
              <div className="text-[#FFFFFF99] text-[17px] leading-snug max-w-[26rem]">
                Head of Creative · Cintura Group. Een Q4-plan voor Buckley Belts, opgesteld van buitenaf, zonder toegang
                tot de accounts. Waar ik gok, staat het erbij.
              </div>
            </div>
          </div>

          <Link
            href="/strategie/"
            className={`flex flex-row justify-between items-center w-full gap-6 border-t border-b border-[#FFFFFF29] py-10 text-white no-underline transition-colors duration-[400ms] ${EASE} hover:text-[#FCF2D3]`}
          >
            <span className="font-bold leading-none tracking-[-0.02em] text-[96px] max-[991px]:text-[72px] max-[767px]:text-[48px] max-[479px]:text-[34px]">
              Lees de strategie
            </span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="flex-shrink-0 w-[72px] h-[72px] max-[991px]:w-[52px] max-[991px]:h-[52px] max-[767px]:w-[30px] max-[767px]:h-[30px]">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </Link>

          <div className="flex flex-row justify-between items-center gap-6 pt-8">
            <div className={`${label} text-[#FFFFFF99]`}>© 2026 Joris van Huët · Q4 Creative Strategie · v1</div>
            <a
              href="#top"
              aria-label="Terug naar boven"
              className={`inline-flex justify-center items-center w-11 h-11 text-[#FFFFFF99] border border-[#FFFFFF29] no-underline transition-[color,border-color] duration-[400ms] ${EASE} hover:text-white hover:border-white`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
