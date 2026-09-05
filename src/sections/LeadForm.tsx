import { useRef, useState, type SubmitEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  LoaderCircle,
  AlertCircle,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { scents } from '../data/scents';
import {
  validateLead,
  submitLead,
  clearLocalLead,
  type LeadErrors,
} from '../services/leadService';
import type { Copy } from '../data/translations';
export function LeadForm({
  copy: t,
  preferredScent,
  onPreferredScent,
}: {
  copy: Copy;
  preferredScent: string;
  onPreferredScent: (scent: string) => void;
}) {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'error' | 'success' | 'deleted'
  >('idle');
  const [submittedScent, setSubmittedScent] = useState('');
  const [mode, setMode] = useState<'local' | 'remote'>('local');
  const busy = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT?.trim() || undefined;
  const isLocal = !endpoint;
  const update = (key: keyof typeof fields, value: string) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    if (status === 'error' || status === 'deleted') setStatus('idle');
  };
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const input = { ...fields, scent: preferredScent };
    const validation = validateLead(input);
    setErrors(validation);
    if (Object.keys(validation).length) {
      const name = Object.keys(validation)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
      return;
    }
    busy.current = true;
    setStatus('loading');
    try {
      const result = await submitLead(input, endpoint);
      setMode(result.mode);
      setSubmittedScent(preferredScent);
      setStatus('success');
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus('error');
    } finally {
      busy.current = false;
    }
  }
  function removeLocal() {
    try {
      clearLocalLead(window.localStorage);
      setFields({ name: '', email: '', message: '' });
      onPreferredScent('');
      setStatus('deleted');
    } catch {
      setStatus('error');
    }
  }
  const errorFor = (key: keyof typeof t.lead.invalid) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {t.lead.invalid[key]}
      </span>
    ) : null;
  return (
    <section
      id="contact"
      className="lead-section section"
      aria-labelledby="lead-title"
    >
      <div className="container lead-grid">
        <div className="lead-copy">
          <span className="eyebrow">
            <span className="status-dot" />
            {t.lead.eyebrow}
          </span>
          <h2 id="lead-title">
            {t.lead.title}
            <br />
            <em>{t.lead.italic}</em>
          </h2>
          <p>{t.lead.intro}</p>
          <span className="development-badge">
            <span className="status-dot" />
            {t.lead.status}
          </span>
          <div className="lead-brand-detail" aria-hidden="true">
            A<span>✳</span>
          </div>
        </div>
        <div className="form-area">
          {status === 'success' && submittedScent === preferredScent ? (
            <div
              aria-live="polite"
              className="form-success"
              ref={statusRef}
              tabIndex={-1}
            >
              <span className="success-icon">
                <Check size={26} />
              </span>
              <h3>
                {mode === 'local' ? t.lead.successLocal : t.lead.successRemote}
              </h3>
              <p>
                {mode === 'local'
                  ? t.lead.successBodyLocal
                  : t.lead.successBodyRemote}
              </p>
              <Button
                className="button button-dark"
                onClick={() => setStatus('idle')}
              >
                {t.lead.edit}
                <RotateCcw size={16} />
              </Button>
              {mode === 'local' && (
                <Button
                  variant="ghost"
                  className="text-link"
                  onClick={removeLocal}
                >
                  {t.lead.delete}
                </Button>
              )}
            </div>
          ) : (
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              aria-busy={status === 'loading'}
              aria-describedby="lead-privacy"
            >
              <fieldset disabled={status === 'loading'}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="lead-name">
                      {t.lead.name}
                      <span aria-hidden="true"> *</span>
                    </label>
                    <Input
                      id="lead-name"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={80}
                      placeholder={t.lead.namePlaceholder}
                      value={fields.name}
                      onChange={(e) => update('name', e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errorFor('name')}
                  </div>
                  <div className="field">
                    <label htmlFor="lead-email">
                      {t.lead.email}
                      <span aria-hidden="true"> *</span>
                    </label>
                    <Input
                      id="lead-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder={t.lead.emailPlaceholder}
                      value={fields.email}
                      onChange={(e) => update('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                    />
                    {errorFor('email')}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="lead-scent">
                    {t.lead.scent}
                    <span aria-hidden="true"> *</span>
                  </label>
                  <NativeSelect
                    id="lead-scent"
                    name="scent"
                    required
                    value={preferredScent}
                    onChange={(e) => {
                      onPreferredScent(e.target.value);
                      setErrors((previous) => ({
                        ...previous,
                        scent: undefined,
                      }));
                    }}
                    aria-invalid={Boolean(errors.scent)}
                    aria-describedby={errors.scent ? 'scent-error' : undefined}
                  >
                    <NativeSelectOption value="" disabled>
                      {t.lead.choose}
                    </NativeSelectOption>
                    {scents.map((scent) => (
                      <NativeSelectOption key={scent.id} value={scent.id}>
                        {scent.name} — {scent.character}
                      </NativeSelectOption>
                    ))}
                    <NativeSelectOption value="exploring">
                      {t.lead.unsure}
                    </NativeSelectOption>
                  </NativeSelect>
                  {errorFor('scent')}
                </div>
                <div className="field">
                  <label htmlFor="lead-message">
                    {t.lead.message} <span>{t.lead.optional}</span>
                  </label>
                  <Textarea
                    id="lead-message"
                    name="message"
                    maxLength={1000}
                    rows={3}
                    placeholder={t.lead.messagePlaceholder}
                    value={fields.message}
                    onChange={(e) => update('message', e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                  />
                  {errorFor('message')}
                </div>
                <p className="privacy-note" id="lead-privacy">
                  {isLocal ? t.lead.localNote : t.lead.remoteNote}
                </p>
                <Button
                  className="button button-dark form-submit"
                  type="submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      {t.lead.submitting}
                      <LoaderCircle className="spin" size={18} />
                    </>
                  ) : (
                    <>
                      {isLocal ? t.lead.submitLocal : t.lead.submitRemote}
                      <ArrowUpRight size={18} />
                    </>
                  )}
                </Button>
              </fieldset>
              {isLocal && (
                <Button
                  variant="ghost"
                  className="clear-local-button text-link"
                  disabled={status === 'loading'}
                  onClick={removeLocal}
                >
                  {t.lead.delete}
                </Button>
              )}
            </form>
          )}
          {status === 'error' && (
            <div role="alert" className="form-error">
              <AlertCircle size={18} />
              <p>{t.lead.error}</p>
            </div>
          )}
          {status === 'deleted' && (
            <output className="deleted-note">{t.lead.deleted}</output>
          )}
        </div>
      </div>
      <div className="container">
        <aside className="roadmap">
          <div>
            <span className="tiny-label">{t.roadmap.label}</span>
            <h3>{t.roadmap.title}</h3>
            <p>{t.roadmap.body}</p>
          </div>
          <div>
            <ArrowRight size={17} />
            <h4>{t.roadmap.qr}</h4>
            <p>{t.roadmap.qrBody}</p>
          </div>
          <div>
            <ArrowRight size={17} />
            <h4>{t.roadmap.nfc}</h4>
            <p>{t.roadmap.nfcBody}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
