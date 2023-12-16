import { month_tr } from "./constans.js";

//bugünün tarihini gün ay ismi cinsinden geri döndürür
export const getDate = () => {
  const date = new Date();

  const day = date.getDate();

  const monthIndex = date.getMonth();

  return day + " " + month_tr[monthIndex];
};
