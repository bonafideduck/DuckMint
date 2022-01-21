import React from 'react';
import ReactDOM from 'react-dom';

// @ts-ignore
export function RowPortal(props) {
  // @ts-ignore
  const filterProps = { ...props };
  delete filterProps.container;

  return ReactDOM.createPortal(
    <div style={{ display: "inline-block", fontSize: "1.4em", borderBottom: "1px solid darkred", marginRight: 4}}>🦆</div>,
    props.container);
}
