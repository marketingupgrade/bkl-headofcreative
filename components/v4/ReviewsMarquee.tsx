"use client";

/**
 * @component ReviewsMarquee
 * @description Evidence Bank · Kelvin "Animated Dual-Row Reviews Marquee"
 *   (kelvin-testimonials-2): two opposing 44s marquee rows of 380px cards.
 *   Cards hold verbatim quotes from the YouTube audit, not testimonials.
 */

interface EvidenceCard {
  tag: string;
  text: string;
  nl: string;
  name: string;
  role: string;
}

// Verbatim from the YouTube audit (VidIQ, 23 Sep 2026). Commenters stay
// anonymous per the listening rule in §5.5; creators are named because
// their videos are public reviews.
const row1Cards: EvidenceCard[] = [
  { tag: "Veranderende maat", text: "I hate dealing with holes on normal belts because what if your weight fluctuates", nl: "Ik haat gaatjes in gewone riemen, want wat als je gewicht schommelt?", name: "Anne · US", role: "Betaalde samenwerking" },
  { tag: "Het geluid · CD3", text: "Every time I put it on, the sound is really, really satisfying.", nl: "Elke keer dat ik hem omdoe, is dat geluid echt heel bevredigend.", name: "Davidson Reviews · GB", role: "Zelf gekocht" },
  { tag: "Het probleem", text: "I did put some new holes in it … I have a feeling that is what has caused the cracking.", nl: "Ik heb er nieuwe gaatjes in gemaakt … ik denk dat dát het scheuren heeft veroorzaakt.", name: "Davidson Reviews · GB", role: "Zelf gekocht" },
  { tag: "Duurzaamheid · EDC", text: "Their products have never let me down. I've worn a belt of theirs for 6 years.", nl: "Hun producten hebben me nooit in de steek gelaten. Ik draag er al zes jaar een.", name: "LamerGamer · GB", role: "3-pack unboxing · jul 2026" },
  { tag: "Het geluid", text: "*ASMR", nl: "*ASMR", name: "Kijker", role: "Onder de video van Ryan Hunter" },
  { tag: "EDC · productverzoek", text: "Another thing I would really like is customizable buckles.", nl: "Wat ik ook graag zou willen: gespen die je zelf kunt aanpassen.", name: "LamerGamer · GB", role: "3-pack unboxing · jul 2026" },
  { tag: "De funnel", text: "I came across this brand on Instagram. They did really good marketing, really good adverts. I have fallen for it.", nl: "Ik zag dit merk op Instagram. Heel goede marketing, heel goede advertenties. Ik ben overstag gegaan.", name: "Davidson Reviews · GB", role: "Zelf gekocht" },
];

const row2Cards: EvidenceCard[] = [
  { tag: "Bezwaar · slijtage", text: "The teeth that hold the leather to the buckle get larger with wear and it becomes loose.", nl: "De tanden die het leer in de gesp houden slijten, en dan raakt hij los.", name: "Kijker", role: "Onder de video van Ryan Hunter" },
  { tag: "Bezwaar · levensduur", text: "Did not last 1 year. … Leather splits easy and buckle flys off at the worst times.", nl: "Ging geen jaar mee. … Het leer scheurt snel en de gesp schiet los op de slechtste momenten.", name: "Kijker", role: "Onder de video van Anne" },
  { tag: "Bezwaar · geur", text: "Received 3 for xMas … they smelled so bad!!!", nl: "Drie gekregen met kerst … ze stonken zo erg!!!", name: "Kijker", role: "Onder de video van Ryan Hunter" },
  { tag: "Bezwaar · verpakking", text: "Seeing like plastic bubble wrap, not the best start.", nl: "Plastic noppenfolie zien is niet de beste start.", name: "Davidson Reviews · GB", role: "Over de vegan riem" },
  { tag: "Bezwaar · gimmick", text: "Thought it is more of a cheap gimmick and bought 2 classic ones", nl: "Leek me meer een goedkope gimmick, dus ik kocht twee klassieke.", name: "Kijker", role: "Onder de video van Ryan Hunter" },
  { tag: "Bezwaar · doe-het-zelf", text: "A normal belt did it with a cable tie.", nl: "Een gewone riem deed het met een tie-wrap.", name: "Kijker", role: "Onder de video van Ryan Hunter" },
  { tag: "Bezwaar · service", text: "There customer service is only about the sale and not into fixing the problem", nl: "Hun klantenservice gaat alleen om de verkoop, niet om het probleem oplossen.", name: "Kijker", role: "Onder de video van Anne" },
];

