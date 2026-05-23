import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { NPM_PACKAGE } from "../constants/index";

const tokenize = (line) => {
  const parts = [];
  const push = (text, className) => parts.push({ text, className });

  // minimal highlighting: keywords + strings + braces
  let rest = line;
  const patterns = [
    { re: /\b(import|from|const|await|return)\b/g, cls: "text-[#7c7c8a]" },
    { re: /"[^"]*"/g, cls: "text-[#4ade80]" },
    { re: /'[^']*'/g, cls: "text-[#4ade80]" },
    { re: /\b(validateAndGenerateJSON)\b/g, cls: "text-[#6366f1]" },
  ];

  // naive: apply first match left-to-right
  while (rest.length) {
    let best = null;
    for (const p of patterns) {
      p.re.lastIndex = 0;
      const m = p.re.exec(rest);
      if (!m) continue;
      if (!best || m.index < best.index) best = { index: m.index, text: m[0], cls: p.cls };
    }

    if (!best) {
      push(rest, "text-[#a0a0b0]");
      break;
    }

    if (best.index > 0) push(rest.slice(0, best.index), "text-[#a0a0b0]");
    push(best.text, best.cls);
    rest = rest.slice(best.index + best.text.length);
  }

  return parts;
};

export default function NpmCard() {
  const [copied, setCopied] = useState(false);

  const usage = useMemo(() => NPM_PACKAGE.usageSnippet, []);

  useEffect(() => {
    if (!copied) return undefined;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <section className="bg-[#0a0a0f] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="relative rounded-[16px] border border-white/[0.06] bg-[#13131f] p-6 md:p-8 npm-border">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-xs text-[#a0a0b0]">
                  OPEN SOURCE <span className="text-[#6366f1]">·</span> NPM
                </div>

                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-[#f1f1f3] md:text-4xl">
                    {NPM_PACKAGE.name}
                  </h2>
                  <p className="mt-3 text-[#7c7c8a]">{NPM_PACKAGE.description}</p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-[10px] border border-white/[0.08] bg-[#0f0f1a] px-4 py-3 font-mono text-sm text-[#f1f1f3]">
                  <span className="text-[#7c7c8a]">$</span>
                  <span className="flex-1">{NPM_PACKAGE.installCommand}</span>
                  <button
                    type="button"
                    className="rounded-md border border-white/[0.10] bg-white/[0.02] px-2 py-1 text-xs text-[#a0a0b0] hover:border-[#6366f1]/40 hover:text-[#f1f1f3] transition-colors"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(NPM_PACKAGE.installCommand);
                        setCopied(true);
                      } catch {
                        setCopied(false);
                      }
                    }}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <img
                    src={NPM_PACKAGE.badges.version}
                    alt="npm version"
                    loading="lazy"
                    width="140"
                    height="20"
                  />
                  <img
                    src={NPM_PACKAGE.badges.weeklyDownloads}
                    alt="weekly downloads"
                    loading="lazy"
                    width="160"
                    height="20"
                  />
                  <img
                    src={NPM_PACKAGE.badges.githubStars}
                    alt="github stars"
                    loading="lazy"
                    width="170"
                    height="20"
                  />
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href={NPM_PACKAGE.npmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f1f1f3] hover:text-[#6366f1] transition-colors"
                  >
                    View on NPM →
                  </a>
                  <a
                    href={NPM_PACKAGE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f1f1f3] hover:text-[#6366f1] transition-colors"
                  >
                    GitHub →
                  </a>
                </div>
              </div>

              <div className="rounded-[16px] border border-white/[0.06] bg-[#0f0f1a] p-5">
                <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#7c7c8a]">
                  <span>Usage</span>
                  <span className="text-[#22c55e]">ok</span>
                </div>
                <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-[#a0a0b0]">
                  <code>
                    {usage.map((line, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={idx} className="whitespace-pre">
                        {tokenize(line).map((p, i) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <span key={i} className={p.className}>
                            {p.text}
                          </span>
                        ))}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
