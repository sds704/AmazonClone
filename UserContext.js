import {createContext,useState} from "react";

const UserType = createContext();

const UserContext = ({children}) => {
    const [userId,setUserId] = useState("");
    // const [url, setUrl] = useState();
    return (
        <UserType.Provider value={{userId,setUserId}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType,UserContext};