import { useEffect, useState } from 'react';
export type Language = 'id' | 'en';
export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem('armora-language') === 'en' ? 'en' : 'id';
    } catch {
      return 'id';
    }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('armora-language', language);
    } catch {
      /* The switch also works without storage. */
    }
  }, [language]);
  function changeLanguage(next: Language) {
    const sections = [
      ...document.querySelectorAll<HTMLElement>('main section[id]'),
    ];
    const current = sections.find(
      (section) => section.getBoundingClientRect().bottom > 120,
    );
    const offset = current?.getBoundingClientRect().top;
    setLanguage(next);
    requestAnimationFrame(() => {
      if (current && offset !== undefined)
        window.scrollBy({
          top: current.getBoundingClientRect().top - offset,
          behavior: 'instant',
        });
    });
  }
  return { language, changeLanguage };
}
