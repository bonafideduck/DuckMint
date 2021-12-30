import React from 'react';
import ReactDOM from 'react-dom';

function Child({ el }) {
  return ReactDOM.createPortal(<h2>Portal Test</h2>, el);
}

export function ContentScript() {
  let el = document.getElementById('ius-account-chooser-option-avatar');
  console.log('el', el);
  return (
    <div>
      <h1>Hello World</h1>
      <Child el={el} />
    </div>
  );
}
