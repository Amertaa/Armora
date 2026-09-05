export type ScentId = 'canopy' | 'concrete' | 'afterglow';
export type MoodId = 'fresh' | 'cool' | 'warm' | 'calm';
export const moods: MoodId[] = ['fresh', 'cool', 'warm', 'calm'];
export const scents = [
  {
    id: 'canopy' as ScentId,
    number: '01',
    name: 'CANOPY',
    character: 'Fresh / Green / Woody',
    idCopy: {
      story: 'Udara pagi. Daun yang basah. Jeda kecil di tengah hari.',
      detail:
        'Terinspirasi vegetasi tropis dan cahaya yang menembus dedaunan. CANOPY mengeksplorasi rasa segar yang tenang, dengan arah hijau dan woody yang bersih.',
      moods: ['Segar', 'Tenang', 'Alami', 'Bersih'],
    },
    enCopy: {
      story: 'Morning air. Dew-covered leaves. A quiet pause in your day.',
      detail:
        'Inspired by tropical vegetation and light filtering through leaves. CANOPY explores a calm kind of freshness, with a clean green and woody direction.',
      moods: ['Fresh', 'Calm', 'Natural', 'Clean'],
    },
  },
  {
    id: 'concrete' as ScentId,
    number: '02',
    name: 'CONCRETE',
    character: 'Ozonic / Citrus / Musk',
    idCopy: {
      story: 'Kota setelah hujan. Ruang terbuka. Pikiran yang jernih.',
      detail:
        'Terinspirasi garis arsitektur modern, permukaan concrete, dan udara setelah hujan. CONCRETE mengeksplorasi suasana urban yang sejuk melalui arah ozonic, citrus, dan musk.',
      moods: ['Modern', 'Sejuk', 'Minimal', 'Urban'],
    },
    enCopy: {
      story: 'A city after the rain. Open space. A clearer state of mind.',
      detail:
        'Inspired by modern architectural lines, concrete surfaces, and air after the rain. CONCRETE explores a cool urban feeling through an ozonic, citrus, and musk direction.',
      moods: ['Modern', 'Cool', 'Minimal', 'Urban'],
    },
  },
  {
    id: 'afterglow' as ScentId,
    number: '03',
    name: 'AFTERGLOW',
    character: 'Citrus / Amber / Soft Woody',
    idCopy: {
      story: 'Sore yang memanjang. Perjalanan pulang. Hangat yang tinggal.',
      detail:
        'Terinspirasi cahaya sore dan perjalanan pulang saat siang beralih menjadi malam. AFTERGLOW mengeksplorasi kehangatan yang lembut dan sedikit nostalgia melalui arah citrus, amber, dan soft woody.',
      moods: ['Hangat', 'Nostalgis', 'Lembut', 'Youthful'],
    },
    enCopy: {
      story: 'A lingering afternoon. The way home. Warmth that stays.',
      detail:
        'Inspired by late afternoon light and the journey home as day turns to night. AFTERGLOW explores soft warmth and a little nostalgia through a citrus, amber, and soft woody direction.',
      moods: ['Warm', 'Nostalgic', 'Soft', 'Youthful'],
    },
  },
];
export type Scent = (typeof scents)[number];
export const moodRecommendations: Record<MoodId, ScentId> = {
  fresh: 'canopy',
  cool: 'concrete',
  warm: 'afterglow',
  calm: 'canopy',
};
export function recommendScent(mood: MoodId) {
  return scents.find((scent) => scent.id === moodRecommendations[mood])!;
}
