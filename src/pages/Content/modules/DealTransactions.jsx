import React, { useState, useEffect, useContext, useRef } from 'react';
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
  let [appContext] = useContext(AppContext);

  if (appContext.location.pathname !== '/transaction.event') {
    return '';
  }

  let trans = [...appContext.transactions];
  let rows = document.querySelectorAll("#transaction-list tbody tr");
  let children = [];

  for (let row of rows) {
    const pending = row.classList.contains('pending');
    const date = mintDate(row.children[1].innerText);
    console.log(trans, children, pending, date);
  }
}
