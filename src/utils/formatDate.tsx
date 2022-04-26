const formatDate = (date: string) => {
  const formattedDate = new Date(date)
    .toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    })
    .replaceAll("/", ".");
  return formattedDate;
};

export default formatDate;
