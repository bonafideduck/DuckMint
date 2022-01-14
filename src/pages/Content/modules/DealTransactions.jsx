import React, { useContext } from 'react';
import { AppContext } from './ContextProvider';
import { mineTransRow } from './mineTransRow';
import { RowPortal } from './RowPortal';

function getOrCreateContainer(row) {
  let container = row.querySelector('td.container');
  console.log("MWE: getOrCreateContainer");
  if (!container) {
    let peer = row.querySelector('td.date');
    container = document.createElement('td');
    container.className = 'container';
    container.innerText = "XYZ";
    peer.before(container);
  }
  return container;
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

  for (let [key, row] of rows.entries()) {
    let child = mineTransRow(row);
    let index = trans.findIndex((t) =>
      (t.date === child.date) &&
      (t.merchant === child.description) &&
      (t.category === child.category) &&
      (t.isDebit ? "-" : "" + t.amount === child.amount)
    );
    if (index >= 0) {
      child.key = trans[index].id;
      child.note = trans[index].note;
      trans.splice(index, 1);
    } else {
      child.key = key;
      child.note = "";
    }
    child.pending = child.pending ? 1 : 0;
    children.push(
      <RowPortal
        key={child.key}
        container={getOrCreateContainer(row)}
        {...child}
      />
    );
  }
  document.mwechilren = children;
  console.log("MWE: DealTransactions Return Children");
  return <>{children}</>
}
