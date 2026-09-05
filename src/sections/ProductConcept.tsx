import { Droplets, Fingerprint, Link2, Plus } from 'lucide-react';
import type { Copy } from '../data/translations';
const icons = [Droplets, Fingerprint, Link2];
export function ProductConcept({ copy: t }: { copy: Copy }) {
  return (
    <section
      id="concept"
      className="concept-section container section"
      aria-labelledby="concept-title"
    >
      <div className="section-top">
        <div>
          <span className="eyebrow">{t.concept.eyebrow}</span>
          <h2 id="concept-title">
            {t.concept.title}
            <br />
            <em>{t.concept.italic}</em>
          </h2>
        </div>
        <p className="section-intro">{t.concept.intro}</p>
      </div>
      <div className="concept-grid">
        {t.concept.features.map((item, index) => {
          const Icon = icons[index];
          return (
            <div className="concept-feature" key={item.detail}>
              <div className="feature-top">
                <span className="feature-icon">
                  <Icon size={26} strokeWidth={1.25} />
                </span>
                <span className="tiny-label">0{index + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="tiny-label feature-label">{item.detail}</span>
              {index < 2 && (
                <span className="feature-plus" aria-hidden="true">
                  <Plus size={19} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
