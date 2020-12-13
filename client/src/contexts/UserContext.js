import React, {createContext, useState, useEffect} from 'react'
import firebase from '../config/fbConfig'

export const UserContext = createContext();

function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(u => {
            console.log("AUTH CHANGE", u);
            setUser(u);
            setIsAuthenticated(u ? true : false)
            setIsLoaded(true);
        })
    }, [])

    return (
        <div>
            {!isLoaded ? 
            <div className="vw-100 vh-100 text-center d-flex justify-content-center align-items-center">
                <h1 className="text-primary mb-5">Loading...</h1>
            </div> :
            <UserContext.Provider value={{user, isAuthenticated, setUser, setIsAuthenticated}}>
                {children}
            </UserContext.Provider>}
        </div>
    )
}

export default UserProvider
