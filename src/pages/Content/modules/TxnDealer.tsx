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

  const trans = appContext.transactions;
  let rows = [...document.querySelectorAll("#transaction-list tbody tr")];
  let children = [];

  console.log("MWE: DealTransactions ForRows ");

  for (let [index, row] of rows.entries()) {
    let child = mineTransRow(row as HTMLElement);
    let trans = appContext.transactions[index];
    if ((trans.date === child.date) &&
      (trans.merchant === child.description) &&
      (trans.category === child.category) &&
      (trans.isDebit ? "-" : "" + trans.amount === child.amount)
    ) {
      child.note = trans.note;
      const tag = /\n?🦆([^🌱]+)🌱([\d-.]+)🌿/;
      let match = child.note.match(tag);
      if (match) {
        if (child.category == match[1] && child.amount == match[2]) {
          child.icon = '🌿';
        } else {
          child.icon = '🍁';
        }
      } else {
        child.icon = '🦆';
        if (child.category == 'aa Expenses') {
          console.log('MWE: deleteme');
          child.icon = '🌿';
        }
      }
    } else {
      child.note = "";
      child.icon = '�';
    }
    child.index = index;
    child.pending = !!child.pending;
    children.push(
      <RowPortal
        key={child.index}
        container={getOrCreateContainer(row as HTMLElement)}
        {...child}
      />
    );
  }

  (document as any).mwechildren = children;
  console.log("MWE: DealTransactions Return Children");
  return <>
    {children}
    <TxnEditPortal />
  </>;
}
