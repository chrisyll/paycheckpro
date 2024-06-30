import { Calendar } from "../Calendar/Calendar";
import arrowBack from "../../assets/arrow_back.png";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import {
  Shift,
  ShiftSelectionPanel,
} from "../ShiftSelectionPanel/ShiftSelectionPanel";
import { CalculationsPanel } from "../CalculationsPanel/CalculationsPanel";

interface MainLayoutProps {
  selectedDate: string;
  setIsDateSubmitted: Dispatch<SetStateAction<boolean>>;
}

interface MonthlyShift {
  date: Date;
  shifts: Shift[];
}

function getAllDaysInMonth(selectedDate: string) {
  const [year, month] = selectedDate.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  const days = [];

  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

function initializeMonthlyShifts(days: Date[]) {
  return days.map((day) => ({
    date: day,
    shifts: [],
  }));
}

function MainLayout({ selectedDate, setIsDateSubmitted }: MainLayoutProps) {
  const days = getAllDaysInMonth(selectedDate);

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [monthlyShifts, setMontlyShifts] = useState<MonthlyShift[]>(
    initializeMonthlyShifts(days)
  );

  function handleSetShift(selectedShift: Shift) {
    if (!selectedDay) return;

    setMontlyShifts((prevState) => {
      const currentShift = prevState.find(
        (shift) => shift.date.getTime() === selectedDay.getTime()
      );

      if (
        selectedShift === "Swing" &&
        (currentShift?.shifts?.includes("Night") ||
          currentShift?.shifts?.includes("Day"))
      ) {
        alert("Cannot select Swing with Night or Day");
        return prevState;
      }

      if (
        (selectedShift === "Night" || selectedShift === "Day") &&
        currentShift?.shifts?.includes("Swing")
      ) {
        alert("Cannot select Night or Day with Swing");
        return prevState;
      }

      return prevState.map((shiftObject) =>
        shiftObject.date.getTime() === selectedDay.getTime()
          ? {
              ...shiftObject,
              shifts: shiftObject.shifts
                ? shiftObject.shifts.includes(selectedShift)
                  ? shiftObject.shifts.filter(
                      (shift) => shift !== selectedShift
                    )
                  : [...shiftObject.shifts, selectedShift]
                : [selectedShift],
            }
          : shiftObject
      );
    });
  }

  return (
    <MainLayoutContainer>
      <GridContainer>
        <BackImgGrid>
          <BackImg
            src={arrowBack}
            alt="Arrow Back"
            onClick={() => setIsDateSubmitted(false)}
          />
        </BackImgGrid>
        <CalendarGrid>
          <Calendar
            days={days}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            monthlyShifts={monthlyShifts}
          />
        </CalendarGrid>
        <ShiftSelectionPanelGrid>
          {selectedDay && (
            <ShiftSelectionPanel
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              monthlyShifts={monthlyShifts}
              handleSetShift={handleSetShift}
            />
          )}
        </ShiftSelectionPanelGrid>
      </GridContainer>
      <CalculationsPanel monthlyShifts={monthlyShifts} />
    </MainLayoutContainer>
  );
}

export { MainLayout, type MonthlyShift };

const MainLayoutContainer = styled.div`
  width: 35%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const BackImgGrid = styled.div`
  grid-column-start: 1;
`;

const BackImg = styled.img`
  cursor: pointer;
`;

const CalendarGrid = styled.div`
  grid-column-start: 3;
  grid-column-end: 9;
`;

const ShiftSelectionPanelGrid = styled.div`
  grid-column-start: 9;
  grid-column-end: 12;
`;
