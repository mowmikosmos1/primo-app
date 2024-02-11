import React, { useEffect, useState } from "react";
import "./App.scss";
import { OrdersList } from "./OrdersList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import logo from "./primologo1.png";
import { InboxList } from "./InboxList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, red } from "@mui/material/colors";
import { Clock } from "./Clock";
import { OrderForm } from "./OrderForm";
import { Paper } from "@mui/material";
import { InfoForm } from "./InfoForm";
import { inboxMailTitles, sampleOrders, urgentOrders } from "./data";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { Timestamp } from "firebase/firestore";

// odswiezanie po dodaniu info
// ekran po dodaniu danych
// anuluj
// wyswietlanie zlecen w poprawnyc htabelach
// login
// modal do wyswietlania informacji

export type OrderType = {
  id: string;
  clientName: string;
  orderNumber: number;
  startDate: Date;
  endDate: Date;
  isFinished: boolean;
  size: number;
};

type InfoType = {
  id: string;
  topic: string;
  text: string;
  created: Timestamp;
};

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: red,
  },
});

type currentPageType = "start" | "urgent" | "all" | "add" | "add-info";

function App() {
  // sample orders są przekazane jako default
  // moglibyśmy tez napisać [], jesli lista miałaby być pusta   useState<OrderType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>(sampleOrders);
  const [information, setInformation] = useState<InfoType[]>([]);
  const [currentPage, setCurrentPage] = useState<currentPageType>("start");

  const getAllOrders = async () => {
    const ordersRef = collection(db, "Orders");
    const querySnapshot = await getDocs(ordersRef);

    const orders = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as OrderType)
    );
    const ordersFormated = orders.map((order) => ({
      ...order,
      // @ts-ignore
      startDate: order.startDate.toDate(),
      // @ts-ignore
      endDate: order.endDate.toDate(),
    }));

    setOrders(ordersFormated);
    return ordersFormated;
  };

  const getAllInfo = async () => {
    const infoRef = collection(db, "Information");
    const querySnapshot = await getDocs(infoRef);

    const infoList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as InfoType)
    );
    console.log("TTTTTTT", infoList);
    const infoFormated = infoList.map((info) => ({
      ...info,
      // @ts-ignore
      created: info.created.toDate(),
    }));

    infoFormated.sort((a, b) => {
      return a.created < b.created ? 1 : -1;
    });

    // @ts-ignore
    setInformation(infoFormated);
    return infoFormated;
  };

  useEffect(() => {
    const ordersData = getAllOrders();
    getAllInfo();
  }, []);
  return (
    <div className="App">
      <header>
        <div className="logo">
          <img src={logo} alt="logo1" />
        </div>

        <div className="UserPanel">
          <b>Zalogowano: admin</b>
        </div>
        <div className="LogOut">
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary">
              Wyloguj
            </Button>
          </ThemeProvider>
        </div>

        <Clock />
      </header>
      <main className="container">
        <ThemeProvider theme={theme}>
          <div className="buttons">
            <Stack spacing={2} direction="column">
              <Button
                onClick={() => {
                  setCurrentPage("start");
                }}
                variant="contained"
                color="primary"
              >
                Strona Główna
              </Button>
              <Button
                onClick={() => {
                  setCurrentPage("add");
                }}
                variant="contained"
                color="primary"
              >
                Dodaj zlecenie
              </Button>
              <Button
                onClick={() => {
                  setCurrentPage("urgent");
                }}
                variant="contained"
                color="primary"
              >
                Pilne
              </Button>
              <Button
                onClick={() => {
                  setCurrentPage("all");
                }}
                variant="contained"
                color="primary"
              >
                Wszystkie zlecenia
              </Button>

              <Button
                onClick={() => {
                  setCurrentPage("add-info");
                }}
                variant="contained"
                color="primary"
              >
                Dodaj informacje
              </Button>

              <div className="importantInOrderTypefo">
                <b>I N F O R M A C J E</b>
                <div className="insideBox">
                  <InboxList
                    infoList={information.map((info) => info.topic)}
                  ></InboxList>
                </div>
              </div>
            </Stack>
          </div>
          <div className="tables">
            <Paper>
              <p>PILNE ZLECENIA / KRÓTKI CZAS DO WYDANIA</p>
            </Paper>

            <ThemeProvider theme={theme}>
              <OrdersList orders={urgentOrders} urgent />
            </ThemeProvider>
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
        </ThemeProvider>
      </main>
      {/* dodanie komponentu Orders list z parametrem orders */}
    </div>
  );
}

export default App;
