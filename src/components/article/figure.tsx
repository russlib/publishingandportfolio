import Image from "next/image";

export function Figure({
  src,
  alt,
  caption,
  width,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
}) {
  return (
    <figure className="my-[24px]">
      <Image
        src={src}
        alt={alt}
        width={width ?? 720}
        height={0}
        sizes="(max-width: 720px) 100vw, 720px"
        style={{ width: width ? `${width}px` : "100%", maxWidth: "100%", height: "auto" }}
        className="rounded-[8px]"
        unoptimized
      />
      {caption && (
        <figcaption className="mt-[8px] text-[13px] italic" style={{ color: "#687385" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
