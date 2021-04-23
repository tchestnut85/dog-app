const formatDate = (createdAtValue) => {
  const date = new Date(createdAtValue);

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `
  ${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}
  `;

  return formattedDate;
};

module.exports = { formatDate };
