import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { media } from '../data/media';
import type { Copy } from '../data/translations';
export function Hero({ copy: t }: { copy: Copy }) {
  return (
    <section id="home" className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" />
          {t.hero.eyebrow}
        </div>
        <h1 id="hero-title">
          Carry a<br />
          <em>Place.</em>
          <span className="hero-period" aria-hidden="true">
            ✳
          </span>
        </h1>
        <p>
          <strong>{t.hero.intro}</strong>
          <br />
          {t.hero.description}
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#collection">
            {t.hero.cta}
            <ArrowUpRight size={18} />
          </a>
          <a className="text-link" href="#concept">
            {t.hero.secondary}
            <ArrowDownRight size={17} />
          </a>
        </div>
        <div className="hero-bottom">
          <span>{t.hero.edition}</span>
          <span>{t.hero.footnote}</span>
        </div>
      </div>
      <div className="hero-visual">
        <img
          src={media.hero}
          alt={t.hero.alt}
          width="1254"
          height="1254"
          fetchPriority="high"
        />
        <div className="image-index">THE EVERYDAY COMPANION / 001</div>
        <div className="hero-label">
          <span>{t.hero.label}</span>
          <strong>{t.hero.labelTitle}</strong>
          <ArrowUpRight size={20} />
        </div>
        <span className="concept-caption">{t.hero.visual}</span>
      </div>
    </section>
  );
}
