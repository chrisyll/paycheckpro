import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface SelectedDateContextProps {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

const SelectedDateContext = createContext<SelectedDateContextProps>({
  selectedDate: "",
  setSelectedDate: () => {},
});

const getCurrentYearMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
};

const SelectedDateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(getCurrentYearMonth());

  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </SelectedDateContext.Provider>
  );
};

export { SelectedDateProvider, SelectedDateContext };
