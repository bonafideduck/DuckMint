import React from 'react';
import ReactDOM from 'react-dom';

interface RowPortalProps {
  container?: Element,
};

export function RowPortal(props: RowPortalProps) {
  const filterProps = { ...props };
  delete filterProps.container;

  return ReactDOM.createPortal(
    <div style={{ display: "inline-block", fontSize: "1.4em", borderBottom: "1px solid darkred", marginRight: 4}}>🦆</div>,
    props.container!);
}
