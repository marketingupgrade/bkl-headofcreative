"use client";

/**
 * @component FaqAccordion
 * @description What I deliberately do not do · Kelvin "Two-Column FAQ Accordion"
 *   (kelvin-faq-1): grid-template-rows 0fr↔1fr panels, 0.5s
 *   cubic-bezier(0.16,1,0.3,1), rotating "+".
 */

import * as React from "react";

// §16 and §18 of the strategy, as the objections a panel would raise.
const faqs = [
  {
    question: "Waarom geen tweede strategist aannemen?",
    answer:
      "Werven, inwerken en productief krijgen duurt langer dan het kwartaal, en het inwerken komt bij de huidige strategist vandaan, precies waar de wachtrij al zit. Ik haal de oordeelsvorming uit het hoofd en leg hem in artefacten. In november werf ik voor januari, met het Board in de hand.",
  },
  {
    question: "Waarom niet gewoon targeten op de niche?",
    answer:
      "Omdat smalle doelgroepen minder data per set, tragere optimalisatie, hogere CPM's en doorschietende frequentie betekenen. Dat is de 2018-reflex. De niche zit in de creative: je draait breed en de eerste drie seconden doen de sortering.",
  },
  {
    question: "Wordt dit geen researchclub die niet levert?",
    answer:
      "Dat is het grootste risico, en het tegenwicht is hard: één dossier van één pagina per week, en de lus is pas af bij de uitslag. Een dossier zonder live creative binnen zeven dagen is een mislukte week, hoe mooi het ook is.",
  },
  {
    question: "Wat als de niches te klein blijken?",
    answer:
      "Daarom bestaat tier 3, en daarom is ‘omvang: onbekend’ een geldig antwoord in het dossier. Blijken er drie achter elkaar te klein, dan is dat zelf een leerpunt en verschuift het zwaartepunt naar de mix en de korting, die los van dit model overeind blijven.",
  },
  {
    question: "Waarom geen nieuwe concepten na 13 november?",
    answer:
      "Nieuwe concepten testen in de duurste advertentieweek van het jaar is de kostbaarste manier om iets te leren. Je betaalt piek-CPM's voor een antwoord dat in januari voor een fractie te krijgen is, en je verdringt bewezen werk dat op dat moment geld verdient.",
  },
  {
    question: "En als de levertijd voor Sinterklaas niet gehaald wordt?",
    answer:
      "Dan verkopen we het cadeau-idee zonder datumbelofte. Dat is minder sterk en het is eerlijk. Geweldige cadeau-creative met een belofte die ops niet waarmaakt, schaadt het merk meer dan matige. Dit is het enige punt waarop ik het plan aanpas in plaats van doorduw.",
  },
  {
    question: "Waarom geen nieuwe merkidentiteit?",
    answer:
      "Verleidelijk voor een nieuwe Head of Creative, en het is dertien weken werk dat pas in Q2 rendeert. Merkidentiteit, tone of voice en visuele consistentie laat ik dit kwartaal bewust branden.",
  },
];

function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  // grid-template-rows 0fr <-> 1fr instead of animating measured height:
  // same 0.5s cubic-bezier(0.16,1,0.3,1) feel, but the browser never
  // animates a layout property (audit finding, also a paint-perf win).
  const toggle = () => setOpen((p) => !p);

  return (
    <div style={{ borderTop: "1px solid #FFFFFF1a" }}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex flex-row justify-between items-center w-full py-8 gap-6 bg-transparent border-none text-left cursor-pointer"
      >
        <span
          className="m-0 font-sans max-[991px]:text-[22px] max-[479px]:text-xl"
          style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.4px", color: "#FFFFFF" }}
        >
          {question}
        </span>
        <span
          aria-hidden="true"
          className="flex-none font-mono max-[991px]:text-[22px] max-[479px]:text-xl transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ fontSize: "24px", color: "#FFFFFF99", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
        <div className="pb-8">
          <p
            className="m-0 max-[991px]:text-[19px] max-[767px]:text-lg"
            style={{ fontSize: "20px", fontWeight: 400, lineHeight: 1.5, color: "#FFFFFF99", maxWidth: "60ch" }}
          >
            {answer}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <section
      className="relative font-sans py-40 max-[991px]:py-[120px] max-[767px]:py-[88px] max-[479px]:py-16"
      style={{ backgroundColor: "#0E0E0E", color: "#FFFFFF", fontSize: "17px", lineHeight: 1.5 }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5 relative">
        <div className="grid grid-cols-[1fr_1.5fr] gap-16 items-start max-[991px]:grid-cols-1 max-[991px]:gap-10">
          {/* Left: header */}
          <div className="flex flex-col gap-3 items-start">
            <div className="inline-flex flex-row items-center gap-2">
              <div className="flex-none" style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: "#FFFFFF" }} />
              <div
                className="uppercase font-mono"
                style={{ fontSize: "12px", fontWeight: 500, lineHeight: 1.2, letterSpacing: "0.75px", color: "#FFFFFF99" }}
              >
                Wat ik bewust niet doe
              </div>
            </div>
            <h2
              className="m-0 font-sans max-[991px]:text-5xl max-[991px]:tracking-[-1.4px] max-[767px]:text-[40px] max-[767px]:tracking-[-1px] max-[479px]:text-[34px] max-[479px]:tracking-[-0.8px]"
              style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1, letterSpacing: "-2px", color: "#FFFFFF" }}
            >
              <span style={{ color: "#FFFFFF8c" }}>Voordat</span> jullie het vragen.
            </h2>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col" style={{ borderBottom: "1px solid #FFFFFF1a" }}>
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
