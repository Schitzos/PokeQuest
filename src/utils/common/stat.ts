import theme from '@/theme';

export const statColor = (val: number) => {
  if (val <= 40) {
    return theme.colors.error;
  } else if (val > 40 && val < 70) {
    return theme.colors.warning;
  } else {
    return theme.colors.success;
  }
};

interface StatItem {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

interface TransformedStats {
  [key: string]: number;
}

export function transformStatsArray(statsArray: StatItem[]): TransformedStats {
  return statsArray.reduce(
    (transformedStats: TransformedStats, statItem: StatItem) => {
      const statName = statItem.stat.name;
      const baseStatValue = statItem.base_stat;

      return {
        ...transformedStats,
        [statName]: baseStatValue,
      };
    },
    {},
  );
}

interface TypeItem {
  slot: number;
  type: {
    name: string;
  };
}

interface TransformedType {
  name: string;
}

export function transformTypesArray(typesArray: TypeItem[]): TransformedType[] {
  return typesArray.map(typeItem => ({
    name: typeItem.type.name,
  }));
}
