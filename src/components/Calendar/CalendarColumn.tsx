import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { MonthlyShift } from "../MainLayout/MainLayout";

interface CalendarColumnProps {
  days: Date[];
  selectedDay?: Date;
  setSelectedDay: Dispatch<SetStateAction<Date | undefined>>;
  monthlyShifts: MonthlyShift[];
}

function CalendarColumn({
  days,
  selectedDay,
  setSelectedDay,
  monthlyShifts,
}: CalendarColumnProps) {
  return (
    <CalendarColumnContainer>
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
        >
          {day.getDate()}
        </DateBox>
      ))}
    </CalendarColumnContainer>
  );
}

export { CalendarColumn };

const CalendarColumnContainer = styled.div``;

const EmptyBox = styled.div`
  width: 24px;
  height: 24px;
  opacity: 1;
  margin: 4px;
`;

const DateBox = styled.div<{
  $isSelected: boolean;
  $hasShiftSelected: boolean;
}>`
  width: 24px;
  height: 24px;
  background-color: grey;
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

  &:hover {
    background-color: #c1c1c1;
  }
`;
