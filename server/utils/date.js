const formatDate = (datetime) => {
  if (!datetime) {
    return null;
  }
  const formattedDate = new Intl.DateTimeFormat('en-US').format(
    new Date(dateTime)
  );
  return formattedDate;
};

module.exports = { formatDate };
