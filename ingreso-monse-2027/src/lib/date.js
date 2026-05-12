const EXAM_DATE = new Date("2027-12-01T12:00:00-03:00");

export function daysUntilExam(date = new Date()) {
  const ms = EXAM_DATE.getTime() - date.getTime();
  return Math.max(0, Math.ceil(ms / 86400000));
}

export function isoDateOnly(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getWeekRange(date = new Date()) {
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(date);
  start.setDate(date.getDate() + diffToMonday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    start: isoDateOnly(start),
    end: isoDateOnly(end),
  };
}
