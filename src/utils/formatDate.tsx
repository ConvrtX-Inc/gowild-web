const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
  });
  return formattedDate;
};

export default formatDate;
