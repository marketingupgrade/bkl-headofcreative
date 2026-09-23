import type { Metadata } from "next";
import DocPage from "@/components/doc/DocPage";
import HireMeGate from "@/components/doc/HireMeGate";

export const metadata: Metadata = { title: "Q4 Creative Strategie v4 · Buckley Belts" };

export default function Strategie() {
  return (
    <>
      <DocPage file="q4-creative-strategie-v4.md" kicker="Document 1 · Q4-strategie v4" />
      <HireMeGate />
    </>
  );
}
