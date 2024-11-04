import { createContext, useState } from "react";

export const CurrentPageLabelContext = createContext();

export const CurrentPageLabelProvider = ({ children }) => {
  const [currentPageLabel, setCurrentPageLabel] = useState(null);

  return (
    <CurrentPageLabelContext.Provider
      value={{ currentPageLabel, setCurrentPageLabel }}
    >
      {children}
    </CurrentPageLabelContext.Provider>
  );
};
