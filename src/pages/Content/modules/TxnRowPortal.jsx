import React from 'react';
import ReactDOM from 'react-dom';

export function RowPortal(props) {
  const filterProps = { ...props };
  delete filterProps.container;

  return ReactDOM.createPortal(
    <div style={{ display: "inline-block", fontSize: "1.4em", borderBottom: "1px solid darkred", marginRight: 4}}>🦆</div>,
    props.container);
}
