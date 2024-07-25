import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useAuthContext } from "../context"
import { Navigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "../api";
import { useEffect } from "react";

interface Product {
    id: number,
    name: string
}

export const HomePage = () => {
    const { isAuth, logout } = useAuthContext();
    const [ getProducts, { loading, data, called }] = useLazyQuery(PRODUCTS_QUERY);

    useEffect(() => {
        if (isAuth) {
            getProducts();
        }
    }, [isAuth])

    if (!isAuth) {
        return <Navigate to={"/auth"} />
    }

    if (loading || !called) {
        return <CircularProgress />
    }
    
    const products: Product[] = data?.products ?? [];
    
    return <Box>
        <Button onClick={logout}>
            Выйти
        </Button>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Название</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    products.map(product => {
                        return <TableRow key={product.id}>
                            <TableCell component="th" scope="row">
                                {product.id}
                            </TableCell>
                            <TableCell>
                                {product.name}
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    </Box>
}