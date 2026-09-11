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
  { id: "yellow-top-left", image: yellowPeanut.url, x: "4%", y: "13%", size: "clamp(52px, 7vw, 104px)", rotation: "-18deg", duration: "10.8s", delay: "-2.1s" },
  { id: "pink-lower-left", image: pinkPeanut.url, x: "17%", y: "76%", size: "clamp(46px, 6vw, 86px)", rotation: "14deg", duration: "12.6s", delay: "-7.4s" },
  { id: "blue-upper-mid", image: bluePeanut.url, x: "32%", y: "9%", size: "clamp(44px, 5vw, 76px)", rotation: "-8deg", duration: "8.9s", delay: "-5.2s" },
  { id: "orange-lower-mid", image: orangePeanut.url, x: "45%", y: "84%", size: "clamp(50px, 6vw, 92px)", rotation: "21deg", duration: "14.4s", delay: "-9.6s" },
  { id: "purple-top-right", image: purplePeanut.url, x: "63%", y: "8%", size: "clamp(48px, 6vw, 90px)", rotation: "17deg", duration: "12.1s", delay: "-3.8s" },
  { id: "red-mid-right", image: redPeanut.url, x: "78%", y: "57%", size: "clamp(46px, 6vw, 84px)", rotation: "-20deg", duration: "10.3s", delay: "-6.5s" },
  { id: "green-upper-right", image: greenPeanut.url, x: "93%", y: "18%", size: "clamp(42px, 5vw, 72px)", rotation: "9deg", duration: "13.7s", delay: "-11.2s" },
  { id: "purple-mid-left", image: purplePeanut.url, x: "8%", y: "48%", size: "clamp(38px, 4vw, 68px)", rotation: "28deg", duration: "9.4s", delay: "-8.2s" },
  { id: "green-center", image: greenPeanut.url, x: "38%", y: "49%", size: "clamp(40px, 5vw, 74px)", rotation: "-25deg", duration: "14.8s", delay: "-13.1s" },
  { id: "yellow-mid-right", image: yellowPeanut.url, x: "68%", y: "77%", size: "clamp(44px, 5vw, 80px)", rotation: "11deg", duration: "11.4s", delay: "-4.7s" },
  { id: "blue-right", image: bluePeanut.url, x: "88%", y: "82%", size: "clamp(42px, 5vw, 76px)", rotation: "-14deg", duration: "8.4s", delay: "-7.1s" },
  { id: "red-upper-left", image: redPeanut.url, x: "25%", y: "29%", size: "clamp(38px, 4vw, 66px)", rotation: "19deg", duration: "13.2s", delay: "-10.8s" },
  { id: "orange-upper-right", image: orangePeanut.url, x: "73%", y: "27%", size: "clamp(40px, 5vw, 72px)", rotation: "-11deg", duration: "9.8s", delay: "-1.6s" },
  { id: "pink-lower-right", image: pinkPeanut.url, x: "96%", y: "61%", size: "clamp(44px, 5vw, 82px)", rotation: "24deg", duration: "14.1s", delay: "-12.3s" },
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