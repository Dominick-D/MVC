// utils/format_date.js
const moment = require('moment');

const format_date = (date) => {
  return moment(date).format('MMMM Do YYYY, h:mm a');
};

module.exports = format_date;
