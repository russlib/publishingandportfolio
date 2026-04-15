import { AlertTriangle, Info, Lightbulb } from "lucide-react";

const icons = {
  warning: AlertTriangle,
  info: Info,
  note: Info,
  tip: Lightbulb,
};

const colors = {
  warning: { bg: "bg-amber-50/80", border: "border-amber-200/60", icon: "text-amber-600" },
  info: { bg: "bg-blue-50/80", border: "border-blue-200/60", icon: "text-blue-600" },
  note: { bg: "bg-blue-50/80", border: "border-blue-200/60", icon: "text-blue-600" },
  tip: { bg: "bg-emerald-50/80", border: "border-emerald-200/60", icon: "text-emerald-600" },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof icons;
  title?: string;
  children: React.ReactNode;
}) {
  const Icon = icons[type];
  const c = colors[type];
  return (
    <div className={`my-[20px] rounded-[12px] border ${c.border} ${c.bg} p-[16px]`}>
      <div className="flex items-start gap-[10px]">
        <Icon className={`size-[18px] mt-[2px] shrink-0 ${c.icon}`} />
        <div className="min-w-0">
          {title && <p className="text-[14px] font-semibold mb-[6px]">{title}</p>}
          <div className="text-[14px] leading-[22px]" style={{ color: "#3c4257" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
