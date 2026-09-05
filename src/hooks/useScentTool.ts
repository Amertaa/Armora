import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { moods, recommendScent, type MoodId } from '../data/scents';

type ModelTool = {
  name: string;
  title: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean };
  execute: (input: unknown) => unknown;
};
declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: ModelTool,
        options: { signal: AbortSignal },
      ) => void | Promise<void>;
    };
  }
}
export function useScentTool(selectMood: (mood: MoodId) => void) {
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: 'select_armora_mood',
            title: 'Select a mood in the ARMORA scent finder',
            description:
              'Select fresh, cool, warm, or calm and show its concept scent recommendation in the visible finder. Does not send or save personal details.',
            inputSchema: {
              type: 'object',
              properties: { mood: { type: 'string', enum: moods } },
              required: ['mood'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false },
            execute(input: unknown) {
              if (
                !input ||
                typeof input !== 'object' ||
                Object.keys(input).length !== 1 ||
                !('mood' in input) ||
                !moods.includes(input.mood as MoodId)
              )
                throw new Error(
                  'A valid mood is required: fresh, cool, warm, calm.',
                );
              const mood = input.mood as MoodId;
              flushSync(() => selectMood(mood));
              return {
                mood,
                scent: recommendScent(mood).name,
                status: 'concept',
                updated: 'scent-finder',
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {
        /* Optional enhancement: the visible finder remains available. */
      });
    } catch {
      /* Older browsers use the visible finder. */
    }
    return () => lifecycle.abort();
  }, [selectMood]);
}
