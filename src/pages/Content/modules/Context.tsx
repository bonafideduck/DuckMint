import React, {createContext, useState} from 'react'

// @ts-ignore
export const Context = React.createContext();

// @ts-ignore
export const ContextProvider = ({ children }) => {

    const [context, setContext] = useState({
        name:"Learning React",
        author:"John Doe",
        SerialNumber:1234
    })
    
    return (
        <Context.Provider value={[context, setContext]}>
            {children}
        </Context.Provider>
    )
}
