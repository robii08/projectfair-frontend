import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})
export const editResponseContext = createContext({})
export const loginContext = createContext(true)
function Contextshare({children}) {
    //children is a predefined props
    const [addResponse, setAddResponse] = useState({})
    const [editResponse, setEditResponse] = useState({})
    const [loginStatus, setLoginStatus] = useState(true)
  return (
    <addResponseContext.Provider value={{addResponse, setAddResponse}}>
    <loginContext.Provider value={{loginStatus, setLoginStatus}}>
    <editResponseContext.Provider value={{editResponse, setEditResponse}}>
        {children}
    </editResponseContext.Provider>
    </loginContext.Provider>      
    </addResponseContext.Provider>
  )
}

export default Contextshare