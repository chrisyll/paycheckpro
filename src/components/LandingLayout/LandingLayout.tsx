import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface LandingLayoutProps {
  selectedDate?: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  setIsDateSubmitted: Dispatch<SetStateAction<boolean>>;
}

function LandingLayout({
  selectedDate,
  setSelectedDate,
  setIsDateSubmitted,
}: LandingLayoutProps) {
  return (
    <LandingLayoutContainer>
      <DateLabel htmlFor="date">Date selection</DateLabel>
      <DateInput
        type="month"
        id="date"
        name="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <SubmitButton onClick={() => setIsDateSubmitted(true)}>
        SUBMIT
      </SubmitButton>
    </LandingLayoutContainer>
  );
}

const LandingLayoutContainer = styled.div`
  width: fit-content;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const DateLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const DateInput = styled.input`
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  padding: 4px;
  margin: 0 auto;
  font-size: 18px;
`;

const SubmitButton = styled.button`
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  background-color: white;
  border: 1px solid black;
`;

export { LandingLayout };
