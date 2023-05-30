import React, { useState, useContext, createContext } from 'react'

const AppContext =  createContext() 

export const useAppContext = () => {
    return useContext(AppContext)
}

const AppProvider = ({children}) => {
    const [isSidebar, setIsSidebar] = useState(false)
    // const [isSidebar, setIsSidebar] = useState(false)
    return <AppContext.Provider value={"hello"}>
        {children}
    </AppContext.Provider>
}

export {AppProvider, AppContext} 