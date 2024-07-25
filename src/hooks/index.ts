import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../api";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context";

export const usePrivate = () => {
    const { loading, data } = useQuery(ME_QUERY)

    const { logout, changeAuth } = useAuthContext()

    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        const id = data?.me?.id;

        if (loading) {
            setLocalLoading(loading);
            return;
        }

        if (id) {
            changeAuth(true);
        } else {
            logout();
        }

        setLocalLoading(false);
    }, [loading, data])

    return {
        loading: loading || localLoading
    }
}