import React, { useContext } from 'react';
import { AppContext } from './ContextProvider';
import { mineTransRow } from './mineTransRow';
import { RowPortal } from './TxnRowPortal';
import { TxnEditPortal } from './TxnEditPortal';

function getOrCreateContainer(row: HTMLElement) {
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
  let { appContext } = useContext(AppContext);

  if (appContext.transRowWait) {
    console.log("MWE: DealTransactions transRowWait ");
    return <></>;
  }

  let trans = [...appContext.transactions];
  let rows = [...document.querySelectorAll("#transaction-list tbody tr")];
  let children = [];

  console.log("MWE: DealTransactions ForRows ");

  for (let [key, row] of rows.entries()) {
    let child = mineTransRow(row as HTMLElement);
    let index = trans.findIndex((t) =>
      (t.date === child.date) &&
      (t.merchant === child.description) &&
      (t.category === child.category) &&
      (Number(t.isDebit ? "-" : "" + t.amount) === child.amount)
    );
    if (index >= 0) {
      child.key = trans[index].id;
      child.note = trans[index].note;
      trans.splice(index, 1);
    } else {
      child.key = key;
      child.note = "";
    }
    child.pending = !!child.pending;
    children.push(
      <RowPortal
        key={child.key}
        container={getOrCreateContainer(row as HTMLElement)}
        {...child}
      />
    );
  }

  // @ts-ignore
  document.mwechildren = children;
  console.log("MWE: DealTransactions Return Children");
  return <>
    {children}
    <TxnEditPortal />
  </>;
}
