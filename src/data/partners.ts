import jini from "@/assets/partner-jini.webp.asset.json";
import abga from "@/assets/partner-abga-new.webp.asset.json";
import billion from "@/assets/partner-billion.webp.asset.json";
import panda from "@/assets/partner-panda.webp.asset.json";

export type Partner = {
  id: "jini" | "abga" | "billion" | "panda";
  name: { ka: string; en: string };
  logo: string;
  accent: "blue" | "purple" | "red" | "mono";
  placement: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size: "large" | "medium" | "small";
};

export const partners: Partner[] = [
  {
    id: "jini",
    name: { ka: "ჯინი", en: "Jini" },
    logo: jini.url,
    accent: "blue",
    placement: "top-left",
    size: "large",
  },
  {
    id: "abga",
    name: { ka: "აბგა", en: "Abga" },
    logo: abga.url,
    accent: "purple",
    placement: "bottom-left",
    size: "medium",
  },
  {
    id: "billion",
    name: { ka: "ბილიონი", en: "Billion" },
    logo: billion.url,
    accent: "red",
    placement: "top-right",
    size: "medium",
  },
  {
    id: "panda",
    name: { ka: "პანდა", en: "Panda" },
    logo: panda.url,
    accent: "mono",
    placement: "bottom-right",
    size: "small",
  },
];
