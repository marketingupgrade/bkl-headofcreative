/**
 * De scroll-verhaallijn, v2 (na de audit van 23 september). De volgorde
 * is het argument, en het gaat over de engine, niet over de output:
 *
 *   symptoom (één stem) → oorzaak (één hoofd) → kort bewijs → de engine
 *   vandaag en straks → de these → de nichelus → het upgradeproces → wie
 *   doet wat → de nichelogica (mechanisme, lijst, tiers) → testen en
 *   tools → $25M → bewijs → bezwaren → wat blijft → de vragen
 *
 * Alleen de hero is statisch geïmporteerd; de rest is next/dynamic zodat
 * de hydratatiekosten na de eerste paint vallen (zie de kit-README).
 */
import dynamic from "next/dynamic";
import TextMaskZoomHero from "@/components/v4/TextMaskZoomHero";

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
      {/* 1 · Symptoom: één stem voor iedereen */}
      <TextMaskZoomHero />

      {/* 2 · Oorzaak: een engine die door één hoofd loopt */}
      <StatsReveal
        size="statement"
        runway="130vh"
        parts={[
          { text: "Dat is geen creatief probleem. " },
          { text: "Het is wat een engine maakt die door één hoofd loopt.", accent: true },
        ]}
        footnote="Twintig concepten uit één brein zijn gecorreleerde ideeën · §4.2 van de strategie"
      />

      {/* 3 · Kort bewijs: twee vragen, vier teksten */}
      <RolodexTextScroll />
      <ClaimsStage />

      {/* 4 · FIG. 00: de Creative Engine, vandaag en straks */}
      <EngineFlow />

      {/* 5 · De these, met zijn voorbehoud */}
      <BlurRevealCopy
        eyebrow="De these"
        note="Werkhypothese uit eigen broad-targetingaccounts · meting één in week 1"
      >
        Op Meta target je steeds minder met instellingen en steeds meer met creative. De advertentie bepaalt in hoge mate
        zelf wie hem te zien krijgt. Dus is creative niet de boodschap bovenop de targeting.{" "}
        <em className="accent">Creative ís de targeting.</em>
      </BlurRevealCopy>

      {/* 6 · Het ENE ding: de nichelus */}
      <ScrollPathDraw />

      {/* 7 · Het upgradeproces, week voor week */}
      <ScrollTimelineGem />

      {/* 8 · Wie doet wat, vanaf maandag */}
      <RolesGrid />

      {/* 9 · De nichelogica: het mechanisme (FIG 01–04), de lijst, de tiers */}
      <SchematicExplainer />
      <IntegrationsMarquee />
      <PricingTiles />

      {/* 10 · Testen, leren, gereedschap */}
      <TestingTools />

      {/* 11 · Het doel: $25M */}
      <StatsReveal
        parts={[
          { text: "$25M in Q4 is ongeveer " },
          { text: "418.000 orders.", accent: true },
          { text: " Elke €5 extra orderwaarde maakt er zo'n 35.000 minder nodig. Dat komt uit bundels en pre-landers, " },
          { text: "niet uit een nieuwe hook.", accent: true },
        ]}
        footnote="Rekenwerk op een aangenomen AOV van €55, portfoliobreed, $1 ≈ €0,92 · geen data van Buckley · §2 van de strategie"
      />

      {/* 12 · Evidence Bank */}
      <ReviewsMarquee />

      {/* 13 · Wat ik bewust niet doe */}
      <FaqAccordion />

      {/* 14 · Wat na Q4 overblijft */}
      <BlurRevealCopy eyebrow="Wat na Q4 overblijft" note="Het deel dat pas na Q4 rendeert, en het eerste dat sneuvelt als niemand het bewaakt">
        Cintura heeft meer merken dan Buckley. Wat dit kwartaal oplevert is een{" "}
        <em className="accent">dossierbibliotheek.</em> Een dossier over de cadeaukoper die bang is voor de verkeerde maat werkt
        voor elk merk dat iets met maatvoering verkoopt. Het enige bezit dat in waarde stijgt naarmate er merken bijkomen.
      </BlurRevealCopy>

      {/* 15 · De vragen + afsluiting */}
      <ClosingFooter />
    </main>
  );
}
