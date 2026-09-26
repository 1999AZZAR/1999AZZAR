export const EXPERIENCE_START_YEAR = 2018;
export const EXPERIENCE_START_MONTH = 10;

export function getYearsOfExperience(now: Date = new Date()): number {
  let years = now.getFullYear() - EXPERIENCE_START_YEAR;
  const month = now.getMonth() + 1;
  if (month < EXPERIENCE_START_MONTH) years -= 1;
  return Math.max(0, years);
}
