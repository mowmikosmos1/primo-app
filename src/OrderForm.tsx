import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import Button from "@mui/material/Button";
// metry > 0
// numer zlecenia: przynajmniej 1-6 znaków
// nazwa klienta: -----
// data: wydanie zlecenia > przyjęcie zlecenia
// wydanie zlecenia, przyjecie + 4 tygodnie

type NewOrderType = {
  clientName: string;
  orderNumber: string;
  startDate: Date | null;
  endDate: Date | null;
  size: number | null;
};

const defaultOrder = {
  clientName: "",
  orderNumber: "",
  startDate: null,
  endDate: null,
  size: null,
};

export const OrderForm = () => {
  const [order, setOrder] = useState<NewOrderType>(defaultOrder);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [orderNumberError, setOrderNumberError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sprawdz czy ilość metrow jest > 0
    if (e.target.name === "size" && (order.size === null || order.size <= 0)) {
      setSizeError(true);
    } else if (e.target.name === "size") {
      setSizeError(false);
    }

    // sprawdz czy numer klienta ma 1-6 znaków
    if (
      e.target.name === "orderNumber" &&
      order.orderNumber.length >= 1 &&
      order.orderNumber.length <= 6
    ) {
      setOrderNumberError(false);
    } else if (e.target.name === "ordeNumber") {
      setOrderNumberError(true);
    }

    setOrder((prev) => {
      console.log(e.target);
      console.log(e.target.value);
      const updatedOrder = { ...prev, [e.target.name]: e.target.value };
      return updatedOrder;
    });
  };

  const handleStartDateChange = (value: Date | null) => {
    console.log(value);

    setOrder((prev) => {
      const updatedOrder = { ...prev, startDate: value };
      return updatedOrder;
    });
  };

  const handleEndDateChange = (value: Date | null) => {
    console.log(value);

    setOrder((prev) => {
      const updatedOrder = { ...prev, endDate: value };
      return updatedOrder;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Saving data in DB");
    console.log(order);
  };

  return (
    <Box>
      <Typography>
        <b>Nowe zlecenie</b>
      </Typography>
      <div id="orderBox">
        <p>Numer zlecenia: {order.orderNumber}</p>
        <p>Nazwa klienta: {order.clientName}</p>
        <p>Metry/powierzchnia: {order.size}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div id="inputs">
          <TextField
            onChange={handleChange}
            id="number"
            label="Podaj numer zlecenia"
            variant="outlined"
            name="orderNumber"
          />
          <TextField
            id="client"
            label="Podaj nazwę klienta"
            variant="outlined"
            name="clientName"
            onChange={handleChange}
          />
          <TextField
            id="size"
            label="Podaj metry2"
            variant="outlined"
            name="size"
            onChange={handleChange}
            error={sizeError}
            type="number"
          />
        </div>

        <div id="inputs1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <p>Przyjęto: {order.startDate?.toString()}</p>
              <DatePicker
                label="Przyjęcie zlecenia"
                onChange={handleStartDateChange}
              />
              <p>Wydać dnia: {order.endDate?.toString()}</p>
              <DatePicker
                label="Wydanie zlecenia"
                onChange={handleEndDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div id="buttonsForm">
          <Button type="button" id="cancel" variant="contained" color="primary">
            Anuluj
          </Button>
          <Button type="submit" id="add" variant="contained" color="primary">
            Dodaj
          </Button>
        </div>
      </form>
    </Box>
  );
};
