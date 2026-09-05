import { useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import type { Scent, ScentId } from '../data/scents';
import { media } from '../data/media';
import type { Copy } from '../data/translations';
import type { Language } from '../hooks/useLanguage';
export function ScentDialog({
  scent,
  language,
  copy: t,
  onInterest,
  children,
  triggerClass,
}: {
  scent: Scent;
  language: Language;
  copy: Copy;
  onInterest: (id: ScentId) => void;
  children: ReactNode;
  triggerClass?: string;
}) {
  const [open, setOpen] = useState(false);
  const choosingScent = useRef(false);
  const detail = language === 'id' ? scent.idCopy : scent.enCopy;
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) choosingScent.current = false;
        setOpen(next);
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className={triggerClass || 'text-link scent-explore'}
            aria-label={`${t.collection.explore}: ${scent.name}`}
          />
        }
      >
        {children}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        finalFocus={() =>
          choosingScent.current ? document.getElementById('lead-name') : true
        }
        className={`scent-modal scent-${scent.id}`}
      >
        <DialogClose
          render={
            <Button
              variant="ghost"
              className="modal-close icon-button"
              aria-label={t.nav.close}
            />
          }
        >
          <X size={23} />
        </DialogClose>
        <div className="modal-image">
          <img
            src={media.scents[scent.id]}
            alt={t.collection.imageAlt.replace('{name}', scent.name)}
            width="1000"
            height="1000"
          />
          <span className="tiny-label">{t.hero.visual}</span>
        </div>
        <div className="modal-copy">
          <span className="eyebrow">
            {scent.number} / {t.collection.concept}
          </span>
          <DialogTitle className="scent-modal-title">{scent.name}</DialogTitle>
          <DialogDescription className="scent-modal-story">
            {detail.story}
          </DialogDescription>
          <span className="tiny-label">{t.collection.notes}</span>
          <p className="character">{scent.character}</p>
          <span className="tiny-label">{t.collection.inspiration}</span>
          <p className="modal-detail">{detail.detail}</p>
          <div className="mood-tags">
            {detail.moods.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <p className="concept-notice">{t.collection.notice}</p>
          <a
            className="button button-dark"
            href="#contact"
            onClick={() => {
              choosingScent.current = true;
              onInterest(scent.id);
              setOpen(false);
            }}
          >
            {t.collection.interest}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
