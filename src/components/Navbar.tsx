import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Brand } from './Brand';
import { LanguageSwitch } from './LanguageSwitch';
import type { Copy } from '../data/translations';
import type { Language } from '../hooks/useLanguage';
export function Navbar({
  copy,
  language,
  onLanguage,
}: {
  copy: Copy;
  language: Language;
  onLanguage: (lang: Language) => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const query = matchMedia('(min-width: 1001px)');
    const close = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener('change', close);
    return () => query.removeEventListener('change', close);
  }, []);
  const links = [
    ['home', copy.nav.home],
    ['collection', copy.nav.collection],
    ['case', copy.nav.case],
    ['story', copy.nav.story],
    ['contact', copy.nav.contact],
  ];
  return (
    <>
      <a href="#main" className="skip-link">
        {copy.nav.skip}
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label={copy.footer.navigation}>
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <LanguageSwitch
              language={language}
              onChange={onLanguage}
              label={copy.nav.language}
            />
            <a className="button button-dark nav-cta" href="#collection">
              {copy.nav.cta}
              <ArrowUpRight size={15} />
            </a>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                render={
                  <Button
                    variant="ghost"
                    className="menu-toggle"
                    aria-label={copy.nav.menu}
                  />
                }
              >
                <Menu size={23} />
              </DialogTrigger>
              <DialogContent className="mobile-menu" showCloseButton={false}>
                <div className="mobile-menu-top">
                  <DialogTitle>
                    <span className="wordmark">ARMORA</span>
                  </DialogTitle>
                  <DialogClose
                    render={
                      <Button
                        className="icon-button"
                        variant="ghost"
                        aria-label={copy.nav.close}
                      />
                    }
                  >
                    <X size={23} />
                  </DialogClose>
                </div>
                <nav aria-label={copy.footer.navigation}>
                  {links.map(([id, label], i) => (
                    <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                      <span>0{i + 1}</span>
                      {label}
                      <ArrowUpRight size={25} />
                    </a>
                  ))}
                </nav>
                <p>Carry a Place.</p>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
    </>
  );
}
