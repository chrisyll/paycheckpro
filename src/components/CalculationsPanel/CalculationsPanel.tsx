import styled from "styled-components";
import { calculateHolidaysInMonth } from "../../utils/calculateHolidaysInMonth";
import { MonthlyShift } from "../MainLayout/MainLayout";
import { BASE_SALARY, calculatePay } from "../../utils/calculatePay";

interface CalculationsPanelProps {
  monthlyShifts: MonthlyShift[];
}

function CalculationsPanel({ monthlyShifts }: CalculationsPanelProps) {
  const bookedShifts = monthlyShifts.filter((shift) => shift.shifts.length > 0);

  const holidaysInMonth = calculateHolidaysInMonth(
    monthlyShifts[0].date.getMonth(),
    monthlyShifts[0].date.getFullYear()
  );

  const extraPay = bookedShifts.reduce(
    (acc, shift) => acc + calculatePay(shift, holidaysInMonth),
    0
  );

  const bookings = [
    { label: "Booked days:", count: bookedShifts.length },
    {
      label: "Day shifts:",
      count: bookedShifts.filter((shift) => shift.shifts.includes("Day"))
        .length,
    },
    {
      label: "Swing shifts:",
      count: bookedShifts.filter((shift) => shift.shifts.includes("Swing"))
        .length,
    },
    {
      label: "Night shifts:",
      count: bookedShifts.filter((shift) => shift.shifts.includes("Night"))
        .length,
    },
  ];

  return (
    <CalculationsPanelContainer>
      <TextContainerGrid>
        <FlexContainer>
          <SimpleWrapper>
            {bookings.map((booking) => (
              <TextContainer key={booking.label}>{booking.label}</TextContainer>
            ))}
          </SimpleWrapper>
          <SimpleWrapper>
            {bookings.map((booking) => (
              <CenteredTextContainer key={booking.label}>
                {booking.count}
              </CenteredTextContainer>
            ))}
          </SimpleWrapper>
        </FlexContainer>
      </TextContainerGrid>
      <NumberContainerGrid>
        <TextContainer>Gross salary</TextContainer>
        <NumberContainer>{BASE_SALARY}</NumberContainer>
        <ExtraSumContainer>{extraPay} +</ExtraSumContainer>
        <TotalSalaryContainer>{BASE_SALARY + extraPay}</TotalSalaryContainer>
      </NumberContainerGrid>
    </CalculationsPanelContainer>
  );
}

export { CalculationsPanel };

const CalculationsPanelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const TextContainerGrid = styled.div`
  grid-column-start: 3;
  grid-column-end: 8;
`;

const SimpleWrapper = styled.div``;

const TextContainer = styled.div`
  margin: 8px 0;
`;

const CenteredTextContainer = styled.div`
  margin: 8px 0;
  text-align: center;
`;

const NumberContainerGrid = styled.div`
  grid-column-start: 9;
  grid-column-end: 12;
`;

const NumberContainer = styled.div`
  margin: 8px 0;
  color: #ffd700;
`;

const ExtraSumContainer = styled(NumberContainer)`
  border-bottom: 1px solid #ffd700;
`;

const TotalSalaryContainer = styled(NumberContainer)`
  font-weight: 600;
`;
