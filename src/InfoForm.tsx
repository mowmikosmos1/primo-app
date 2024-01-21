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

type NewInfoType = {
  topic: string;
  text: string;
};

const defaultInfo = {
  topic: "",
  text: "",
};

export const InfoForm = () => {
  const [info, setInfo] = useState<NewInfoType>(defaultInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => {
      console.log(e.target);
      console.log(e.target.value);
      const updatedOrder = { ...prev, [e.target.name]: e.target.value };
      return updatedOrder;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Saving data in DB");
    console.log(info);
  };

  return (
    <Box>
      <Typography>
        <b>Dodaj informację</b>
      </Typography>
      <form onSubmit={handleSubmit}>
        <div id="inputsInfo">
          <TextField
            onChange={handleChange}
            id="topic"
            label="Dodaj temat informacji"
            variant="outlined"
            name="topic"
          />

          <TextField
            onChange={handleChange}
            id="text"
            label="Dodaj treść informacji"
            variant="outlined"
            name="text"
            multiline
          />
        </div>
        <div id="infoButtons">
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
