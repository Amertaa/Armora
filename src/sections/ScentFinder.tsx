import { useState } from 'react';
import {
  ArrowUpRight,
  Leaf,
  Wind,
  Sun,
  CloudSun,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  moods,
  recommendScent,
  type MoodId,
  type ScentId,
} from '../data/scents';
import { media } from '../data/media';
import { ScentDialog } from '../components/ScentDialog';
import { useScentTool } from '../hooks/useScentTool';
import type { Copy } from '../data/translations';
import type { Language } from '../hooks/useLanguage';
const icons = [Leaf, Wind, Sun, CloudSun];
export function ScentFinder({
  copy: t,
  language,
  onInterest,
}: {
  copy: Copy;
  language: Language;
  onInterest: (id: ScentId) => void;
}) {
  const [mood, setMood] = useState<MoodId | null>(null);
  useScentTool(setMood);
  const scent = mood ? recommendScent(mood) : null;
  return (
    <section
      id="scent-finder"
      className="finder-section section container"
      aria-labelledby="finder-title"
    >
      <div className="finder-panel">
        <div className="finder-copy">
          <span className="eyebrow">{t.finder.eyebrow}</span>
          <h2 id="finder-title">
            {t.finder.title}
            <br />
            <em>{t.finder.italic}</em>
          </h2>
          <p>{t.finder.intro}</p>
          <fieldset className="mood-options" aria-label={t.finder.question}>
            {moods.map((item, i) => {
              const Icon = icons[i];
              return (
                <Button
                  variant="outline"
                  key={item}
                  className={`mood-option ${mood === item ? 'selected' : ''}`}
                  aria-pressed={mood === item}
                  onClick={() => setMood(item)}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  {t.finder.moods[i]}
                  <span className="mood-radio" aria-hidden="true" />
                </Button>
              );
            })}
          </fieldset>
          <p className="finder-disclaimer">{t.finder.disclaimer}</p>
        </div>
        <div className={`finder-result ${scent ? `scent-${scent.id}` : ''}`}>
          <div className="finder-live" aria-live="polite" aria-atomic="true">
            {scent ? (
              <>
                <span className="tiny-label">{t.finder.match}</span>
                <h3>{scent.name}</h3>
                <p>{t.finder.why[moods.indexOf(mood!)]}</p>
              </>
            ) : (
              <>
                <Sparkles size={34} strokeWidth={1} />
                <span className="finder-empty-title">
                  Your mood.
                  <br />
                  <em>Your little place.</em>
                </span>
                <p>{t.finder.hint}</p>
              </>
            )}
          </div>
          {scent && (
            <>
              <img
                className="finder-image"
                src={media.scents[scent.id]}
                alt={t.collection.imageAlt.replace('{name}', scent.name)}
                loading="lazy"
                width="1000"
                height="1000"
              />
              <ScentDialog
                scent={scent}
                language={language}
                copy={t}
                onInterest={onInterest}
                triggerClass="text-link finder-explore"
              >
                {t.finder.explore}
                <ArrowUpRight size={17} />
              </ScentDialog>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
