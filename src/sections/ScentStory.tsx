import {
  ArrowRight,
  MapPin,
  Sparkles,
  Droplets,
  Box,
  Fingerprint,
} from 'lucide-react';
import type { Copy } from '../data/translations';
const icons = [MapPin, Sparkles, Droplets, Box, Fingerprint];
export function ScentStory({ copy: t }: { copy: Copy }) {
  return (
    <section
      id="story"
      className="story-section section"
      aria-labelledby="story-title"
    >
      <div className="container">
        <div className="story-main">
          <div>
            <span className="eyebrow">{t.story.eyebrow}</span>
            <h2 id="story-title">
              {t.story.title}
              <br />
              <em>{t.story.italic}</em>
            </h2>
          </div>
          <div className="story-text">
            <p>{t.story.body}</p>
            <p>{t.story.ending}</p>
          </div>
        </div>
        <ol className="story-sequence">
          {t.story.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step}>
                <span className="story-node">
                  <Icon size={29} strokeWidth={1.1} />
                </span>
                <span className="tiny-label">
                  0{i + 1} / {step}
                </span>
                {i < 4 && (
                  <ArrowRight
                    className="story-arrow"
                    size={18}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
        <div className="story-bottom">
          <span className="tiny-label">{t.story.note}</span>
          <span className="story-signature">Carry a Place.</span>
        </div>
      </div>
    </section>
  );
}
