import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { InfoDBType, InfoFormType, OrderDBType, OrderFormated } from "./types";


export const getAllOrders = async () => {
  const ordersRef = collection(db, "Orders");
  const querySnapshot = await getDocs(ordersRef);

  const orders = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as OrderDBType)
  );
  const ordersFormated = orders.map((order) => ({
    ...order,
    startDate: order.startDate.toDate(),
    endDate: order.endDate.toDate(),
  }));

  return ordersFormated;
};

export const getAllInfo = async () => {
  const infoRef = collection(db, "Information");
  const querySnapshot = await getDocs(infoRef);

  const infoList = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as InfoDBType)
  );
  const infoFormated = infoList.map((info) => ({
    ...info,
    created: info.created.toDate(),
  }));

  infoFormated.sort((a, b) => {
    return a.created < b.created ? 1 : -1;
  });

  return infoFormated;
};

export const addInfo = (info: InfoFormType) => {
    const infoRef = collection(db, "Information");
    addDoc(infoRef, info);    
}

export const addOrder = (order: OrderFormated) => {
    const ordersRef = collection(db, "Orders");
    addDoc(ordersRef, order);
}