import { scents } from '../data/scents.ts';
export type LeadInput = {
  name: string;
  email: string;
  scent: string;
  message: string;
};
export type LeadErrors = Partial<Record<keyof LeadInput, string>>;
export const STORAGE_KEY = 'armora-interest';
export function validateLead(input: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  if (input.name.trim().length < 2 || input.name.trim().length > 80)
    errors.name = 'name';
  if (
    input.email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())
  )
    errors.email = 'email';
  if (
    input.scent !== 'exploring' &&
    !scents.some((scent) => scent.id === input.scent)
  )
    errors.scent = 'scent';
  if (input.message.trim().length > 1000) errors.message = 'message';
  return errors;
}
export function normalizeLead(input: LeadInput): LeadInput {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    scent: input.scent,
    message: input.message.trim(),
  };
}
export function saveLocalLead(
  input: LeadInput,
  storage: Pick<Storage, 'setItem'>,
) {
  if (Object.keys(validateLead(input)).length) throw new Error('invalid-lead');
  const lead = {
    ...normalizeLead(input),
    savedAt: new Date().toISOString(),
    mode: 'local' as const,
  };
  storage.setItem(STORAGE_KEY, JSON.stringify(lead));
  return { mode: 'local' as const };
}
export function clearLocalLead(storage: Pick<Storage, 'removeItem'>) {
  storage.removeItem(STORAGE_KEY);
}

// This generic JSON endpoint is optional. Adapt the request here for your chosen service.
// Never put provider secrets in a VITE_ variable; all VITE_ values are public.
export async function submitLead(
  input: LeadInput,
  endpoint?: string,
): Promise<{ mode: 'local' | 'remote' }> {
  if (Object.keys(validateLead(input)).length) throw new Error('invalid-lead');
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return saveLocalLead(input, window.localStorage);
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalizeLead(input)),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`lead-submission-${response.status}`);
  return { mode: 'remote' };
}
