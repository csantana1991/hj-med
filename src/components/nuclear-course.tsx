import { Link } from "@tanstack/react-router";
import {
  houses,
  libraries,
  modalityTargets,
  readSteps,
  rotations,
} from "@/data/nuclear";
import { plates, type Plate } from "@/data/plates";
import { programs } from "@/data/registry";

function Still({ plate }: { plate: Plate }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-ink">
      <img
        src={plate.src}
        alt={plate.alt}
        className="aspect-[4/3] w-full bg-black object-contain"
      />
      <figcaption className="px-3 py-3 text-sm leading-relaxed text-dim">
        <span className="block text-cream">{plate.diagnosis}</span>
        <span className="mt-1 block">
          {plate.modality}. “{plate.caseTitle}” by {plate.contributor}.{" "}
          <a className="text-teal-2 underline" href={plate.caseUrl} target="_blank" rel="noreferrer">
            Radiopaedia case
          </a>
          .{" "}
          <a
            className="text-teal-2 underline"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-NC-SA 4.0
          </a>
          .
        </span>
      </figcaption>
    </figure>
  );
}

export function NuclearCourse({ slug }: { slug: string }) {
  const program = programs.find((item) => item.slug === slug);
  const rotation = rotations[slug];
  if (!program || !rotation) return null;

  const full = program.track === "nm" || slug === "emory-rad";
  const rotationPlates = rotation.plateIds
    .map((id) => plates[id])
    .filter((plate): plate is Plate => Boolean(plate));

  return (
    <section className="mt-8">
      <p className="text-xs font-semibold tracking-widest text-salmon uppercase">
        {full ? "Nuclear medicine course" : "Imaging rotation"}
      </p>
      <h2 className="mt-2 font-serif text-2xl text-cream">
        {full ? "How this program is built" : "What this year is for"}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">{rotation.volume}</p>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
        Signature: {rotation.signature}
      </p>

      <ol className="mt-4 flex flex-col gap-3">
        {rotation.rotations.map((item, index) => (
          <li key={item} className="rounded-lg border border-line bg-bg-2 px-4 py-3">
            <p className="text-xs font-semibold tracking-widest text-teal-2 uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-cream">{item}</p>
          </li>
        ))}
      </ol>

      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-dim">{rotation.ai}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {rotation.links.map((link) => (
          <li key={link.href}>
            <a
              className="text-sm text-teal-2 underline"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {rotationPlates.length > 0 && program.track !== "nm" ? (
        <div className={rotationPlates.length > 1 ? "mt-4 grid gap-4 sm:grid-cols-2" : "mt-4"}>
          {rotationPlates.map((plate) => (
            <Still key={plate.id} plate={plate} />
          ))}
        </div>
      ) : null}

      {full ? <FullMap /> : null}
    </section>
  );
}

function FullMap() {
  const bySlug = new Map(programs.map((program) => [program.slug, program]));

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div>
        <h3 className="font-serif text-xl text-cream">Read the scan in this order</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
          One habit, used on every hot-seat. Tracer, then normal biodistribution, then whether the picture would justify a therapy.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {readSteps.map((step, index) => {
            const plate = plates[step.plateId];
            return (
              <article key={step.title} className="overflow-hidden rounded-lg border border-line bg-bg-2">
                {plate ? (
                  <img src={plate.src} alt={plate.alt} className="aspect-[4/3] w-full bg-black object-contain" />
                ) : null}
                <div className="px-3 py-3">
                  <p className="text-xs font-semibold tracking-widest text-salmon uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-1 font-serif text-lg text-cream">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-dim">{step.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl text-cream">Emory and Harvard, side by side</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
          The nuclear residencies and the imaging fellowships that hang off them. Hopkins stays in the atlas. It is not part of this pair.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {houses.map((house) => (
            <div key={house.school} className="rounded-lg border border-line bg-bg-2 p-4">
              <p className="text-xs font-semibold tracking-widest text-teal-2 uppercase">
                {house.school === "emory" ? "Emory" : "Harvard system"}
              </p>
              <ul className="mt-3 divide-y divide-line">
                {house.slugs.map((slug) => {
                  const program = bySlug.get(slug);
                  if (!program) return null;
                  return (
                    <li key={slug} className="py-2">
                      <Link
                        to="/programs/$slug"
                        params={{ slug }}
                        className="text-sm text-cream underline decoration-line underline-offset-2"
                      >
                        {program.name}
                      </Link>
                      <span className="mt-0.5 block text-xs text-muted">
                        {program.kind === "residency" ? "Residency" : "Fellowship"} · {program.years} yr · {program.board}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl text-cream">Reading targets, not a case log</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
          A top-tier academic diagnostic residency in this course is aimed at 38,000–48,000 studies over four years, then 10,000–15,000 more in a clinical fellowship. These ranges are study targets. They are not ACGME minimums and not audited numbers from Emory or Mass General Brigham.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-bg-2 text-xs tracking-widest text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-semibold">Modality</th>
                <th className="px-3 py-2 font-semibold">4-year target</th>
                <th className="px-3 py-2 font-semibold">What is in the pile</th>
              </tr>
            </thead>
            <tbody>
              {modalityTargets.map((row) => (
                <tr key={row.name} className="border-t border-line">
                  <td className="px-3 py-2 text-cream">{row.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-dim">{row.range}</td>
                  <td className="px-3 py-2 text-dim">{row.kinds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl text-cream">Where the cases come from</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
          Radiopaedia is the playlist. MedPix and GoldMiner supply board-style stills and journal figures. Radiology Assistant is the reading path. SNMMI is the molecular set the general banks skip. vRad-style hot-seat archives, when a program has them, stay inside that program.
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {libraries.map((link) => (
            <li key={link.href}>
              <a className="text-sm text-teal-2 underline" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
