import { Dispatch, SetStateAction } from "react";
import { CalendarColumn } from "./CalendarColumn";
import { MonthlyShift } from "../MainLayout/MainLayout";
import styled from "styled-components";

interface CalendarProps {
  days: Date[];
  selectedDay?: Date;
  setSelectedDay: Dispatch<SetStateAction<Date | undefined>>;
  monthlyShifts: MonthlyShift[];
}

function Calendar({
  days,
  selectedDay,
  setSelectedDay,
  monthlyShifts,
}: CalendarProps) {
  const dayNumbers = [0, 1, 2, 3, 4, 5, 6];
  return (
    <CalendarContainer>
      {dayNumbers.map((dayNumber) => (
        <CalendarColumn
          key={dayNumber}
          days={days.filter((day) => day.getDay() === dayNumber)}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          monthlyShifts={monthlyShifts}
        />
      ))}
    </CalendarContainer>
  );
}

export { Calendar };

const CalendarContainer = styled.div`
  display: flex;
`;
