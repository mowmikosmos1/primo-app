import React, { useEffect, useState } from "react";
import "./App.scss";
import { OrdersList } from "./OrdersList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import logo from "./primologo1.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, red } from "@mui/material/colors";
import { Clock } from "./Clock";
import { OrderForm } from "./OrderForm";
import { Paper } from "@mui/material";
import { InfoForm } from "./InfoForm";
import { collection, doc, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { Navigation } from "./Navigation";
import { InfoBox } from "./InfoBox";
import { getAllInfo, getAllOrders } from "./api";
import { InfoType, OrderType } from "./types";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: red,
  },
});

export type currentPageType = "start" | "urgent" | "all" | "add" | "add-info";

function App() {
  // aktualnie wyswietlana strona
  const [currentPage, setCurrentPage] = useState<currentPageType>("start");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [information, setInformation] = useState<InfoType[]>([]);

  const today = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const urgentOrders = orders.filter(
    (order) => order.endDate <= sevenDaysFromNow || order.urgent
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getAllOrders();
        const infoData = await getAllInfo();
        setOrders(ordersData);
        setInformation(infoData);
      } catch {
        console.error("Blad pobierania danych");
      }
    };
    fetchData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>
          <div className="logo">
            <img src={logo} alt="logo1" />
          </div>

          <div className="UserPanel">
            <b>Zalogowano: admin</b>
          </div>
          <div className="LogOut">
            <Button variant="contained" color="primary">
              Wyloguj
            </Button>
          </div>
          <Clock />
        </header>
        <main className="container">
          <div className="buttons">
            <Stack spacing={2} direction="column">
              <Navigation setPage={setCurrentPage} />
              <InfoBox information={information} />
            </Stack>
          </div>
          <div className="tables">
            <Paper>
              <p>PILNE ZLECENIA / KRÓTKI CZAS DO WYDANIA</p>
            </Paper>
            <OrdersList orders={urgentOrders} urgent />
            {currentPage === "all" && <OrdersList orders={orders} />}
            {currentPage === "add" && (
              <Paper>
                <OrderForm />
              </Paper>
            )}
            {currentPage === "add-info" && (
              <Paper>
                <InfoForm getAllInfo={getAllInfo} />
              </Paper>
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
