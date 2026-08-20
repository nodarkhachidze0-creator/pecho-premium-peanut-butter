import abga from "@/assets/partner-abga.png.asset.json";

export type Partner = {
  name: string;
  logo: string;
};

/** Add new partner/store logos here — the marquee loops them automatically. */
export const partners: Partner[] = [{ name: "აბგა", logo: abga.url }];
