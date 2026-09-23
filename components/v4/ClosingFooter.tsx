import Link from "next/link";

/**
 * @component ClosingFooter
 * @description The ask that closes the page, in the dark numbered-list
 *   style of cargo-structured-data-1, then a sign-off with name, date and
 *   the two documents. No navigation footer: the page is for the founders.
 */

const label = "uppercase tracking-[0.75px] font-mono text-xs font-medium leading-[1.2]";

// §19, shortened. The answers would sharpen or overturn the plan.
const QUESTIONS = [
  "Wordt er vandaag gestructureerd geluisterd, en waar landt dat?",
  "Van de 20 concepten per week: hoeveel gaan er live, en hoeveel zijn iteraties op iets dat al won?",
  "Wat is de huidige AOV, en welk aandeel van de orders is een bundel?",
  "Wat is de harde laatste besteldatum voor levering vóór 5 en vóór 25 december, per markt?",
  "Wat leveren de affiliate-codes van de makers op in orders en omzet?",
  "Welk aandeel van de omzet is damesriemen, en waarom staat er geen creative op?",
  "Is het lage bereik in Duitsland, Frankrijk, Spanje, Italië en Polen zo gestuurd?",
  "Welk klantgetal klopt: 500.000+ in de ads of 1.000.000+ op de site?",
];

export default function ClosingFooter() {
  return (
    <>
      <section className="relative font-sans bg-[#0E0E0E] text-white pt-40 pb-48 max-[767px]:pt-24 max-[767px]:pb-32">
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

          <div className="mt-32 max-[767px]:mt-20 border-t border-[#FFFFFF1a] pt-16 grid grid-cols-[1fr_1.5fr] gap-16 max-[991px]:grid-cols-1 max-[991px]:gap-8">
            <div className={`${label} text-[#FFFFFF99] pt-2`}>Tot slot</div>
            <div>
              <p className="m-0 text-[clamp(1.6rem,1rem+2vw,2.6rem)] leading-[1.2] font-bold tracking-[-0.5px] max-w-[24ch]">
                Als ik in dertien weken één ding voor elkaar krijg:{" "}
                <span className="accent">elke maandag weten welke niche won, met bewijs.</span>
              </p>
              <p className="m-0 mt-8 text-lg">
                <span className="font-bold">Joris van Huët</span>
                <span className="text-[#FFFFFF99]"> · 23 september 2026</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/strategie/"
                  className="inline-flex items-center uppercase no-underline font-mono text-[13px] font-medium tracking-[1px] px-[30px] py-[18px] bg-[#FCF2D3] text-black hover:opacity-80 transition-opacity"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%)" }}
                >
                  Lees de strategie
                </Link>
                <Link
                  href="/audit/"
                  className="inline-flex items-center uppercase no-underline font-mono text-[13px] font-medium tracking-[1px] px-[29px] py-[17px] text-white border border-[#FFFFFF29] hover:border-white transition-colors"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%)" }}
                >
                  De audience-audit
                </Link>
                <Link
                  href="/ad-library/"
                  className="inline-flex items-center uppercase no-underline font-mono text-[13px] font-medium tracking-[1px] px-[29px] py-[17px] text-white border border-[#FFFFFF29] hover:border-white transition-colors"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%)" }}
                >
                  De Ad Library-analyse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
