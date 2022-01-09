import React from 'react';
import ReactDOM from 'react-dom';
import { TransactionRetriever } from './TransactionRetriever';
import { ContextProvider } from './ContextProvider';
import { Watcher } from './Watcher';

function Child({ el }) {
  return ReactDOM.createPortal(<h2>Portal Test</h2>, el);
}

export function ContentScript() {
  let el = document.getElementById('ius-account-chooser-option-avatar');
  console.log('el', el);
  return (
    <ContextProvider>
      <Watcher />
      {el && <Child el={el} />}
      <TransactionRetriever />
    </ContextProvider>
  );
}
