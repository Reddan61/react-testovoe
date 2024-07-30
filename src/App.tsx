import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { CircularProgress, CssBaseline } from "@mui/material";
import { usePrivate } from "./hooks";

export const App = () => {
  const { loading } = usePrivate();

  if (loading) return <CircularProgress />;

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};
