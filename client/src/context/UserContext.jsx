import { createContext, useState } from "react";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const obj = {
        email: `${localStorage.getItem('email')}`,
        nom: `${localStorage.getItem('nom')}`,
        prenom: `${localStorage.getItem('prenom')}`
    }
    const [user, setUser] = useState(obj)

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}
export default UserProvider