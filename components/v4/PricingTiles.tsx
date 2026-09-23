/**
 * @component PricingTiles
 * @description Niche tiering (§6.2), laid out on Kelvin "Two-Tier Pricing
 *   Cards with Features" (kelvin-pricing-1): a left-aligned header, two
 *   backdrop-blurred tiles with a big mono figure where the price was, a
 *   full-width strip for the third tier, and the promotion rule.
 */

import Link from "next/link";

const CheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="flex-none w-5 h-5" style={{ fill: "#FCF2D3" }}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const monoLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: "0.75px",
  color: "#FFFFFF99",
};

const TIERS = [
  {
    label: "Tier 1 · Eigen wereld",
    count: "2–3",
    featured: true,
    features: [
      "Eigen dossier",
      "Eigen creative-lijn van minstens acht concepten",
      "Eigen pre-lander",
      "Eigen aanbod of bundel",
      "Eigen P&L",
    ],
    note: "Q4-kandidaten: de cadeaukoper (tier 1 omdat Q4 hem urgent maakt; het merk draaide hem zelf al een seizoen, performancedata ontbreekt), vakman en buitenmens. De audit voegt vrouwen toe: product bestaat, vraag is de luidste, creative is nul.",
  },
  {
    label: "Tier 2 · Eigen boodschap",
    count: "5–7",
    featured: false,
    features: [
      "Eigen dossier",
      "Drie tot vier concepten",
      "Een aangepaste sectie op de bestaande pre-lander",
      "Deelt het aanbod",
    ],
    note: "Hier landen de niches die in tier 3 twee keer boven de drempel kwamen.",
  },
];

export default function PricingTiles() {
  return (
    <section
      className="relative font-sans pt-40 pb-40 max-[991px]:pt-[120px] max-[991px]:pb-[120px] max-[767px]:pt-[88px] max-[767px]:pb-[88px] max-[479px]:pt-16 max-[479px]:pb-16"
      style={{ backgroundColor: "#0E0E0E", color: "#FFFFFF", fontSize: "17px", lineHeight: 1.5 }}
    >
      <div className="relative w-full max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5">
        <div className="flex flex-col items-start gap-4 mb-16">
          <div className="inline-flex flex-row items-center gap-2">
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: "#FFFFFF" }} />
            <div className="uppercase font-mono" style={monoLabel}>
              Tiering · zoals in ABM
            </div>
          </div>
          <h2
            className="m-0 font-sans max-[991px]:text-[48px] max-[991px]:tracking-[-1.4px] max-[767px]:text-[40px] max-[767px]:tracking-[-1px] max-[479px]:text-[34px] max-[479px]:tracking-[-0.8px]"
            style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1, letterSpacing: "-2px", maxWidth: "60ch" }}
          >
            <span style={{ color: "#FFFFFF8c" }}>Niet elke niche</span> verdient hetzelfde.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 max-[991px]:grid-cols-1">
          {TIERS.map((t) => (
            <div
              key={t.label}
              className="flex flex-col items-start gap-6 p-10 max-[479px]:p-6 backdrop-blur-[20px]"
              style={{
                backgroundColor: t.featured ? "#FFFFFF12" : "#FFFFFF0a",
                border: `1px solid ${t.featured ? "#FCF2D366" : "#FFFFFF1a"}`,
              }}
            >
              <div className="flex flex-row justify-between items-baseline w-full gap-4">
                <div className="uppercase font-mono" style={monoLabel}>
                  {t.label}
                </div>
                <div className="font-mono text-[56px] max-[479px]:text-[38px]" style={{ fontWeight: 500, lineHeight: 1, letterSpacing: "-1px" }}>
                  {t.count}
                  <span style={{ fontSize: "16px", letterSpacing: 0, color: "#FFFFFF99" }}> niches</span>
                </div>
              </div>
              <div className="w-full h-px" style={{ backgroundColor: "#FFFFFF1a" }} />
              <ul className="m-0 p-0 list-none flex flex-col items-start gap-4 w-full">
                {t.features.map((f) => (
                  <li key={f} className="flex flex-row items-start gap-3" style={{ fontSize: "17px", lineHeight: 1.5 }}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-auto" style={{ fontSize: "15px", color: "#FFFFFF99" }}>
                {t.note}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 flex flex-wrap items-center justify-between gap-6 p-10 max-[479px]:p-6 backdrop-blur-[20px]"
          style={{ backgroundColor: "#FFFFFF0a", border: "1px solid #FFFFFF1a" }}
        >
          <div className="flex flex-col gap-3" style={{ maxWidth: "44rem" }}>
            <div className="uppercase font-mono" style={monoLabel}>
              Tier 3 · Eigen hook · de rest
            </div>
            <div className="font-sans" style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px" }}>
              Hier test je of een niche bestaat, voordat je erin investeert.
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {["Eén hookvariant op bewezen creative", "In de taal van de niche", "Goedkoop: het zijn iteraties"].map((f) => (
                <span key={f} className="font-mono uppercase" style={{ ...monoLabel, fontSize: "11px" }}>
                  · {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 mb-0 max-w-[46rem]" style={{ fontSize: "20px", lineHeight: 1.5, color: "#FFFFFF" }}>
          <span className="accent" style={{ fontSize: "1.2em" }}>De promotieregel.</span>{" "}
          <span style={{ color: "#FFFFFFb3" }}>
            Twee onafhankelijke creative-lijnen boven de drempel: een tier omhoog. Twee cycli eronder: een tier
            omlaag. Geen uitzonderingen voor de leukste niche, want de leukste niche is zelden de grootste.
          </span>{" "}
          <Link href="/strategie/#62-tiering-want-niet-elke-niche-verdient-hetzelfde" className="underline underline-offset-4" style={{ color: "#FCF2D3" }}>
            §6.2
          </Link>
        </p>
      </div>
    </section>
  );
}
