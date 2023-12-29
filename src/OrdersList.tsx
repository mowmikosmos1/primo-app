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
export const OrdersList = ({ orders }: { orders: OrderType[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
