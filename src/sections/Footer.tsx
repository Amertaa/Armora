import { ArrowUp, ArrowUpRight, Camera, Mail } from 'lucide-react';
import { Brand } from '../components/Brand';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { site } from '../data/site';
import type { Copy } from '../data/translations';
import type { Language } from '../hooks/useLanguage';
export function Footer({
  copy: t,
  language,
  onLanguage,
}: {
  copy: Copy;
  language: Language;
  onLanguage: (lang: Language) => void;
}) {
  const social = [
    { name: 'Instagram', url: site.social.instagram, Icon: Camera },
    { name: 'TikTok', url: site.social.tiktok, Icon: ArrowUpRight },
    {
      name: 'Email',
      url: site.social.email ? `mailto:${site.social.email}` : null,
      Icon: Mail,
    },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p className="footer-tagline">Carry a Place.</p>
            <p>{t.footer.line}</p>
          </div>
          <div className="footer-links">
            <span className="tiny-label">{t.footer.navigation}</span>
            <a href="#collection">{t.nav.collection}</a>
            <a href="#case">{t.nav.case}</a>
            <a href="#story">{t.nav.story}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="footer-social">
            <span className="tiny-label">{t.footer.connect}</span>
            {social.map(({ name, url, Icon }) =>
              url ? (
                <a
                  key={name}
                  href={url}
                  target={name === 'Email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                >
                  <Icon size={16} />
                  {name}
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                <div key={name} className="social-placeholder">
                  <Icon size={16} />
                  <span>{name}</span>
                  <span>{t.footer.coming}</span>
                </div>
              ),
            )}
          </div>
          <a className="back-top" href="#home" aria-label={t.footer.top}>
            <ArrowUp size={24} strokeWidth={1.4} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} ARMORA. {t.footer.rights}
          </span>
          <span>{t.footer.development}</span>
          <LanguageSwitch
            language={language}
            onChange={onLanguage}
            label={t.nav.language}
          />
        </div>
      </div>
    </footer>
  );
}
