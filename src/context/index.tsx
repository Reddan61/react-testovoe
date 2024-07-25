import { createContext, FC, ReactNode, useContext, useState } from "react";
import { deleteTokenStorage, setTokenStorage } from "../api";

const AuthContext = createContext<{
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}>({
    isAuth: false,
    setIsAuth: () => {}
});

export const AuthContextProvider: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    const [isAuth, setIsAuth] = useState(false);

    return <AuthContext.Provider value={{
        isAuth,
        setIsAuth
    }}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const login = (token: string) => {
        setTokenStorage(token);
        setIsAuth(true);
    }

    const changeAuth = (auth: boolean) => {
        setIsAuth(auth);
    }

    const logout = () => {
        deleteTokenStorage();
        setIsAuth(false);
    }

    return {
        isAuth,
        login,
        logout,
        changeAuth
    }
} 