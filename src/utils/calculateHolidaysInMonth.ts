enum Holidays {
  NEW_YEARS = "New Year's Eve",
  EPIPHANY = "Epiphany",
  CLEAN_MONDAY = "Clean Monday",
  INDEPENDENCE_DAY = "Independence Day",
  GOOD_FRIDAY = "Good Friday",
  GOOD_SATURDAY = "Good Saturday",
  EASTER = "Easter",
  EASTER_MONDAY = "Easter Monday",
  LABOUR_DAY = "Labour Day",
  PENTECOST = "Pentecost",
  HOLY_SPIRIT = "Holy spirit",
  DORMITION = "Dormition of the Mother of God",
  OHI = "Ohi Day",
  SAINT_BARBARA = "Saint Barbara",
  CHRISTMAS = "Christmas Day",
  GLORIFYING_MOTHER = "Glorifying Mother of God",
}

function calculateHolidaysInMonth(date: string) {
  const [year, month] = date.split("-").map(Number);

  const publicHolidays = calculateHolidayDates(year);

  return publicHolidays.filter((date) => date.getMonth() === month - 1);
}

function calculateHolidayDates(year: number) {
  const easterDate = calculateOrthodoxEaster(year);
  const holidayDates: Record<Holidays, Date> = {
    [Holidays.NEW_YEARS]: new Date(year, 11, 31),
    [Holidays.EPIPHANY]: new Date(year, 0, 6),
    [Holidays.CLEAN_MONDAY]: new Date(
      easterDate.getTime() - 48 * 24 * 60 * 60 * 1000
    ),
    [Holidays.INDEPENDENCE_DAY]: new Date(year, 2, 25),
    [Holidays.GOOD_FRIDAY]: new Date(
      easterDate.getTime() - 2 * 24 * 60 * 60 * 1000
    ),
    [Holidays.GOOD_SATURDAY]: new Date(
      easterDate.getTime() - 1 * 24 * 60 * 60 * 1000
    ),
    [Holidays.EASTER]: easterDate,
    [Holidays.EASTER_MONDAY]: new Date(
      easterDate.getTime() + 1 * 24 * 60 * 60 * 1000
    ),
    [Holidays.LABOUR_DAY]: new Date(year, 4, 1),
    [Holidays.PENTECOST]: new Date(
      easterDate.getTime() + 49 * 24 * 60 * 60 * 1000
    ),
    [Holidays.HOLY_SPIRIT]: new Date(
      easterDate.getTime() + 50 * 24 * 60 * 60 * 1000
    ),
    [Holidays.DORMITION]: new Date(year, 7, 15),
    [Holidays.OHI]: new Date(year, 9, 28),
    [Holidays.SAINT_BARBARA]: new Date(year, 11, 4),
    [Holidays.CHRISTMAS]: new Date(year, 11, 25),
    [Holidays.GLORIFYING_MOTHER]: new Date(year, 11, 26),
  };

  return Object.values(holidayDates);
}

function calculateOrthodoxEaster(year: number): Date {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = (19 * a + 15) % 30;
  const e = (2 * b + 4 * c + 6 * d + 6) % 7;
  const f = d + e;

  let easterDate: Date;
  if (f <= 9) {
    easterDate = new Date(year, 2, 22 + f);
  } else {
    easterDate = new Date(year, 3, f - 9);
  }

  easterDate.setDate(easterDate.getDate() + 13);

  return easterDate;
}

export { calculateHolidaysInMonth };
