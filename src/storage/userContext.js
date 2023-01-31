import { createContext, useState } from "react";

export const userContext = createContext({user: "anonymus", logedin: false});

function UserProvider(props){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [logedin, setLogedin] = useState(JSON.parse(localStorage.getItem("logedin")));

    function setUserSession(username){
        setUser(username);
        localStorage.setItem("user", JSON.stringify(username));
    }
    function setLogedinSession(value){
        setLogedin(value);
        localStorage.setItem("logedin", JSON.stringify(value));
    }
    return (
        <userContext.Provider value={{user, logedin ,setUserSession ,setLogedinSession}}>
            {props.children}
        </userContext.Provider>
    );
}
export {UserProvider}