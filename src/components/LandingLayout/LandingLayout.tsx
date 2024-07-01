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
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: fit-content;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  background-color: transparent;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
    color: white;
  }

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

export { LandingLayout };
