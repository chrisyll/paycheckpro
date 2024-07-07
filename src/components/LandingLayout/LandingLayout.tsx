import { Dispatch, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { SelectedDateContext } from "../../context/SelectedDateProvider";
import { BaseSalaryContext } from "../../context/SalaryContext";

interface LandingLayoutProps {
  setIsDateSubmitted: Dispatch<SetStateAction<boolean>>;
}

function LandingLayout({ setIsDateSubmitted }: LandingLayoutProps) {
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
  const { baseSalary, setBaseSalary } = useContext(BaseSalaryContext);

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
      <SalaryInputContainer>
        <SalaryInputLabel htmlFor="salary">Base salary</SalaryInputLabel>
        <SalaryInput
          type="number"
          id="salary"
          name="salary"
          value={baseSalary || ""}
          placeholder="0"
          autoComplete="off"
          onChange={(e) => setBaseSalary(Number(e.target.value))}
        />
      </SalaryInputContainer>
      <SubmitButton
        disabled={baseSalary <= 0}
        onClick={() => setIsDateSubmitted(true)}
      >
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
  width: 200px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:hover,
  &:focus {
    border-color: #666;
    outline: none;
  }
`;

const SalaryInputContainer = styled.div`
  position: relative;
  width: 120px;
  margin: 12px auto;
`;

const SalaryInputLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 8px;
  font-size: 12px;
  background-color: white;
  padding: 0 4px;
`;

const SalaryInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  padding: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:hover,
  &:focus {
    border-color: #666;
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const SubmitButton = styled.button`
  margin: 8px 0;
  padding: 8px 16px;
  font-size: 16px; /* Increased font size for better readability and balance */
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #ccc;
    border-color: #ccc;
    color: #999;
  }
`;

export { LandingLayout };
