import React, { createContext, useState } from 'react';

interface txnFromMint {
  date: string,
  merchant: string,
  category: string,
  isDebit: string,
  amount: string,
  id: string,
  note: string,
};

interface AppContextProps {
  debug: boolean,
  transactions: txnFromMint[],
  location: Location,
  transRowWait: boolean,
}

type SetAppContextType = (value: AppContextProps) => void;

type AppContextType = {
  appContext: AppContextProps,
  setAppContext: SetAppContextType,
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
    transactions: [] as txnFromMint[],
    location: document.location,
    transRowWait: true,
  });

  (document as any).mwec = appContext;
  (document as any).mwesc = setAppContext;

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  );
};