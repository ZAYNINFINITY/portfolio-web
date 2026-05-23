import { NAV_LINKS, PROFILE } from "../constants/index";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0f]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <div className="text-[#7c7c8a]">© 2025 {PROFILE.name}</div>

          <div className="flex flex-wrap gap-4 justify-center text-[#7c7c8a]">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#f1f1f3] transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 text-[#7c7c8a] md:justify-end">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f1f1f3] transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807.424 3.527.414.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 0 1 3.003-.404c1.019.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.103.823 2.222v3.293c0 .319.192.694.801.576 4.766-1.588 8.204-6.085 8.204-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f1f1f3] transition-colors"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.22 23.5h4.56V7.98H.22V23.5zM8.22 7.98h4.37v2.12h.06c.61-1.16 2.11-2.38 4.34-2.38 4.64 0 5.5 3.06 5.5 7.04v8.74h-4.56v-7.75c0-1.85-.03-4.23-2.58-4.23-2.58 0-2.98 2.01-2.98 4.1v7.88H8.22V7.98z" />
              </svg>
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="hover:text-[#f1f1f3] transition-colors"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
