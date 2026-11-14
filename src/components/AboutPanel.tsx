const STEPS = [
  'NISAR L2 GCOV (Geocoded Polarimetric Covariance) HDF5 data acquisition',
  'Remote HDF5 access and extraction',
  'HHHH and HVHV polarization extraction',
  'Geographic subset and georeferencing',
  'Quality control',
  'Polarization ratio calculation',
  'Raster visualization (percentile display stretch)',
  'XYZ tile generation (Web Mercator, zoom 10-12)',
  'Interactive MapLibre visualization'
];

export const AboutPanel = () => (
  <section aria-label="About" className="flex flex-col gap-3">
    <details className="bg-slate-950/40 border border-slate-800 rounded-xl p-3.5">
      <summary className="cursor-pointer text-xs font-mono text-indigo-400">STUDY AREA</summary>
      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
        The target area is the Lower Indus Basin in Sindh, Pakistan. The map shows only the part
        that intersects the acquired NISAR scene, so it does not cover the whole basin.
      </p>
    </details>

    <details className="bg-slate-950/40 border border-slate-800 rounded-xl p-3.5">
      <summary className="cursor-pointer text-xs font-mono text-indigo-400">METHODOLOGY</summary>
      <ol className="mt-2 list-decimal pl-4 space-y-1 text-xs text-slate-400">
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-slate-500">
        One acquisition only: no temporal change, flood or land-class result is claimed.
      </p>
    </details>

    <details className="bg-slate-950/40 border border-slate-800 rounded-xl p-3.5">
      <summary className="cursor-pointer text-xs font-mono text-indigo-400">CREDITS</summary>
      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
        INDUSPULSE by team ORBITAL INTELLIGENCE for the NASA Space Apps Challenge 2026.
        Data source: NASA-ISRO NISAR. Not endorsed by NASA or ISRO.
      </p>
    </details>
  </section>
);