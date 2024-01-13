import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/lab";

// metry > 0
// numer zlecenia: przynajmniej 1-6 znaków
// nazwa klienta: -----
// data: wydanie zlecenia > przyjęcie zlecenia
// wydanie zlecenia, przyjecie + 4 tygodnie

export const OrderForm = () => {
  return (
    <Box>
      <Typography>Nowe zlecenie</Typography>
      <TextField id="number" label="Numer Zlecenia" variant="outlined" />
      <TextField id="client" label="Nazwa klienta" variant="outlined" />
      <TextField id="size" label="Metry2" variant="outlined" />
      <DatePicker label="Przyjęcie zlecenia" />
      <DatePicker label="Wydanie zlecenia" />
    </Box>
  );
};
