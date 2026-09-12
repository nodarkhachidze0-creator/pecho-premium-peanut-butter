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
  { id: "yellow-top-left", image: yellowPeanut.url, x: "5%", y: "12%", size: "clamp(52px, 7vw, 104px)", rotation: "-18deg", duration: "6.4s", delay: "-0.8s" },
  { id: "pink-lower-left", image: pinkPeanut.url, x: "16%", y: "78%", size: "clamp(46px, 6vw, 86px)", rotation: "14deg", duration: "6.8s", delay: "-3.7s" },
  { id: "blue-upper-mid", image: bluePeanut.url, x: "31%", y: "8%", size: "clamp(44px, 5vw, 76px)", rotation: "-8deg", duration: "7.2s", delay: "-5.4s" },
  { id: "orange-lower-mid", image: orangePeanut.url, x: "44%", y: "86%", size: "clamp(50px, 6vw, 92px)", rotation: "21deg", duration: "6.6s", delay: "-2.4s" },
  { id: "purple-top-right", image: purplePeanut.url, x: "62%", y: "9%", size: "clamp(48px, 6vw, 90px)", rotation: "17deg", duration: "7.4s", delay: "-6.1s" },
  { id: "red-mid-right", image: redPeanut.url, x: "79%", y: "55%", size: "clamp(46px, 6vw, 84px)", rotation: "-20deg", duration: "6.5s", delay: "-4.9s" },
  { id: "green-upper-right", image: greenPeanut.url, x: "94%", y: "17%", size: "clamp(42px, 5vw, 72px)", rotation: "9deg", duration: "7s", delay: "-1.7s" },
  { id: "purple-mid-left", image: purplePeanut.url, x: "7%", y: "49%", size: "clamp(38px, 4vw, 68px)", rotation: "28deg", duration: "6.9s", delay: "-5.8s" },
  { id: "green-center", image: greenPeanut.url, x: "39%", y: "48%", size: "clamp(40px, 5vw, 74px)", rotation: "-25deg", duration: "7.3s", delay: "-3.1s" },
  { id: "yellow-mid-right", image: yellowPeanut.url, x: "67%", y: "79%", size: "clamp(44px, 5vw, 80px)", rotation: "11deg", duration: "6.7s", delay: "-0.2s" },
  { id: "blue-right", image: bluePeanut.url, x: "89%", y: "84%", size: "clamp(42px, 5vw, 76px)", rotation: "-14deg", duration: "7.1s", delay: "-4.2s" },
  { id: "red-upper-left", image: redPeanut.url, x: "23%", y: "31%", size: "clamp(38px, 4vw, 66px)", rotation: "19deg", duration: "6.3s", delay: "-2.9s" },
  { id: "orange-upper-right", image: orangePeanut.url, x: "74%", y: "26%", size: "clamp(40px, 5vw, 72px)", rotation: "-11deg", duration: "7.5s", delay: "-6.8s" },
  { id: "pink-lower-right", image: pinkPeanut.url, x: "96%", y: "63%", size: "clamp(44px, 5vw, 82px)", rotation: "24deg", duration: "6.6s", delay: "-1.4s" },
] as const;

export function HeroPeanuts() {
  return (
    <div className="hero-peanuts pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {peanuts.map((peanut) => (
        <img
          key={peanut.id}
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