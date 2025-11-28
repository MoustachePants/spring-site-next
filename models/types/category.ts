export const CATEGORIES = ['onlyFeet', 'swim', 'hotSprings', 'clearWater', 'view'] as const;

export type Category = (typeof CATEGORIES)[number];
