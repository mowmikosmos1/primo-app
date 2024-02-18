import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Timestamp } from "firebase/firestore";
import { addOrder } from "./api";
import { OrderBaseType, OrderFormated } from "./types";

const defaultOrder = {
  clientName: "",
  orderNumber: "",
  startDate: Date(),
  endDate: Date(),
  size: 0,
  isFinished: false,
} as unknown as OrderNew;

type OrderNew = Omit<OrderBaseType, "urgent"> & {
  startDate: Date;
  endDate: Date;
};

export const OrderForm = () => {
  const [order, setOrder] = useState<OrderNew>(defaultOrder);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [orderNumberError, setOrderNumberError] = useState<boolean>(false);
  const [startDateError, setStartDateError] = useState<boolean>(false);
  const [endDateError, setEndDateError] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (order.endDate !== null) {
      setEndDateError(false);
    }
  }, [order]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sprawdz czy ilość metrow jest > 0
    if (e.target.name === "size" && parseInt(e.target.value) <= 0) {
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
    } else if (e.target.name === "orderNumber") {
      setOrderNumberError(true);
    }

    setOrder((prev) => {
      const updatedOrder = { ...prev, [e.target.name]: e.target.value };
      return updatedOrder;
    });
  };

  const handleStartDateChange = (value: dayjs.Dayjs | null) => {
    if (value !== null) {
      setStartDateError(false);
    }

    if (order.endDate === null && value !== null) {
      // wydanie zlecenia, przyjecie + 4 tygodnie

      const end = value.add(1, "month");
      setOrder((prev) => ({
        ...prev,
        startDate: value.toDate(),
        endDate: end.toDate(),
      }));
    } else {
      setOrder((prev) => {
        const updatedOrder = {
          ...prev,
          startDate: value?.toDate() || new Date(),
        };
        return updatedOrder;
      });
    }
  };

  const handleEndDateChange = (value: dayjs.Dayjs | null) => {
    console.log(value);

    if (value !== null) {
      setEndDateError(false);
    }

    setOrder((prev) => {
      const updatedOrder = { ...prev, endDate: value?.toDate() || new Date() };
      return updatedOrder;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Saving data in DB");
    console.log(order);

    if (order.startDate === null) {
      setStartDateError(true);
    }
    if (order.endDate === null) {
      setEndDateError(true);
    }
    if (order.startDate === null || order.endDate === null) {
      return;
    }

    const orderFormated = {
      ...order,
      startDate: Timestamp.fromDate(order.startDate) as Timestamp,
      endDate: Timestamp.fromDate(order.endDate) as Timestamp,
      urgent: checked,
    };

    await addOrder(orderFormated as unknown as OrderFormated);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
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
              {startDateError && <Alert severity="error">Podaj datę</Alert>}
              <DatePicker
                label="Przyjęcie zlecenia"
                onChange={handleStartDateChange}
                name="startDate"
                maxDate={dayjs(order.endDate) ?? undefined}
                value={dayjs(order.startDate)}
              />
              <p>Wydać dnia: {order.endDate?.toString()}</p>
              {endDateError && <Alert severity="error">Podaj datę</Alert>}
              <DatePicker
                label="Wydanie zlecenia"
                onChange={handleEndDateChange}
                name="endDate"
                minDate={dayjs(order.startDate) ?? undefined}
                value={dayjs(order.endDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={handleCheckboxChange} />
          }
          label="Dodaj jako PILNE"
        />

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
