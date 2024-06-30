import styled from "styled-components";
import cancleIcon from "../../assets/cancel_icon.png";
import { Dispatch, SetStateAction } from "react";
import { MonthlyShift } from "../MainLayout/MainLayout";

type Shift = "Day" | "Swing" | "Night";

interface ShiftSelectionPanelProps {
  selectedDay: Date;
  setSelectedDay: Dispatch<SetStateAction<Date | undefined>>;
  monthlyShifts: MonthlyShift[];
  handleSetShift: (shift: Shift) => void;
}

function ShiftSelectionPanel({
  selectedDay,
  setSelectedDay,
  monthlyShifts,
  handleSetShift,
}: ShiftSelectionPanelProps) {
  const shifts: Shift[] = ["Day", "Swing", "Night"];

  return (
    <ShiftPanelContainer>
      <CancelImg
        src={cancleIcon}
        alt="Cancel Icon"
        onClick={() => setSelectedDay(undefined)}
      />
      {shifts.map((shift) => (
        <ShiftButton
          key={shift}
          $isSelected={
            !!monthlyShifts
              .find((shift) => shift.date.getTime() === selectedDay.getTime())
              ?.shifts?.includes(shift)
          }
          onClick={() => handleSetShift(shift)}
        >
          {shift}
        </ShiftButton>
      ))}
    </ShiftPanelContainer>
  );
}

export { ShiftSelectionPanel, type Shift };

const ShiftPanelContainer = styled.div`
  width: 160px;
  height: 100%;
  border: 2px solid #e7e7e7;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
`;

const ShiftButton = styled.div<{ $isSelected: boolean }>`
  width: 80px;
  background-color: ${(props) => (props.$isSelected ? "#ffd700" : "#efefef")};
  border-radius: 4px;
  text-align: center;
  padding: 4px;
`;

const CancelImg = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 8px;
  right: 8px;
`;
