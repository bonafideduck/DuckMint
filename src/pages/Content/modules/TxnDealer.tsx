import React, { useContext } from 'react';
import { AppContext } from './ContextProvider';
import { mineTransRow } from './mineTransRow';
import { RowPortal } from './TxnRowPortal';
import { TxnEditPortal } from './TxnEditPortal';

// @ts-ignore
function getOrCreateContainer(row) {
  let container = row.querySelector('td span.duck-container');
  console.log("MWE: getOrCreateContainer");
  if (!container) {
    let parent = row.querySelector('td.checkboxes');
    container = document.createElement('span');
    container.className = 'duck-container';
    if (parent) {
      parent.prepend(container);
    }
  }
  return container;
}


export function TxnDealer() {
  console.log("MWE: DealTransactions Entered ");
  // @ts-ignore
  let { appContext } = useContext(AppContext);

  if (appContext.transRowWait) {
    console.log("MWE: DealTransactions transRowWait ");
    return <></>;
  }

  let trans = [...appContext.transactions];
  // @ts-ignore
  let rows = [...document.querySelectorAll("#transaction-list tbody tr")];
  let children = [];

  console.log("MWE: DealTransactions ForRows ");

  for (let [key, row] of rows.entries()) {
    let child = mineTransRow(row);
    let index = trans.findIndex((t) =>
      // @ts-ignore
      (t.date === child.date) &&
      // @ts-ignore
      (t.merchant === child.description) &&
      // @ts-ignore
      (t.category === child.category) &&
      // @ts-ignore
      (t.isDebit ? "-" : "" + t.amount === child.amount)
    );
    if (index >= 0) {
      // @ts-ignore
      child.key = trans[index].id;
      // @ts-ignore
      child.note = trans[index].note;
      trans.splice(index, 1);
    } else {
      // @ts-ignore
      child.key = key;
      // @ts-ignore
      child.note = "";
    }
    // @ts-ignore
    child.pending = child.pending ? 1 : 0;
    children.push(
      <RowPortal
        // @ts-ignore
        key={child.key}
        container={getOrCreateContainer(row)}
        {...child}
      />
    );
  }
  // @ts-ignore
  document.mwechidlren = children;
  console.log("MWE: DealTransactions Return Children");
  return <>
    {children}
    <TxnEditPortal />
  </>;
}
