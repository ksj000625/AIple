import React, { useEffect, useState } from "react";
import { auth } from "../auth/firebaseAuth";
import RegisterForm from "./RegisterForm";
import { defaultHeaders } from "../config/clientConfig";

export const UserContext = React.createContext( null );
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerFormOpen, setRegisterFormOpen] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(async (firebaseUser) => {
            if(firebaseUser) {
                const token = await firebaseUser.getIdToken();
                defaultHeaders.Authorization = `Bearer ${token}`;
                console.log(defaultHeaders.Authorization);
                const res = await fetch("/api/users/me", {
                    method: "GET",
                    headers: defaultHeaders
                });
                if(res.status === 200) {
                    const user = await res.json();
                    console.log(`user: ${user}`);
                    setUser(user);
                } else if (res.status === 401) {
                    const data = await res.json();
                    if(data.code === "USER_NOT_FOUND") {
                        setRegisterFormOpen(true);
                    }
                }
            } else {
                delete defaultHeaders.Authorization;
                setUser(null);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {(registerFormOpen) ?
                (<RegisterForm setRegisterFormOpen={setRegisterFormOpen}/>) :
                (children)
            }
        </UserContext.Provider>
    );
};