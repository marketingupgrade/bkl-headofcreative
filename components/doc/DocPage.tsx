import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

/** Renders one of the source documents from /content as a readable page. */
export default function DocPage({ file, kicker }: { file: string; kicker: string }) {
  const md = fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white font-sans">
      <header className="sticky top-0 z-10 border-b border-[#FFFFFF1a] bg-[#0E0E0Ee6] backdrop-blur">
        <nav className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.75px] text-[#FFFFFF99] no-underline hover:text-white">
            ← Terug naar het verhaal
          </Link>
          <div className="flex gap-5 font-mono text-xs uppercase tracking-[0.75px]">
            <Link href="/strategie/" className="text-[#FFFFFF99] no-underline hover:text-[#FCF2D3]">Strategie</Link>
            <Link href="/audit/" className="text-[#FFFFFF99] no-underline hover:text-[#FCF2D3]">Audit</Link>
            <Link href="/ad-library/" className="text-[#FFFFFF99] no-underline hover:text-[#FCF2D3]">Ad Library</Link>
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
    </div>
  );
}
