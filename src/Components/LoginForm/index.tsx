import { useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import { object, string, ValidationError } from "yup";
import { LOGIN_MUTATION } from "../../api";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

interface FormFiedlds {
    email: string,
    password: string
}

type Errors = Record<keyof FormFiedlds, boolean>;

const initFormErrors: Errors = {
    email: false,
    password: false
}

export const LoginForm = () => {
    const navigate = useNavigate();
    const { login: loginHook } = useAuthContext();
    const [login, { loading }] = useMutation(LOGIN_MUTATION);

    const [form, setForm] = useState<FormFiedlds>({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState<Errors>({
        ...initFormErrors
    })

    const onSubmit = async () => {
        try {
            const user = await loginSchema.validate(form, { abortEarly: false });

            setErrors(() => ({
                ...initFormErrors
            }));

            const response = await login({
                variables: {
                    login: user.email,
                    password: user.password
                }
            })

            const token = response.data.login.accessToken;

            loginHook(token);
            navigate("/");
        } catch(err) {
            const yupError = err instanceof ValidationError;

            if (yupError) {
                const fields = err.inner;
                const newErrors: Errors = {
                    ...initFormErrors
                }

                fields.forEach(field => {
                    const name = field.path as keyof Errors;
                    newErrors[name] = true
                })

                setErrors(newErrors);
            }
        }
    }

    return <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
        <TextField label={"Email"} error={errors.email} value={form.email} onChange={e => setForm(state => ({ ...state, email: e.target.value}))}/>
        <TextField label={"Пароль"} error={errors.password} value={form.password} type="password" onChange={e => setForm(state => ({ ...state, password: e.target.value}))}/>
        <Button disabled={loading} onClick={onSubmit}>Войти</Button>
    </Box>
}

const loginSchema = object({
    email: string().required().email(),
    password: string().required(),
});