const formatTime = (date: string): string => {
  const formattedTime = new Date(date).toLocaleString('en-US', {
    // timeStyle: "medium",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return formattedTime;
};

export default formatTime;
