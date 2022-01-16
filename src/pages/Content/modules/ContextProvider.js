import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [context, setContext] = useState({
    debug: false,
    transactions: [],
    location: document.location,
    transRowWait: true,
  });
  document.mwec = context;
  document.mwesc = setContext;

  return (
    <AppContext.Provider value={[context, setContext]}>
      {children}
    </AppContext.Provider>
  );
};
