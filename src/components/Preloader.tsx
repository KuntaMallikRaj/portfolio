"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const BOOT = [
  "booting portfolio.sys ...",
  "mounting /experience  ✓",
  "connecting event-mesh  ✓",
  "loading shipped products  ✓",
  "warming caches  ✓",
  "ready.",
];

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) return;
    setShow(true);
    document.body.style.overflow = "hidden";

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setLine(i);
      if (i >= BOOT.length) {
        clearInterval(id);
        setTimeout(() => {
          sessionStorage.setItem("booted", "1");
          document.body.style.overflow = "";
          setShow(false);
        }, 480);
      }
    }, 280);

    return () => {
      clearInterval(id);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-sm px-6 font-mono text-sm">
            <div className="mb-4 flex items-center gap-2 text-accent">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-xs text-faint">kunta@portfolio</span>
            </div>
            <div className="space-y-1.5">
              {BOOT.slice(0, line).map((l) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={l === "ready." ? "text-accent" : "text-muted"}
                >
                  {l}
                </motion.div>
              ))}
            </div>
            <div className="mt-5 h-0.5 w-full overflow-hidden rounded bg-surface-2">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${(line / BOOT.length) * 100}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
