import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import stickerAsset from "@/assets/pecho-googly-peanut.webp.asset.json";

export function GooglyPeanutSticker() {
  const frameRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const setGaze = (x: number, y: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      frame.style.setProperty("--peanut-gaze-x", `${x}px`);
      frame.style.setProperty("--peanut-gaze-y", `${y}px`);
    });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 9;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 7;
    setGaze(Math.max(-4.5, Math.min(4.5, x)), Math.max(-3.5, Math.min(3.5, y)));
  };

  return (
    <div
      ref={frameRef}
      className="googly-peanut-frame"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setGaze(0, 0)}
      aria-hidden="true"
    >
      <div className="googly-peanut-float">
        <img
          src={stickerAsset.url}
          alt=""
          width={1920}
          height={1920}
          draggable={false}
          className="googly-peanut-image"
        />
        <span className="googly-peanut-pupil googly-peanut-pupil-left" />
        <span className="googly-peanut-pupil googly-peanut-pupil-right" />
      </div>
    </div>
  );
}