export const formatDate = (inputDate: number): string => {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[month]}, ${year}`;
};
