import React, { createContext, useState } from 'react';

interface AppContextProps {
  debug: boolean,
  transactions: any[],
  location: Location,
  transRowWait: boolean,
}

type AppContextType = {
  appContext: AppContextProps,
  setAppContext: (value: AppContextProps) => void
}

const defaults = {
  appContext: {
    debug: false,
    transactions: [],
    location: document.location,
    transRowWait: true,
  },
  setAppContext: (value: AppContextProps) => value,
};

export const AppContext = createContext<AppContextType>(defaults);

export const ContextProvider: React.FC = ({ children }) => {
  const [appContext, setAppContext] = useState({
    debug: false,
    transactions: [],
    location: document.location,
    transRowWait: true,
  });

  // @ts-ignore
  document.mwec = appContext;
  // @ts-ignore
  document.mwesc = setAppContext;

  return (
    // @ts-ignore
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  );
};