function ReviewCard({ tag, text, nl, name, role }: EvidenceCard) {
  return (
    <figure
      className="m-0 flex flex-col flex-none rounded-lg max-[767px]:w-[280px] max-[767px]:p-6"
      style={{
        width: "380px",
        minHeight: "280px",
        padding: "40px",
        backgroundColor: "#151515",
        border: "1px solid #FFFFFF1a",
      }}
    >
      <div
        className="uppercase font-mono"
        style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.75px", color: "#FCF2D3", marginBottom: "64px" }}
      >
        {tag}
      </div>
      <blockquote
        className="m-0 mt-auto font-serif max-[767px]:text-[21px]"
        style={{ fontSize: "24px", lineHeight: 1.3, color: "#FFFFFF", fontStyle: "italic" }}
      >
        “{text}”
      </blockquote>
      {nl !== text && (
        <p className="m-0 mt-2 font-sans" style={{ fontSize: "14px", lineHeight: 1.45, color: "#FFFFFF8c" }}>
          {nl}
        </p>
      )}
      <figcaption className="flex flex-col mt-4" style={{ gap: "2px" }}>
        <div
          className="uppercase font-mono"
          style={{ fontSize: "12px", lineHeight: 1.2, fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF" }}
        >
          {name}
        </div>
        <div
          className="uppercase font-mono"
          style={{ fontSize: "12px", lineHeight: 1.2, fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}
        >
          {role}
        </div>
      </figcaption>
    </figure>
  );
}

export default function ReviewsMarquee() {
  return (
    <>
      <style>{`
        @keyframes rm-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes rm-marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .rm-marquee { animation: rm-marquee 44s linear infinite; }
        .rm-marquee-reverse { animation: rm-marquee-reverse 44s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rm-marquee, .rm-marquee-reverse { animation: none; }
        }
      `}</style>
      <section
        className="relative font-sans pt-[200px] pb-[200px] max-[991px]:pt-[160px] max-[991px]:pb-[160px] max-[767px]:pt-[112px] max-[767px]:pb-[112px] max-[479px]:pt-20 max-[479px]:pb-20"
        style={{ backgroundColor: "#0E0E0E", color: "#FFFFFF", fontSize: "17px", lineHeight: 1.5 }}
      >
        {/* Header */}
        <div className="w-full max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5 relative">
          <div className="flex flex-col items-center text-center" style={{ gap: "12px", marginBottom: "64px" }}>
            <div className="inline-flex flex-row items-center justify-center" style={{ gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: "#FFFFFF" }} />
              <div
                className="uppercase font-mono"
                style={{ fontSize: "12px", lineHeight: 1.2, fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}
              >
                Evidence Bank · voorproef
              </div>
            </div>

            <h2
              className="m-0 font-sans max-[991px]:text-[48px] max-[991px]:tracking-[-1.4px] max-[767px]:text-[40px] max-[767px]:tracking-[-1px] max-[479px]:text-[34px] max-[479px]:tracking-[-0.8px]"
              style={{ fontSize: "clamp(32px, 4.6vw, 64px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "clamp(-2px, -0.14vw, -0.8px)" }}
            >
              <span style={{ color: "#FFFFFF8c" }}>Wat mensen</span> al opschrijven.
            </h2>

            {/* Proof bar — factual, no invented rating. */}
            <div
              className="flex flex-row items-center font-mono"
              style={{ gap: "6px", fontSize: "14px", color: "#FFFFFF99", letterSpacing: "0.5px", fontWeight: 500 }}
            >
              Letterlijk overgenomen · zes YouTube-video's · reageerders anoniem
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden flex flex-col" style={{ gap: "24px" }}>
          <div className="flex flex-row w-max rm-marquee" style={{ gap: "24px" }}>
            {[...row1Cards, ...row1Cards].map((card, i) => (
              <div key={`r1-${i}`} aria-hidden={i >= row1Cards.length}><ReviewCard {...card} /></div>
            ))}
          </div>

          <div className="flex flex-row w-max rm-marquee-reverse" style={{ gap: "24px" }}>
            {[...row2Cards, ...row2Cards].map((card, i) => (
              <div key={`r2-${i}`} aria-hidden={i >= row2Cards.length}><ReviewCard {...card} /></div>
            ))}
          </div>

          <div
            className="absolute top-0 bottom-0 left-0 pointer-events-none z-[3]"
            style={{ width: "16vw", maxWidth: "260px", backgroundImage: "linear-gradient(to right, #0E0E0E, #0E0E0E00)" }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 pointer-events-none z-[3]"
            style={{ width: "16vw", maxWidth: "260px", backgroundImage: "linear-gradient(to left, #0E0E0E, #0E0E0E00)" }}
          />
        </div>
      </section>
    </>
  );
}
