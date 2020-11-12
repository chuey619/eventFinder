import React, {createContext, useContext, useReducer, useEffect} from 'react'
import {isEmpty} from './util'

export const UserContext = createContext(null)

const initialValue = {
    user: null
}

export const UserProvider = ({reducer, children}) => {
    const [state, dispatch] = useReducer(reducer, initialValue)


    useEffect(async () => {
        const response = await fetch(`/auth/me`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()
        if (!isEmpty(json?.data?.user)) {
            dispatch({
                type: 'login',
                user: json?.data?.user
            })
        }
    }, [])

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)