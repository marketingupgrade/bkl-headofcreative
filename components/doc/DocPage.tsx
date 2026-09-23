import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import DocToc, { type TocItem } from "./DocToc";

/**
 * The h2 sections for the floating contents. Slugs every heading in order
 * with the same slugger rehype-slug uses, so duplicate-suffixes line up.
 */
function tocItems(md: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let fenced = false;
  for (const line of md.split("\n")) {
    if (line.startsWith("```")) fenced = !fenced;
    const m = !fenced && /^(#{1,6})\s+(.*?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");
    const id = slugger.slug(text);
    if (m[1].length !== 2) continue;
    const n = /^(\d+)\.\s+(.*)$/.exec(text);
    const title = n ? n[2] : text;
    let label = title.split(":")[0].trim();
    if (label.length > 28) label = label.slice(0, 27).replace(/\s+\S*$/, "") + "…";
    items.push({ id, num: n ? n[1] : String(items.length + 1), label, title });
  }
  return items;
}

/** Renders one of the source documents from /content as a readable page. */
export default function DocPage({ file, kicker }: { file: string; kicker: string }) {
  const md = fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white font-sans">
      <header className="sticky top-0 z-10 border-b border-[#FFFFFF1a] bg-[#0E0E0Ee6] backdrop-blur">
        <nav className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-5 py-4 pr-40 max-[767px]:pr-36 min-[1440px]:pr-5">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.75px] text-[#FFFFFF99] no-underline hover:text-white">
            ← Terug naar het verhaal
          </Link>
          <div className="flex flex-wrap justify-end gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.75px]">
            <Link href="/strategie/" className="text-[#FFFFFF99] no-underline hover:text-[#FCF2D3]">Strategie</Link>
            <Link href="/audit/" className="text-[#FFFFFF99] no-underline hover:text-[#FCF2D3]">Audit</Link>
            <Link href="/ad-library/" className="text-[#FFFFFF99] no-underline hover:text-[#FCF2D3]">Ad Library</Link>
            <Link href="/concurrentie/" className="text-[#FFFFFF99] no-underline hover:text-[#FCF2D3]">Concurrentie</Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-[760px] px-5 pb-32 pt-16">
        <div className="mb-8 font-mono text-xs uppercase tracking-[0.75px] text-[#FCF2D3]">{kicker}</div>
        <article className="doc">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
            {md}
          </ReactMarkdown>
        </article>
      </main>
      <DocToc items={tocItems(md)} />
    </div>
  );
}
