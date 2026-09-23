/**
 * De scroll-verhaallijn. De volgorde is het argument:
 *
 *   diagnose (één stem) → wat kopers vragen → wat het account zegt →
 *   de these → het mechanisme → de nichelijst → de nichelus → de
 *   draai → de hefboom → het bewijs → tiering → het kwartaal →
 *   bezwaren → de vragen
 *
 * Alleen de hero is statisch geïmporteerd; de rest is next/dynamic zodat
 * de hydratatiekosten na de eerste paint vallen (zie de kit-README).
 */
import dynamic from "next/dynamic";
import TextMaskZoomHero from "@/components/v4/TextMaskZoomHero";

const RolodexTextScroll = dynamic(() => import("@/components/v4/RolodexTextScroll"));
const ClaimsStage = dynamic(() => import("@/components/v4/ClaimsStage"));
const BlurRevealCopy = dynamic(() => import("@/components/v4/BlurRevealCopy"));
const SchematicExplainer = dynamic(() => import("@/components/v4/SchematicExplainer"));
const IntegrationsMarquee = dynamic(() => import("@/components/v4/IntegrationsMarquee"));
const ScrollPathDraw = dynamic(() => import("@/components/v4/ScrollPathDraw"));
const ConvergeIntro = dynamic(() => import("@/components/v4/ConvergeIntro"));
const StatsReveal = dynamic(() => import("@/components/v4/StatsReveal"));
const ReviewsMarquee = dynamic(() => import("@/components/v4/ReviewsMarquee"));
const PricingTiles = dynamic(() => import("@/components/v4/PricingTiles"));
const ScrollTimelineGem = dynamic(() => import("@/components/v4/ScrollTimelineGem"));
const FaqAccordion = dynamic(() => import("@/components/v4/FaqAccordion"));
const ClosingFooter = dynamic(() => import("@/components/v4/ClosingFooter"));

export default function Home() {
  return (
    <main id="top">
      {/* 1 · Diagnose: één stem voor iedereen */}
      <TextMaskZoomHero />
      {/* 2 · Wat kijkers vragen en niemand beantwoordt */}
      <RolodexTextScroll />
      {/* 3 · Wat het account zegt: 27 advertenties, vier teksten */}
      <ClaimsStage />
      {/* 4 · De these */}
      <BlurRevealCopy />
      {/* 5 · Hoe het werkt: breed, sorteren, veiling, meten */}
      <SchematicExplainer />
      {/* 6 · Sub-niches als accounts (lichte adempauze) */}
      <IntegrationsMarquee />
      {/* 7 · Het ENE ding: de nichelus */}
      <ScrollPathDraw />
      {/* 8 · De draai: Creative ⟷ Targeting */}
      <ConvergeIntro />
      {/* 9 · De orderwaarde-hefboom */}
      <StatsReveal />
      {/* 10 · Evidence Bank */}
      <ReviewsMarquee />
      {/* 11 · Tiering */}
      <PricingTiles />
      {/* 12 · Q4, week voor week */}
      <ScrollTimelineGem />
      {/* 13 · Wat ik bewust niet doe */}
      <FaqAccordion />
      {/* 14 · De vragen + footer */}
      <ClosingFooter />
    </main>
  );
}
