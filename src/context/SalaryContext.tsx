import { createContext, ReactNode, useState } from "react";

interface SalaryContextProps {
  baseSalary: number;
  setBaseSalary: React.Dispatch<React.SetStateAction<number>>;
}

const BaseSalaryContext = createContext<SalaryContextProps>({
  baseSalary: 0,
  setBaseSalary: () => {},
});

const BaseSalaryProvider = ({ children }: { children: ReactNode }) => {
  const [baseSalary, setBaseSalary] = useState<number>(0);

  return (
    <BaseSalaryContext.Provider value={{ baseSalary, setBaseSalary }}>
      {children}
    </BaseSalaryContext.Provider>
  );
};

export { BaseSalaryProvider, BaseSalaryContext };
