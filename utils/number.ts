export const toFixed = (value: number, precision: number = 1) => {
  return value.toFixed(precision);
};

export const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
