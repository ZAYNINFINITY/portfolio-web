import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { PROFILE } from "../constants/index";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (data) => {
  const next = {};
  if (!data.name.trim()) next.name = "Name is required.";
  if (!data.email.trim()) next.email = "Email is required.";
  else if (!emailRegex.test(data.email.trim())) next.email = "Enter a valid email.";
  if (!data.subject.trim()) next.subject = "Subject is required.";
  if (!data.message.trim()) next.message = "Message is required.";
  return next;
};

export default function Contact() {
  const env = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    }),
    []
  );

  const [data, setData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const setField = (field, value) => {
    setData((p) => ({ ...p, [field]: value }));
    setErrors((p) => {
      if (!p[field]) return p;
      const next = { ...p };
      delete next[field];
      return next;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (!env.serviceId || !env.templateId || !env.publicKey) {
      setStatus({
        type: "error",
        message: "Email form isn't configured yet. Use the mail link on the right and I'll reply fast.",
      });
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        env.serviceId,
        env.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        { publicKey: env.publicKey }
      );

      setStatus({ type: "success", message: "Sent! I'll reply within 24h ✓" });
      setData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setStatus({ type: "error", message: "Send failed. Use the mail link on the right." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-[#0a0a0f] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#f1f1f3] md:text-4xl">
              Let's work together.
            </h2>
            <p className="mt-3 text-[#7c7c8a]">
              Open to dev roles, IT, tech support, freelance — if it's tech, I'm in.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <input
                  value={data.name}
                  onChange={(e) => setField("name", e.target.value)}
                  onBlur={() => setErrors((p) => ({ ...p, ...validate(data) }))}
                  name="name"
                  placeholder="Name"
                  className="w-full rounded-[10px] border border-white/[0.08] bg-[#13131f] px-4 py-3 text-sm text-[#f1f1f3] placeholder-[#7c7c8a] focus:outline-none focus:border-[#6366f1]/70"
                />
                {errors.name ? <p className="text-xs text-[#f59e0b]">{errors.name}</p> : null}
              </div>

              <div className="space-y-1">
                <input
                  value={data.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => setErrors((p) => ({ ...p, ...validate(data) }))}
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-[10px] border border-white/[0.08] bg-[#13131f] px-4 py-3 text-sm text-[#f1f1f3] placeholder-[#7c7c8a] focus:outline-none focus:border-[#6366f1]/70"
                />
                {errors.email ? <p className="text-xs text-[#f59e0b]">{errors.email}</p> : null}
              </div>

              <div className="space-y-1">
                <input
                  value={data.subject}
                  onChange={(e) => setField("subject", e.target.value)}
                  onBlur={() => setErrors((p) => ({ ...p, ...validate(data) }))}
                  name="subject"
                  placeholder="Subject"
                  className="w-full rounded-[10px] border border-white/[0.08] bg-[#13131f] px-4 py-3 text-sm text-[#f1f1f3] placeholder-[#7c7c8a] focus:outline-none focus:border-[#6366f1]/70"
                />
                {errors.subject ? <p className="text-xs text-[#f59e0b]">{errors.subject}</p> : null}
              </div>

              <div className="space-y-1">
                <textarea
                  value={data.message}
                  onChange={(e) => setField("message", e.target.value)}
                  onBlur={() => setErrors((p) => ({ ...p, ...validate(data) }))}
                  name="message"
                  placeholder="Message"
                  rows={6}
                  className="w-full resize-none rounded-[10px] border border-white/[0.08] bg-[#13131f] px-4 py-3 text-sm text-[#f1f1f3] placeholder-[#7c7c8a] focus:outline-none focus:border-[#6366f1]/70"
                />
                {errors.message ? <p className="text-xs text-[#f59e0b]">{errors.message}</p> : null}
              </div>

              {status ? (
                <div
                  className={[
                    "rounded-[10px] border px-4 py-3 text-sm",
                    status.type === "success"
                      ? "border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]"
                      : "border-[#f59e0b]/40 bg-[#f59e0b]/10 text-[#f59e0b]",
                  ].join(" ")}
                >
                  {status.message}{" "}
                  {status.type === "error" ? (
                    <a className="underline" href={`mailto:${PROFILE.email}`}>
                      mailto:{PROFILE.email}
                    </a>
                  ) : null}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#6366f1] px-6 py-3 text-sm font-semibold text-white disabled:opacity-70"
              >
                {sending ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending
                  </span>
                ) : (
                  "Send"
                )}
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-4"
            >
              <button
                type="button"
                className="group w-full rounded-[16px] border border-white/[0.06] bg-[#13131f] p-5 text-left hover:border-[#6366f1]/40 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.15)] transition-all"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(PROFILE.email);
                    setEmailCopied(true);
                    window.setTimeout(() => setEmailCopied(false), 1200);
                  } catch {
                    setEmailCopied(false);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#7c7c8a]">Email</div>
                    <div className="mt-1 text-sm font-semibold text-[#f1f1f3]">{PROFILE.email}</div>
                  </div>
                  <div className="text-xs text-[#7c7c8a] group-hover:text-[#f1f1f3] transition-colors">
                    {emailCopied ? "Copied" : "Copy"}
                  </div>
                </div>
              </button>

              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[16px] border border-white/[0.06] bg-[#13131f] p-5 hover:border-[#6366f1]/40 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.15)] transition-all"
              >
                <div className="text-xs text-[#7c7c8a]">LinkedIn</div>
                <div className="mt-1 text-sm font-semibold text-[#f1f1f3]">/in/zain-ul-abideen-...</div>
              </a>

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[16px] border border-white/[0.06] bg-[#13131f] p-5 hover:border-[#6366f1]/40 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.15)] transition-all"
              >
                <div className="text-xs text-[#7c7c8a]">GitHub</div>
                <div className="mt-1 text-sm font-semibold text-[#f1f1f3]">/ZAYNINFINITY</div>
              </a>

              <div className="rounded-[16px] border border-white/[0.06] bg-[#13131f] p-5">
                <div className="text-xs text-[#7c7c8a]">Location</div>
                <div className="mt-1 text-sm font-semibold text-[#f1f1f3]">Karachi · Remote worldwide</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}