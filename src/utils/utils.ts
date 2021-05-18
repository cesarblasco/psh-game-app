export const getFormattedDate = (unformattedDate: string) => {
  const formattedDate = new Date(unformattedDate).toLocaleDateString();
  const formattedDateTime = new Date(unformattedDate).toLocaleTimeString();

  return `${formattedDate} (${formattedDateTime})`;
};
