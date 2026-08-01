export function ColabBadge({ href, caption }: { href: string; caption?: string }) {
  return (
    <div className="my-[20px]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-[8px] rounded-[6px] border px-[10px] py-[6px] text-[13px] transition-colors hover:bg-black/[0.03]"
        style={{ borderColor: "rgba(0,0,0,0.1)", color: "#3c4257" }}
      >
        <img
          src="https://colab.research.google.com/assets/colab-badge.svg"
          alt="Open In Colab"
          className="h-[20px] w-auto"
        />
        <span>Open interactive notebook</span>
      </a>
      {caption && (
        <p className="mt-[6px] text-[13px] italic" style={{ color: "#687385" }}>
          {caption}
        </p>
      )}
    </div>
  );
}
