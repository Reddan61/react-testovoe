import { Navigate } from "react-router-dom";
import { Box } from "@mui/material"
import { LoginForm } from "../Components/LoginForm"
import { useAuthContext } from "../context";

export const AuthPage = () => {
    const { isAuth } = useAuthContext();

    if (isAuth) {
        return <Navigate to={"/"} />
    }

    return <Box width={"100%"} minHeight={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <LoginForm />
    </Box>
}