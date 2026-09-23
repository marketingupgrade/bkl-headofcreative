/**
 * De scroll-verhaallijn, v2 (na de audit van 23 september). De volgorde
 * is het argument, en het gaat over de engine, niet over de output:
 *
 *   de niche stopt na drie seconden → de hooklaag → 444 ads, één tekst →
 *   van instinct naar systeem → de engine vandaag en straks → de these → de nichelus → het upgradeproces → wie
 *   doet wat → de nichelogica (gemeten sortering, mechanisme, lijst, tiers) → testen en
 *   tools → $25M → bewijs → bezwaren → wat blijft → de vragen
 *
 * Alleen de hero is statisch geïmporteerd; de rest is next/dynamic zodat
 * de hydratatiekosten na de eerste paint vallen (zie de kit-README).
 */
import dynamic from "next/dynamic";
import TextMaskZoomHero from "@/components/v4/TextMaskZoomHero";

const HookLayer = dynamic(() => import("@/components/v4/HookLayer"));
const SortingProof = dynamic(() => import("@/components/v4/SortingProof"));
const StatsReveal = dynamic(() => import("@/components/v4/StatsReveal"));
const RolodexTextScroll = dynamic(() => import("@/components/v4/RolodexTextScroll"));
const ClaimsStage = dynamic(() => import("@/components/v4/ClaimsStage"));
const EngineFlow = dynamic(() => import("@/components/v4/EngineFlow"));
const BlurRevealCopy = dynamic(() => import("@/components/v4/BlurRevealCopy"));
const SchematicExplainer = dynamic(() => import("@/components/v4/SchematicExplainer"));
const ScrollPathDraw = dynamic(() => import("@/components/v4/ScrollPathDraw"));
const RolesGrid = dynamic(() => import("@/components/v4/RolesGrid"));
const ScrollTimelineGem = dynamic(() => import("@/components/v4/ScrollTimelineGem"));
const IntegrationsMarquee = dynamic(() => import("@/components/v4/IntegrationsMarquee"));
const PricingTiles = dynamic(() => import("@/components/v4/PricingTiles"));
const TestingTools = dynamic(() => import("@/components/v4/TestingTools"));
const ReviewsMarquee = dynamic(() => import("@/components/v4/ReviewsMarquee"));
const FaqAccordion = dynamic(() => import("@/components/v4/FaqAccordion"));
const ClosingFooter = dynamic(() => import("@/components/v4/ClosingFooter"));

export default function Home() {
  return (
    <main id="top">
      {/* 1 · De niche stopt na drie seconden */}
      <TextMaskZoomHero />

      {/* 2 · De hooklaag: jullie doen al niches, in de eerste drie seconden */}
      <HookLayer />

      {/* 3 · Daarna: 444 ads, 39% op één tekst */}
      <ClaimsStage />
      <RolodexTextScroll />

      {/* 4 · De kernzin: van instinct naar systeem */}
      <StatsReveal
        size="statement"
        runway="120vh"
        parts={[
          { text: "Jullie doen al aan niches, op instinct. " },
          { text: "Ik maak er een systeem van:", accent: true },
          { text: " benoemd, doorgetrokken tot de pre-lander, en gemeten op wie het bereikt." },
        ]}
      />

      {/* 5 · FIG. 00: de Creative Engine, vandaag en straks */}
      <EngineFlow />

      {/* 6 · De these, met zijn voorbehoud */}
      <BlurRevealCopy
        eyebrow="De these"
        note="Werkhypothese uit eigen broad-targetingaccounts · jullie eigen ads wijzen dezelfde kant op"
      >
        Op Meta target je steeds minder met instellingen en steeds meer met creative. De advertentie bepaalt in hoge mate
        zelf wie hem te zien krijgt. Dus is creative niet de boodschap bovenop de targeting.{" "}
        <em className="accent">Creative ís de targeting.</em>
      </BlurRevealCopy>

      {/* 7 · Het ENE ding: de nichelus */}
      <ScrollPathDraw />

      {/* 8 · Het upgradeproces, week voor week */}
      <ScrollTimelineGem />

      {/* 9 · Wie doet wat, vanaf maandag */}
      <RolesGrid />

      {/* 10 · De nichelogica: gemeten op hun eigen ads, het mechanisme (FIG 01–04), de lijst, de tiers */}
      <SortingProof />
      <SchematicExplainer />
      <IntegrationsMarquee />
      <PricingTiles />

      {/* 11 · Testen, leren, gereedschap */}
      <TestingTools />

      {/* 12 · Het doel: $25M */}
      <StatsReveal
        parts={[
          { text: "$25M in Q4 is ongeveer " },
          { text: "418.000 orders.", accent: true },
          { text: " Elke €5 extra orderwaarde maakt er zo'n 35.000 minder nodig. Dat komt uit bundels en pre-landers, " },
          { text: "niet uit een nieuwe hook.", accent: true },
        ]}
        footnote="Rekenwerk op een aangenomen AOV van €55, portfoliobreed, $1 ≈ €0,92 · geen data van Buckley · §2 van de strategie"
      />

      {/* 13 · Evidence Bank */}
      <ReviewsMarquee />

      {/* 14 · Wat ik bewust niet doe */}
      <FaqAccordion />

      {/* 15 · Wat na Q4 overblijft */}
      <BlurRevealCopy eyebrow="Wat na Q4 overblijft" note="Het deel dat pas na Q4 rendeert, en het eerste dat sneuvelt als niemand het bewaakt">
        Cintura heeft meer merken dan Buckley. Wat dit kwartaal oplevert is een{" "}
        <em className="accent">dossierbibliotheek.</em> Een dossier over de cadeaukoper die bang is voor de verkeerde maat werkt
        voor elk merk dat iets met maatvoering verkoopt. Het enige bezit dat in waarde stijgt naarmate er merken bijkomen.
      </BlurRevealCopy>

      {/* 16 · De vragen + afsluiting */}
      <ClosingFooter />
    </main>
  );
}
