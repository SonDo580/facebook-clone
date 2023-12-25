import { MAX_AGE, Month } from "@/constants";

// Get string keys of Month enum
const getStringMonths = () =>
  Object.keys(Month).filter((key) => isNaN(Number(key)));

// Get Days: 1 - 31
const getDays = () => Array.from({ length: 31 }, (_, index) => index + 1);

// Get years: ? - current year
const getYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - MAX_AGE;

  return Array.from(
    { length: MAX_AGE + 1 },
    (_, index) => startYear + index
  ).reverse();
};

export { getStringMonths, getDays, getYears };
