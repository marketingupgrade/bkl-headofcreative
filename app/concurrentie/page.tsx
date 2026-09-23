import type { Metadata } from "next";
import DocPage from "@/components/doc/DocPage";

export const metadata: Metadata = { title: "Concurrentieanalyse · Buckley Belts" };

export default function Concurrentie() {
  return <DocPage file="concurrentieanalyse-buckley.md" kicker="Document 4 · Concurrentieanalyse" />;
}
