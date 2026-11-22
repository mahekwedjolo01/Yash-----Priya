import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const CURTAIN_DURATION = 2500;

const LEFT_STRIPES =
  "repeating-linear-gradient(90deg, #7a001c 0px, #b0002a 35px, #ff1744 70px, #b0002a 105px, #7a001c 140px)";
const RIGHT_STRIPES =
  "repeating-linear-gradient(-90deg, #7a001c 0px, #b0002a 35px, #ff1744 70px, #b0002a 105px, #7a001c 140px)";
const SHINE =
  "linear-gradient(120deg, transparent 20%, rgba(255,255,255,.15) 50%, transparent 80%)";

/**
 * Full-screen theatre curtain. Tapping the heart swings both panels open in 3D
 * and hands control to the invitation underneath.
 */
export function CurtainIntro({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!opening) return undefined;

    const id = setTimeout(onOpen, prefersReducedMotion ? 0 : CURTAIN_DURATION);
    return () => clearTimeout(id);
  }, [opening, onOpen, prefersReducedMotion]);

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-full overflow-hidden bg-black">
      <CurtainPanel side="left" opening={opening} />
      <CurtainPanel side="right" opening={opening} />

      <button
        type="button"
        onClick={() => setOpening(true)}
        disabled={opening}
        aria-label="Open the invitation"
        className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-center text-white"
      >
        <span className="block animate-heartbeat text-[50px] leading-none md:text-[60px]">
          ❤️
        </span>
        <span className="mt-[15px] block text-[20px] tracking-[2px] md:text-[24px]">
          Tap To Open
        </span>
      </button>
    </div>
  );
}

function CurtainPanel({ side, opening }) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden="true"
      className={[
        "absolute top-0 h-full w-1/2 overflow-hidden transition-transform duration-[2500ms] ease-in-out",
        isLeft ? "left-0 origin-left" : "right-0 origin-right",
        isLeft
          ? "shadow-[inset_-15px_0_30px_rgba(255,255,255,.15),inset_20px_0_40px_rgba(0,0,0,.5)]"
          : "shadow-[inset_15px_0_30px_rgba(255,255,255,.15),inset_-20px_0_40px_rgba(0,0,0,.5)]",
      ].join(" ")}
      style={{
        backgroundImage: isLeft ? LEFT_STRIPES : RIGHT_STRIPES,
        transform: opening
          ? `perspective(1200px) rotateY(${isLeft ? "-85deg" : "85deg"})`
          : undefined,
      }}
    >
      <span
        className="absolute inset-0 animate-shine"
        style={{ backgroundImage: SHINE }}
      />
    </div>
  );
}
