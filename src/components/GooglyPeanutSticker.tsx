import stickerAsset from "@/assets/pecho-googly-peanut.webp.asset.json";

export function GooglyPeanutSticker() {
  return (
    <div className="googly-peanut-frame" aria-hidden="true">
      <div className="googly-peanut-float">
        <img
          src={stickerAsset.url}
          alt=""
          width={1920}
          height={1920}
          draggable={false}
          className="googly-peanut-image"
        />
      </div>
    </div>
  );
}
