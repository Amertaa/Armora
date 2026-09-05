import {
  Check,
  ArrowRight,
  RotateCcw,
  Package,
  Droplets,
  Layers,
  Grid2X2,
} from 'lucide-react';
import { media } from '../data/media';
import { products } from '../data/products';
import type { Copy } from '../data/translations';
const formatIcons = [Package, Droplets, Layers, Grid2X2];
export function CaseShowcase({ copy: t }: { copy: Copy }) {
  return (
    <section
      id="case"
      className="case-section section container"
      aria-labelledby="case-title"
    >
      <div className="case-main">
        <div className="case-visual">
          <img
            src={media.caseDetail}
            alt={t.case.alt}
            loading="lazy"
            decoding="async"
            width="1254"
            height="1254"
          />
          <span className="image-index">ARMORA / THE REUSABLE OBJECT</span>
          <div className="case-stamp">
            <RotateCcw size={23} strokeWidth={1.3} />
            <span>
              KEEP.
              <br />
              REFILL.
              <br />
              REPEAT.
            </span>
          </div>
          <span className="concept-caption">{t.hero.visual}</span>
        </div>
        <div className="case-copy">
          <span className="eyebrow">{t.case.eyebrow}</span>
          <h2 id="case-title">
            {t.case.title}
            <br />
            <em>{t.case.italic}</em>
          </h2>
          <p className="case-intro">{t.case.intro}</p>
          <p className="body-copy">{t.case.body}</p>
          <ul className="case-benefits">
            {t.case.features.map((feature) => (
              <li key={feature}>
                <Check size={15} />
                {feature}
              </li>
            ))}
          </ul>
          <div className="refill-flow">
            {t.case.flow.map((step, i) => (
              <span key={step}>
                <strong>0{i + 1}</strong>
                {step}
                {i < 2 && <ArrowRight aria-hidden="true" size={15} />}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="ecosystem-header">
        <span className="eyebrow">{t.case.system}</span>
        <p>{t.case.systemIntro}</p>
      </div>
      <div className="ecosystem-grid">
        {products.map((product, i) => {
          const Icon = formatIcons[i];
          return (
            <article key={product.id}>
              <Icon size={23} strokeWidth={1.2} />
              <h3>{product.name}</h3>
              <p>{t.case.formats[i]}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
