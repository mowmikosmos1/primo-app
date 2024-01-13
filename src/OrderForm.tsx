import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

// metry > 0
// numer zlecenia: przynajmniej 1-6 znaków
// nazwa klienta: -----
// data: wydanie zlecenia > przyjęcie zlecenia
// wydanie zlecenia, przyjecie + 4 tygodnie

type NewOrderType = {
  clientName: string;
  orderNumber: number | null;
  startDate: Date | null;
  endDate: Date | null;
  size: number | null;
};

const defaultOrder = {
  clientName: "",
  orderNumber: null,
  startDate: null,
  endDate: null,
  size: null,
};

export const OrderForm = () => {
  const [order, setOrder] = useState<NewOrderType>(defaultOrder);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Box>
      <Typography>Nowe zlecenie</Typography>
      <p>Klient: {order.clientName}</p>
      <p>Numer: {order.orderNumber}</p>
      <p>Size: {order.size}</p>
      <p>Start: {order.startDate?.toString()}</p>
      <p>End: {order.endDate?.toString()}</p>
      <TextField
        onChange={handleChange}
        id="number"
        label="Numer Zlecenia"
        variant="outlined"
        name="orderNumber"
      />
      <TextField
        id="client"
        label="Nazwa klienta"
        variant="outlined"
        name="clientName"
        onChange={handleChange}
      />
      <TextField
        id="size"
        label="Metry2"
        variant="outlined"
        name="size"
        onChange={handleChange}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Przyjęcie zlecenia"
            onChange={handleStartDateChange}
          />
          <DatePicker label="Wydanie zlecenia" onChange={handleEndDateChange} />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};
