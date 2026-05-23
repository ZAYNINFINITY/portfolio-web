import { motion as Motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <Motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(5,12,24,0.92)] backdrop-blur-xl"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-5">
        <Motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="font-display text-5xl tracking-[0.25em] text-[#f3efe6]"
        >
          ZAIN
        </Motion.div>
        <Motion.div
          className="h-[3px] w-40 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <Motion.div
            className="h-full bg-[linear-gradient(90deg,#ff7a18,#ffd56a)]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </Motion.div>
      </div>
    </Motion.div>
  );
}
