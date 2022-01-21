import React from 'react';
import ReactDOM from 'react-dom';
import { TxnRetriever } from './TxnRetriever';
import { ContextProvider } from './ContextProvider';
import { Watcher } from './Watcher';
import { TxnDealer } from './TxnDealer';

// @ts-ignore
function Child({ el }) {
  return ReactDOM.createPortal(<h2>Portal Test</h2>, el);
}

export function ContentScript() {
  let el = document.getElementById('ius-account-chooser-option-avatar');
  console.log('el', el);
  return (
    <ContextProvider>
      {/* @ts-ignore */}
      <Watcher />
      {el && <Child el={el} />}
      {/* @ts-ignore */}
      <TxnRetriever />
      {/* @ts-ignore */}
      <TxnDealer />
    </ContextProvider>
  );
}
