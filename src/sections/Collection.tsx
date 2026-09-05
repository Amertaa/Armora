import { ArrowUpRight } from 'lucide-react';
import { scents, type ScentId } from '../data/scents';
import { media } from '../data/media';
import { ScentDialog } from '../components/ScentDialog';
import type { Copy } from '../data/translations';
import type { Language } from '../hooks/useLanguage';
export function Collection({
  copy: t,
  language,
  onInterest,
}: {
  copy: Copy;
  language: Language;
  onInterest: (id: ScentId) => void;
}) {
  return (
    <section
      id="collection"
      className="collection-section section"
      aria-labelledby="collection-title"
    >
      <div className="container">
        <div className="section-top">
          <div>
            <span className="eyebrow">{t.collection.eyebrow}</span>
            <h2 id="collection-title">
              {t.collection.title}
              <br />
              <em>{t.collection.italic}</em>
            </h2>
          </div>
          <p className="section-intro">{t.collection.intro}</p>
        </div>
        <div className="collection-grid">
          {scents.map((scent) => {
            const detail = language === 'id' ? scent.idCopy : scent.enCopy;
            return (
              <article
                key={scent.id}
                className={`scent-card scent-${scent.id}`}
              >
                <div className="scent-image">
                  <img
                    src={media.scents[scent.id]}
                    alt={t.collection.imageAlt.replace('{name}', scent.name)}
                    loading="lazy"
                    decoding="async"
                    width="1000"
                    height="1000"
                  />
                  <div className="scent-card-index">
                    <span>{scent.number}</span>
                    <span>{t.collection.concept}</span>
                  </div>
                </div>
                <div className="scent-card-copy">
                  <h3>{scent.name}</h3>
                  <p className="scent-character">{scent.character}</p>
                  <p className="scent-story">{detail.story}</p>
                  <div className="mood-tags">
                    {detail.moods.slice(0, 3).map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                  <ScentDialog
                    scent={scent}
                    language={language}
                    copy={t}
                    onInterest={onInterest}
                  >
                    {t.collection.explore}
                    <ArrowUpRight size={18} />
                  </ScentDialog>
                </div>
              </article>
            );
          })}
        </div>
        <div className="collection-footnote">
          <span className="tiny-label">{t.collection.small}</span>
          <p>{t.collection.notice}</p>
        </div>
      </div>
    </section>
  );
}
