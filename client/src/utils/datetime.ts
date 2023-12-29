import moment from "moment";

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

function getTimeAgo(timeDiff: number): string {
  const duration = moment.duration(timeDiff);

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())}s`;
  }
  if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())}m`;
  }
  if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())}h`;
  }
  if (duration.asDays() < 30) {
    return `${Math.floor(duration.asDays())}d`;
  }
  if (duration.asMonths() < 12) {
    return `${Math.floor(duration.asMonths())}mo`;
  }
  return `${Math.floor(duration.asYears())}y`;
}

export { getStringMonths, getDays, getYears, getTimeAgo };
