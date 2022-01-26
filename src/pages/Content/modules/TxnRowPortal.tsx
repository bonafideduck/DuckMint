import React from 'react';
import ReactDOM from 'react-dom';
import { txnIcon } from './d';

interface RowPortalProps {
  container?: Element,
  icon: txnIcon,
};

export function RowPortal(props: RowPortalProps) {
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("RowPortal Clicked");
  }

  return ReactDOM.createPortal(
    <div onClick={onClick} style={{ display: "inline-block", fontSize: "1.4em", borderBottom: "1px solid darkred", marginRight: 4 }}>{props.icon}</div>,
    props.container!);
}
