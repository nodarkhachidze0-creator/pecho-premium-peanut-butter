import type { CSSProperties } from "react";

import bluePeanut from "@/assets/peanut-blue.webp.asset.json";
import greenPeanut from "@/assets/peanut-green.webp.asset.json";
import orangePeanut from "@/assets/peanut-orange.webp.asset.json";
import pinkPeanut from "@/assets/peanut-pink.webp.asset.json";
import purplePeanut from "@/assets/peanut-purple.webp.asset.json";
import redPeanut from "@/assets/peanut-red.webp.asset.json";
import yellowPeanut from "@/assets/peanut-yellow.webp.asset.json";

type PeanutStyle = CSSProperties & {
  "--peanut-x": string;
  "--peanut-y": string;
  "--peanut-size": string;
  "--peanut-rotation": string;
  "--peanut-duration": string;
  "--peanut-delay": string;
};

const peanuts = [
  { image: yellowPeanut.url, x: "3%", y: "10%", size: "clamp(64px, 8vw, 118px)", rotation: "-18deg", duration: "10.8s", delay: "-2.1s" },
  { image: pinkPeanut.url, x: "21%", y: "67%", size: "clamp(54px, 6vw, 92px)", rotation: "14deg", duration: "12.6s", delay: "-7.4s" },
  { image: bluePeanut.url, x: "43%", y: "8%", size: "clamp(48px, 5vw, 80px)", rotation: "-8deg", duration: "11.7s", delay: "-5.2s" },
  { image: orangePeanut.url, x: "52%", y: "72%", size: "clamp(58px, 7vw, 104px)", rotation: "21deg", duration: "13.4s", delay: "-9.6s" },
  { image: purplePeanut.url, x: "71%", y: "5%", size: "clamp(58px, 6vw, 96px)", rotation: "17deg", duration: "12.1s", delay: "-3.8s" },
  { image: redPeanut.url, x: "84%", y: "57%", size: "clamp(52px, 6vw, 90px)", rotation: "-20deg", duration: "10.3s", delay: "-6.5s" },
  { image: greenPeanut.url, x: "92%", y: "16%", size: "clamp(46px, 5vw, 78px)", rotation: "9deg", duration: "13.1s", delay: "-11.2s" },
] as const;

export function HeroPeanuts() {
  return (
    <div className="hero-peanuts pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {peanuts.map((peanut) => (
        <img
          key={peanut.image}
          src={peanut.image}
          alt=""
          className="hero-peanut absolute h-auto select-none object-contain"
          style={
            ({
              "--peanut-x": peanut.x,
              "--peanut-y": peanut.y,
              "--peanut-size": peanut.size,
              "--peanut-rotation": peanut.rotation,
              "--peanut-duration": peanut.duration,
              "--peanut-delay": peanut.delay,
            } as PeanutStyle)
          }
        />
      ))}
    </div>
  );
}