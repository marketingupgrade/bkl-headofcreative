import type { Metadata } from "next";
import DocPage from "@/components/doc/DocPage";

export const metadata: Metadata = { title: "Audience-audit YouTube · Buckley Belts" };

export default function Audit() {
  return <DocPage file="audience-audit-youtube.md" kicker="Document 2 · Audience-audit" />;
}
