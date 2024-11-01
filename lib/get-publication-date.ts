import { daysOfWeek, monthNames } from "@/constants/dates";

export const getPublicationDate = (createdAt: Date) => {
  const date = new Date(createdAt);
  const dayOfWeek = daysOfWeek[date.getDay()];

  const dayOfMonth = date.getDate();

  const monthName = monthNames[date.getMonth()];

  const year = date.getFullYear();
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  const dateString = `${dayOfWeek}, ${dayOfMonth} ${monthName} ${year} р. в ${hours}:${minutes}:${seconds}`;
  return dateString;
};
