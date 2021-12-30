import React, {createContext, useState} from 'react'

export const Context = React.createContext();

export const ContextProvider = ({children}) => {

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
