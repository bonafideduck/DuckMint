import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [context, setContext] = useState({
    name: 'Learning React',
    author: 'John Doe',
    SerialNumber: 1234,
  });
  document.mwec = context;
  document.mwesc = setContext;

  return (
    <AppContext.Provider value={[context, setContext]}>
      {children}
    </AppContext.Provider>
  );
};
