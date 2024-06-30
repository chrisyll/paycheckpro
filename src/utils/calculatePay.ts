import { MonthlyShift } from "../components/MainLayout/MainLayout";

const BASE_SALARY = 1697;
const BASE_HOURLY = parseFloat((BASE_SALARY / 280).toFixed(2));
const BASE_NIGHT = parseFloat(((BASE_HOURLY * 60) / 100).toFixed(2));
const BASE_HOLIDAY = parseFloat(((BASE_HOURLY * 75) / 100).toFixed(2));

const calculatePay = (shiftObject: MonthlyShift, holidaysInMonth: Date[]) => {
  const isHoliday = holidaysInMonth.some(
    (holiday) => holiday.getTime() === shiftObject.date.getTime()
  );
  const isNextHoliday = holidaysInMonth.some(
    (holiday) =>
      holiday.toDateString() ===
      new Date(
        new Date(shiftObject.date).setDate(shiftObject.date.getDate() + 1)
      ).toDateString()
  );

  switch (shiftObject.shifts.length) {
    case 1:
      switch (shiftObject.shifts[0]) {
        case "Day":
          return isHoliday ? 8 * BASE_HOLIDAY : 0;
        case "Swing":
          return isHoliday ? 8 * BASE_HOLIDAY + BASE_NIGHT : BASE_NIGHT;
        case "Night":
          return isHoliday && isNextHoliday
            ? 8 * BASE_HOLIDAY
            : isHoliday
            ? 6 * BASE_NIGHT + BASE_HOLIDAY
            : isNextHoliday
            ? BASE_NIGHT + 7 * BASE_HOLIDAY
            : 7 * BASE_NIGHT;
        default:
          return 0;
      }
    case 2:
      if (
        shiftObject.shifts.includes("Day") &&
        shiftObject.shifts.includes("Night")
      ) {
        return isHoliday && isNextHoliday
          ? 16 * BASE_HOLIDAY
          : isHoliday
          ? 6 * BASE_NIGHT + 9 * BASE_HOLIDAY
          : isNextHoliday
          ? BASE_NIGHT + 7 * BASE_HOLIDAY
          : 7 * BASE_NIGHT;
      }
      return 0; // Invalid combination
    default:
      return 0; // No shifts or more than two shifts
  }
};

export { calculatePay, BASE_SALARY };
