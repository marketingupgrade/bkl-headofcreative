import type { Metadata } from "next";
import DocPage from "@/components/doc/DocPage";

export const metadata: Metadata = { title: "Meta Ad Library-analyse · Buckley Belts" };

export default function AdLibrary() {
  return <DocPage file="ad-library-analyse-buckley.md" kicker="Document 3 · Meta Ad Library-analyse" />;
}
