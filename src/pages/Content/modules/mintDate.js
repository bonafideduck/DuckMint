const monthNum = {
  "JAN": "01",
  "FEB": "02",
  "MAR": "03",
  "APR": "04",
  "MAY": "05",
  "JUN": "06",
  "JUL": "07",
  "AUG": "08",
  "SEP": "09",
  "OCT": "10",
  "NOV": "11",
  "DEC": "12",
};

export function mintDate(date) {
  if (typeof date != 'string') {
    return null;
  }
  if (date.match(/^\d\d\/\d\d\/\d\d$/)) {
    return date;
  }
  let match = date.match(/^([A-Za-z]{3}) (\d\d?)$/);

  if (match) {
    let month = monthNum[match[1].toUpperCase()];
    if (!month) {
      return null;
    }
    let day = match[2];
    day = day.length === 1 ? `0${day}` : day;
    let year = new Date().getYear() - 100;
    return `${month}/${day}/${year}`;
  }
}
