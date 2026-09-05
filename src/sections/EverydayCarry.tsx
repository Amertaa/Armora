import { Droplets, Palette, Link2, Footprints, RotateCcw } from 'lucide-react';
import { media } from '../data/media';
import type { Copy } from '../data/translations';
const icons = [Droplets, Palette, Link2, Footprints, RotateCcw];
export function EverydayCarry({ copy: t }: { copy: Copy }) {
  return (
    <>
      <section
        id="how-it-works"
        className="how-section section container"
        aria-labelledby="how-title"
      >
        <div className="how-heading">
          <span className="eyebrow">{t.how.eyebrow}</span>
          <h2 id="how-title">{t.how.title}</h2>
        </div>
        <ol className="how-grid">
          {t.how.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step}>
                <span className="tiny-label">0{i + 1}</span>
                <Icon size={26} strokeWidth={1.25} />
                <h3>{step}</h3>
              </li>
            );
          })}
        </ol>
      </section>
      <section
        id="everyday"
        className="everyday-section container"
        aria-labelledby="everyday-title"
      >
        <div className="everyday-visual">
          <img
            src={media.everyday}
            alt={t.everyday.alt}
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
          />
          <span className="concept-caption">{t.hero.visual}</span>
        </div>
        <div className="everyday-copy">
          <span className="eyebrow">{t.everyday.eyebrow}</span>
          <h2 id="everyday-title">
            {t.everyday.title}
            <br />
            <em>{t.everyday.italic}</em>
          </h2>
          <p className="body-copy">{t.everyday.body}</p>
          <div className="carry-tags">
            {t.everyday.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span className="tiny-label">{t.everyday.caption}</span>
        </div>
      </section>
    </>
  );
}
