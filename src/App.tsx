import React, { useState } from "react";
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

export type OrderType = {
  id: string;
  clientName: string;
  orderNumber: number;
  startDate: Date;
  endDate: Date;
  isFinished: boolean;
  size: number;
};

const urgentOrders: OrderType[] = [
  {
    id: "1",
    clientName: "Alice",
    orderNumber: 101,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-01-10"),
    isFinished: false,
    size: 5,
  },
  {
    id: "2",
    clientName: "Bob",
    orderNumber: 102,
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-02-10"),
    isFinished: true,
    size: 3,
  },
  {
    id: "3",
    clientName: "Charlie",
    orderNumber: 103,
    startDate: new Date("2023-03-01"),
    endDate: new Date("2023-03-10"),
    isFinished: false,
    size: 4,
  },
];

const sampleOrders: OrderType[] = [
  {
    id: "1",
    clientName: "Alice",
    orderNumber: 101,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-01-10"),
    isFinished: false,
    size: 5,
  },
  {
    id: "2",
    clientName: "Bob",
    orderNumber: 102,
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-02-10"),
    isFinished: true,
    size: 3,
  },
  {
    id: "3",
    clientName: "Charlie",
    orderNumber: 103,
    startDate: new Date("2023-03-01"),
    endDate: new Date("2023-03-10"),
    isFinished: false,
    size: 4,
  },
  {
    id: "4",
    clientName: "David",
    orderNumber: 104,
    startDate: new Date("2023-04-01"),
    endDate: new Date("2023-04-10"),
    isFinished: true,
    size: 2,
  },
  {
    id: "5",
    clientName: "Eva",
    orderNumber: 105,
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-05-10"),
    isFinished: false,
    size: 6,
  },
  {
    id: "6",
    clientName: "Frank",
    orderNumber: 106,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-06-10"),
    isFinished: true,
    size: 3,
  },
  {
    id: "7",
    clientName: "Grace",
    orderNumber: 107,
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-07-10"),
    isFinished: false,
    size: 5,
  },
  {
    id: "8",
    clientName: "Henry",
    orderNumber: 108,
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-08-10"),
    isFinished: true,
    size: 4,
  },
  {
    id: "9",
    clientName: "Ivy",
    orderNumber: 109,
    startDate: new Date("2023-09-01"),
    endDate: new Date("2023-09-10"),
    isFinished: false,
    size: 7,
  },
  {
    id: "10",
    clientName: "Jack",
    orderNumber: 110,
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-10-10"),
    isFinished: true,
    size: 2,
  },
];

const inboxMailTitles: string[] = [
  "Welcome to Our Team!",
  "Monthly Company Performance Report",
  "Invitation: Annual General Meeting",
  "Reminder: Upcoming Team Building Event",
  "New Policy Implementation Notice",
  "Weekly Team Progress Update",
  "Staff Satisfaction Survey",
  "Urgent: IT System Maintenance Notification",
  "Quarterly Financial Summary",
  "Holiday Schedule and Office Hours",
  "Project XYZ: Milestone Achievements",
];

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
  const [currentPage, setCurrentPage] = useState<currentPageType>("start");
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

              <div className="importantInfo">
                <b>I N F O R M A C J E</b>
                <div className="insideBox">
                  <InboxList infoList={inboxMailTitles}></InboxList>
                </div>
              </div>
            </Stack>
          </div>

          <div className="tables">
            <Paper>
              <p>PILNE ZLECENIA / KRÓTKI CZAS DO WYDANIA</p>
            </Paper>
            <ThemeProvider theme={theme}>
              {currentPage}
              <OrdersList orders={urgentOrders} urgent />
            </ThemeProvider>
            {currentPage === "all" && <OrdersList orders={orders} />}
            {currentPage === "add" && (
              <Paper>
                <OrderForm></OrderForm>
              </Paper>
            )}
            {currentPage === "add-info" && <div>Dodaj nowa informacje</div>}
          </div>
        </ThemeProvider>
      </main>

      {/* dodanie komponentu Orders list z parametrem orders */}
    </div>
  );
}

export default App;
