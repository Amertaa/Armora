import { useEffect, useRef, useState, type MouseEvent } from 'react';
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
  const pendingSection = useRef<string | null>(null);
  const scrollFrame = useRef<number | null>(null);

  function cancelPreviewScroll() {
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = null;
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
          'Tab',
          'Escape',
        ].includes(event.key)
      )
        cancelPreviewScroll();
    };
    window.addEventListener('wheel', cancelPreviewScroll, { passive: true });
    window.addEventListener('touchstart', cancelPreviewScroll, {
      passive: true,
    });
    window.addEventListener('pointerdown', cancelPreviewScroll, {
      passive: true,
    });
    window.addEventListener('resize', cancelPreviewScroll);
    window.addEventListener('popstate', cancelPreviewScroll);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      cancelPreviewScroll();
      window.removeEventListener('wheel', cancelPreviewScroll);
      window.removeEventListener('touchstart', cancelPreviewScroll);
      window.removeEventListener('pointerdown', cancelPreviewScroll);
      window.removeEventListener('resize', cancelPreviewScroll);
      window.removeEventListener('popstate', cancelPreviewScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (!section) return;
    cancelPreviewScroll();

    const headerHeight =
      document.querySelector('.site-header')?.getBoundingClientRect().height ??
      0;
    const top = Math.max(
      0,
      window.scrollY + section.getBoundingClientRect().top - headerHeight - 16,
    );
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // Updating the fragment must not trigger a second, instant anchor jump.
    if (window.location.hash !== `#${id}`)
      window.history.pushState(null, '', `#${id}`);
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
    // Explicit, opt-in local preview. Production always follows reduced motion.
    const forcePreviewMotion =
      import.meta.env.DEV &&
      import.meta.env.VITE_PREVIEW_SMOOTH_SCROLL === 'true';
    if (!forcePreviewMotion) {
      window.scrollTo({ top, behavior: reduceMotion ? 'instant' : 'smooth' });
      return;
    }

    const start = window.scrollY;
    const distance = top - start;
    const duration = Math.min(800, Math.max(350, Math.abs(distance) * 0.22));
    const startedAt = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased =
        progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
      scrollFrame.current = progress < 1 ? requestAnimationFrame(step) : null;
    };
    scrollFrame.current = requestAnimationFrame(step);
  }

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const id = event.currentTarget.hash.slice(1);
    if (!document.getElementById(id)) return;
    event.preventDefault();

    if (open) {
      // Wait for the mobile dialog to release its scroll lock.
      pendingSection.current = id;
      setOpen(false);
    } else {
      scrollToSection(id);
    }
  }

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
              <a key={id} href={`#${id}`} onClick={handleSectionClick}>
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
            <a
              className="button button-dark nav-cta"
              href="#collection"
              onClick={handleSectionClick}
            >
              {copy.nav.cta}
              <ArrowUpRight size={15} />
            </a>
            <Dialog
              open={open}
              onOpenChange={setOpen}
              onOpenChangeComplete={(isOpen) => {
                if (!isOpen && pendingSection.current) {
                  const id = pendingSection.current;
                  pendingSection.current = null;
                  scrollToSection(id);
                }
              }}
            >
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
              <DialogContent
                className="mobile-menu"
                showCloseButton={false}
                finalFocus={() => (pendingSection.current ? false : true)}
              >
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
                    <a key={id} href={`#${id}`} onClick={handleSectionClick}>
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
