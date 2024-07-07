import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { MonthlyShift } from "../MainLayout/MainLayout";

interface CalendarColumnProps {
  days: Date[];
  selectedDay?: Date;
  setSelectedDay: Dispatch<SetStateAction<Date | undefined>>;
  monthlyShifts: MonthlyShift[];
  holidaysInMonth: Date[];
}

function CalendarColumn({
  days,
  selectedDay,
  setSelectedDay,
  monthlyShifts,
  holidaysInMonth,
}: CalendarColumnProps) {
  const weekday = days[0].toLocaleDateString("en-US", { weekday: "short" })[0];
  const isSunday = days[0].getDay() === 0;

  return (
    <CalendarColumnContainer>
      <DayBox $isSunday={isSunday}>{weekday}</DayBox>
      {days[0].getDate() > days[0].getDay() && <EmptyBox />}
      {days.map((day) => (
        <DateBox
          key={day.toString()}
          onClick={() =>
            selectedDay?.getTime() === day.getTime()
              ? setSelectedDay(undefined)
              : setSelectedDay(day)
          }
          $isSelected={selectedDay?.getTime() === day.getTime()}
          $hasShiftSelected={
            !!monthlyShifts.find(
              (shift) => shift.date.getTime() === day.getTime()
            )?.shifts?.length
          }
          $isHoliday={
            holidaysInMonth.some(
              (holiday) => holiday.getTime() === day.getTime()
            ) || isSunday
          }
        >
          {day.getDate()}
        </DateBox>
      ))}
    </CalendarColumnContainer>
  );
}

export { CalendarColumn };

const CalendarColumnContainer = styled.div``;

const DayBox = styled.div<{ $isSunday: boolean }>`
  width: 24px;
  height: 24px;
  margin: 4px;
  text-align: center;
  vertical-align: middle;
  line-height: 24px;
  font-weight: 500;
  color: ${(props) => (props.$isSunday ? "red" : "black")};
`;

const EmptyBox = styled.div`
  width: 24px;
  height: 24px;
  opacity: 1;
  margin: 4px;
`;

const DateBox = styled.div<{
  $isSelected: boolean;
  $hasShiftSelected: boolean;
  $isHoliday: boolean;
}>`
  width: 24px;
  height: 24px;
  background-color: ${(props) =>
    props.$hasShiftSelected
      ? "#ffd700"
      : props.$isSelected
      ? "#c1c1c1"
      : "#e7e7e7"};
  margin: 4px;
  text-align: center;
  vertical-align: middle;
  line-height: 24px;
  cursor: pointer;
  color: ${(props) => (props.$isHoliday ? "red" : "black")};

  &:hover {
    background-color: ${(props) =>
      props.$hasShiftSelected ? "#ffd700" : "#c1c1c1"};
  }
`;
