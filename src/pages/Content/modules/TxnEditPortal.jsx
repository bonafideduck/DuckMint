import React from 'react';
import ReactDOM from 'react-dom';

function getOrCreateTxnContainer() {
  let container = document.querySelector('#txnEdit-checkbox + span.duck-container');
  console.log("MWE: getOrCreateTxnContainer");

  if (!container) {
    let peer = document.querySelector('#txnEdit-checkbox');
    container = document.createElement('span');
    container.className = 'duck-container';
    if (peer) {
      peer.after(container);
    }
  }
  return container;
}

export function TxnEditPortal() {
  return ReactDOM.createPortal(
    <div style={{ display: "inline-block", fontSize: "1.4em", borderBottom: "1px solid darkred" }}>🦆</div>,
    getOrCreateTxnContainer());
}
