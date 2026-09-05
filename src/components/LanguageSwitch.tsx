import { Button } from '@/components/ui/button';
import type { Language } from '../hooks/useLanguage';
export function LanguageSwitch({
  language,
  onChange,
  label,
}: {
  language: Language;
  onChange: (language: Language) => void;
  label: string;
}) {
  return (
    <fieldset className="language-switch" aria-label={label}>
      {(['id', 'en'] as const).map((code, index) => (
        <span key={code}>
          {index > 0 && (
            <span className="language-divider" aria-hidden="true">
              /
            </span>
          )}
          <Button
            variant="ghost"
            className={`language-button ${language === code ? 'active' : ''}`}
            aria-pressed={language === code}
            onClick={() => onChange(code)}
            lang={code}
          >
            {code.toUpperCase()}
          </Button>
        </span>
      ))}
    </fieldset>
  );
}
