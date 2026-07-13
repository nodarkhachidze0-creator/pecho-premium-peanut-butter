import logo from "@/assets/pecho-logo.png.asset.json";

export function PechoLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Pecho"
      className={className}
      draggable={false}
    />
  );
}
