import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { OrderType } from "./App";
import { green, teal, red } from "@mui/material/colors";

export type orderType = {
  id: string;
  clientName: string;
  orderNumber: number;
  startDate: Date;
  endDate: Date;
  isFinished: boolean;
  size: number;
};

// orders jest parametrem który przekazujemy do OrdersList np: <OrdersList orders={lista} />
export const OrdersList = ({
  orders,
  urgent,
}: {
  orders: OrderType[];
  urgent?: boolean; // parametr z ? to parametr opcjonalny, nie trzeba go podawać gdy używamy komponentu
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: urgent ? "red" : "white" }}>
            <TableCell>Nr. Zlecenia : </TableCell>
            <TableCell align="right">Nazwa klienta : </TableCell>
            <TableCell align="right">metry2</TableCell>
            <TableCell align="right">Przyjęte zlecenie: </TableCell>
            <TableCell align="right">Data wydania : </TableCell>
            <TableCell align="center">Czy wydane : </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: urgent ? "red" : "white",
              }}
            >
              <TableCell component="th" scope="row">
                {order.orderNumber}
              </TableCell>
              <TableCell align="right">{order.clientName}</TableCell>
              <TableCell align="right">{order.size}</TableCell>
              <TableCell align="right">
                {order.startDate.toDateString()}
              </TableCell>
              <TableCell align="right">
                {order.endDate.toDateString()}
              </TableCell>
              <TableCell align="center">
                {order.isFinished ? "tak" : "nie"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
function createTheme(arg0: {
  palette: {
    primary: {
      50: "#e0f2f1";
      100: "#b2dfdb";
      200: "#80cbc4";
      300: "#4db6ac";
      400: "#26a69a";
      500: "#009688";
      600: "#00897b";
      700: "#00796b";
      800: "#00695c";
      900: "#004d40";
      A100: "#a7ffeb";
      A200: "#64ffda";
      A400: "#1de9b6";
      A700: "#00bfa5";
    };
    secondary: {
      50: "#ffebee";
      100: "#ffcdd2";
      200: "#ef9a9a";
      300: "#e57373";
      400: "#ef5350";
      500: "#f44336";
      600: "#e53935";
      700: "#d32f2f";
      800: "#c62828";
      900: "#b71c1c";
      A100: "#ff8a80";
      A200: "#ff5252";
      A400: "#ff1744";
      A700: "#d50000";
    };
  };
}) {
  throw new Error("Function not implemented.");
}
