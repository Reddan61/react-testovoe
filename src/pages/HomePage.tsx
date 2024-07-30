import { Box, Button, CircularProgress } from "@mui/material";
import { useAuthContext } from "../context";
import { Navigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "../api";
import { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
interface Product {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
  };
}

export const HomePage = () => {
  const { isAuth, logout } = useAuthContext();
  const [getProducts, { loading, data, called }] = useLazyQuery(PRODUCTS_QUERY);

  useEffect(() => {
    if (isAuth) {
      getProducts();
    }
  }, [isAuth]);

  if (!isAuth) {
    return <Navigate to={"/auth"} />;
  }

  if (loading || !called) {
    return <CircularProgress />;
  }

  const products: Product[] = data?.products ?? [];

  return (
    <Box className="ag-theme-quartz">
      <Button onClick={logout}>Выйти</Button>
      <AgGridReact
        domLayout="autoHeight"
        columnDefs={[
          { field: "id" },
          { field: "name", headerName: "Название" },
          { field: "company.id", headerName: "ID компании" },
          {
            field: "company.name",
            headerName: "Название компании",
          },
        ]}
        rowData={products}
      />
    </Box>
  );
};
