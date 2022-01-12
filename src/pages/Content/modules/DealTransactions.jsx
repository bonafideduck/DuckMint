import React, { useContext } from 'react';
import { AppContext } from './ContextProvider';

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


function mintDate(date) {
  if (typeof (date) != 'string') {
    return null;
  }
  if (date.match(/^\d\d\/\d\d\/\d\d$/)) {
    return date
  }
  let match = date.match(/^([A-Z]{3}) (\d\d?)$/);

  if (match) {
    let month = monthNum[match[1]];
    if (!month) {
      return null;
    }
    let day = match[2];
    day = day.length === 1 ? `0${day}` : day;
    let year = (new Date()).getYear() - 100;
    return `${month}/${day}/${year}`;
   }
}

export function DealTransactions() {
  console.log("MWE: DealTransactions Entered ");
  let [appContext] = useContext(AppContext);

  if (appContext.location.pathname !== '/transaction.event') {
    return '';
  }

  let trans = [...appContext.transactions];
  let rows = [...document.querySelectorAll("#transaction-list tbody tr")];
  let children = [];

  console.log("MWE: DealTransactions ForRows ");

  for (let row of rows) {
    const pending = row.classList.contains('pending');
    const date = mintDate(row.querySelector("td.date").innerText);
    let description = row.querySelector("td.description").innerText;
    let category = row.querySelector("td.cat").innerText;
    let amount = row.querySelector("td.money").innerText;
    let tran = trans.shift();

    console.log("DealTransactions");
    console.log("DealTransactions", pending, date, description, category, amount);
    console.log("DealTransactions", tran);
    children.push({transaction: tran, el: row, description, amount, pending, date})
  }
  document.mwechilren = children;
  console.log("MWE: DealTransactions Return Children");
  return <></>
}
