const formatDate = (dateTime) => {
  if (!dateTime) {
    return null;
  }
  const formattedDate = new Intl.DateTimeFormat('en-US').format(
    new Date(dateTime)
  );
  return formattedDate;
};

module.exports = { formatDate };
