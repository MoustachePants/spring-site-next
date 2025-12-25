const sizeMap: Record<number, string> = {
  1: 'קטן מאוד',
  2: 'קטן',
  3: 'בינוני',
  4: 'גדול',
  5: 'ענק',
};

const depthMap: Record<number, string> = {
  1: 'רדוד מאוד',
  2: 'רדוד',
  3: 'גובה מותניים',
  4: 'עמוק',
  5: 'עמוק מאוד',
};

const tempMap: Record<number, string> = {
  1: 'קפוא',
  2: 'קר',
  3: 'קריר',
  4: 'נעים',
  5: 'חם',
  6: 'חם מאוד',
};

export const springSize = (size: number): string => sizeMap[size] ?? '';

export const springDepth = (depth: number): string => depthMap[depth] ?? '';

export const springTemp = (temp: number): string => tempMap[temp] ?? '';
