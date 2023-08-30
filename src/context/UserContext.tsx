import React, { useMemo, useState } from "react";

type UserContextType = {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
};

export const UserContext = React.createContext<UserContextType>({
  name: "",
  email: "",
  setName: () => {},
  setEmail: () => {},
});

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const value = useMemo(
        () => ({
            name,
            email,
            setName,
            setEmail,
        }),
        [name, email]
    );
    
    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
};