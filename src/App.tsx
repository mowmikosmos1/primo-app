import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { OrdersList } from "./OrdersList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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

type currentPageType = "start" | "urgent" | "all" | "add";

function App() {
  // sample orders są przekazane jako default
  // moglibyśmy tez napisać [], jesli lista miałaby być pusta   useState<OrderType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>(sampleOrders);
  const [currentPage, setCurrentPage] = useState<currentPageType>("start");
  return (
    <div className="App">
      <header>
        <div className="logo">
          <img src="./primo-logo1.jpg" alt="logo"></img>
        </div>

        <div className="UserPanel">Zalogowano : admin</div>
        <div className="LogOut">
          <Button variant="contained">Wyloguj</Button>
        </div>
        <div id="dateDisplay">Data : </div>
        <div id="timeDisplay">Czas : </div>
      </header>

      <main className="container">
        <div className="buttons">
          <Stack spacing={2} direction="column">
            <Button
              onClick={() => {
                setCurrentPage("add");
              }}
              variant="contained"
            >
              Dodaj zlecenie
            </Button>
            <Button variant="contained">Pilne</Button>
            <Button
              onClick={() => {
                setCurrentPage("all");
              }}
              variant="contained"
            >
              Wszystkie zlecenia
            </Button>
            <Button variant="contained">Historia</Button>
          </Stack>
        </div>

        <div className="tables">
          {currentPage}
          <OrdersList orders={urgentOrders}></OrdersList>
          {currentPage === "all" && <OrdersList orders={orders}></OrdersList>}
          {currentPage === "add" && <div>Dodaj nowe zlecenie</div>}
        </div>
      </main>
      {/* dodanie komponentu Orders list z parametrem orders */}
    </div>
  );
}

export default App;
