import "./App.scss";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, red } from "@mui/material/colors";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { MainPage } from "./MainPage";
import { LogPage } from "./LogPage";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: red,
  },
});

export type currentPageType = "start" | "urgent" | "all" | "add" | "add-info";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  ); // aktualnie wyswietlana strona
}

export default App;
