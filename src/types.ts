import { Timestamp } from "firebase/firestore";
import dayjs, { Dayjs } from "dayjs";

export type OrderBaseType = {
  clientName: string;
  orderNumber: string;
  startDate: Date;
  endDate: Date;
  isFinished: boolean;
  size: number;
  urgent: boolean;
};

export type OrderType = OrderBaseType & {
  id: string;
  startDate: Date;
  endDate: Date;
};

export type OrderDBType = OrderBaseType & {
  id: string;
  startDate: Timestamp;
  endDate: Timestamp;
};

export type OrderNew = Omit<OrderBaseType, 'urgent'> & {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

export type OrderFormated = OrderBaseType & {
  startDate: Timestamp;
  endDate: Timestamp;
};

export type InfoDBType = {
  id: string;
  topic: string;
  text: string;
  created: Timestamp;
};

export type InfoType = {
  id: string;
  topic: string;
  text: string;
  created: Date;
};

export type InfoFormType = {
  topic: string;
  text: string;
  created: Timestamp;
};

export type NewInfoType = {
  topic: string;
  text: string;
};

