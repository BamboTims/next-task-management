const convertDate = (dateString) => {
  console.log(dateString);
  if (dateString === null || dateString === undefined) return null;

  const parts = dateString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const jsDateObject = new Date(year, month, day);
  return jsDateObject;
};

export { convertDate };
