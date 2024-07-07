import { Dispatch, SetStateAction, useContext } from "react";
import { CalendarColumn } from "./CalendarColumn";
import { MonthlyShift } from "../MainLayout/MainLayout";
import styled from "styled-components";

import { calculateHolidaysInMonth } from "../../utils/calculateHolidaysInMonth";
import { SelectedDateContext } from "../../context/SelectedDateProvider";

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
  const { selectedDate } = useContext(SelectedDateContext);
  const holidaysInMonth = calculateHolidaysInMonth(selectedDate);
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
          holidaysInMonth={holidaysInMonth}
        />
      ))}
    </CalendarContainer>
  );
}

export { Calendar };

const CalendarContainer = styled.div`
  display: flex;
`;
