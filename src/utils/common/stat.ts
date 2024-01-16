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
