import { useState } from "react";
import { LandingLayout } from "./components/LandingLayout/LandingLayout";
import { MainLayout } from "./components/MainLayout/MainLayout";
import styled from "styled-components";
import { SelectedDateProvider } from "./context/SelectedDateProvider";
import { BaseSalaryProvider } from "./context/SalaryContext";

function App() {
  const [isDateSubmitted, setIsDateSubmitted] = useState(false);

  return (
    <SelectedDateProvider>
      <BaseSalaryProvider>
        <AppContainer>
          <TitleContainer>
            PayCheck<GoldenText>Pro</GoldenText>
          </TitleContainer>
          {!isDateSubmitted ? (
            <LandingLayout setIsDateSubmitted={setIsDateSubmitted} />
          ) : (
            <MainLayout setIsDateSubmitted={setIsDateSubmitted} />
          )}
        </AppContainer>
      </BaseSalaryProvider>
    </SelectedDateProvider>
  );
}

export default App;

const AppContainer = styled.div``;

const TitleContainer = styled.div`
  font-weight: 600;
  font-size: 2rem;
  widht: 100%;
  text-align: center;
  margin-bottom: 64px;
`;

const GoldenText = styled.span`
  color: #ffd700;
`;
