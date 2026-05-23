import { TECH_STRIP_ITEMS } from "../constants/index";

export default function TechStrip() {
  const items = TECH_STRIP_ITEMS;

  return (
    <section aria-label="Tech stack" className="border-y border-white/[0.05] bg-[#0a0a0f]">
      <div className="mx-auto max-w-5xl px-4 py-5 overflow-hidden">
        <div className="tech-strip-track flex w-max items-center whitespace-nowrap">
          {[...items, ...items].map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center">
              <span className="px-3 text-sm text-[#3d3d4f]">{item}</span>
              <span className="px-1 text-sm text-[#6366f1]">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
