import { useEffect } from "react";

const genjutsuSystemLogs = [
  { delay: 200, line: "[SYSTEM]: TSUKUYOMI ENGINE INITIALIZED..." },
  { delay: 700, line: "[ALERT]: DECONSTRUCTING FRONT-END DATA VIEWS..." },
  { delay: 1200, line: "[SECURE]: ROUTING ARCHITECTURE SCHEMATICS ON-SCREEN." },
];

export function useGenjutsuEngine(isGenjutsuActive, setTerminalLogs) {
  useEffect(() => {
    if (!isGenjutsuActive) return undefined;

    setTerminalLogs([]);

    const timers = genjutsuSystemLogs.map(({ delay, line }) =>
      window.setTimeout(() => {
        setTerminalLogs((previous) => [...previous, line]);
      }, delay)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isGenjutsuActive, setTerminalLogs]);
}
