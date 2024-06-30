import { useState } from "react";
import { LandingLayout } from "./components/LandingLayout/LandingLayout";
import { MainLayout } from "./components/MainLayout/MainLayout";
import styled from "styled-components";

function App() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  const [selectedDate, setSelectedDate] = useState(`${year}-${month}`);
  const [isDateSubmitted, setIsDateSubmitted] = useState(false);

  return (
    <AppContainer>
      <TitleContainer>
        PayCheck<GoldenText>Pro</GoldenText>
      </TitleContainer>
      {!isDateSubmitted ? (
        <LandingLayout
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setIsDateSubmitted={setIsDateSubmitted}
        />
      ) : (
        <MainLayout
          selectedDate={selectedDate}
          setIsDateSubmitted={setIsDateSubmitted}
        />
      )}
    </AppContainer>
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
