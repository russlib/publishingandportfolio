import Image from "next/image";
import { SiteNav } from "@/components/site-nav";

export function BatteryCoolingNotice() {
  return <><SiteNav /><main className="mx-auto max-w-[880px] px-6 py-14">
    <p className="text-xs uppercase tracking-widest text-slate-500">UVic Formula Student · Thermal testing</p>
    <h1 className="mt-3 text-4xl tracking-tight">Battery Cooling Testing</h1>
    <section className="mt-8 border-t border-slate-200 pt-7">
      <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">Article under construction</span>
      <h2 className="mt-5 text-2xl">Updating the full write-up.</h2>
      <p className="mt-3 leading-relaxed text-slate-600">I’m revising this article and updating the graphs. My one-page project summary is available below.</p>
    </section>
    <a href="/projects/battery-cooling/summary.pdf" className="mt-8 grid items-center gap-7 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-[210px_1fr] focus-visible:outline-2 focus-visible:outline-offset-4">
      <Image src="/projects/battery-cooling/summary.png" alt="Battery Cooling Testing one-page summary preview" width={980} height={1268} className="h-auto w-full border border-slate-200" />
      <div><p className="text-xs uppercase tracking-widest text-slate-500">One-page overview</p><h2 className="mt-3 text-2xl">Project summary</h2><p className="mt-5 font-medium">View summary PDF ↗</p></div>
    </a>
  </main></>;
}
