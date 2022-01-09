import React, { useState, useEffect }from 'react';
import { AppContext } from './ContextProvider';

export function Watcher() {
  let [state, setState] = useState({
    URL: document.URL,
    popStates: 0,
    hashChanges: 0,
    onInterval: 0,
  });

  useEffect(() => {
    const onPopState = () => {
      console.log("MWE: onPopState");
      setState({ ...state, popStates: state.popStates + 1, URL: document.URL });
    };
    window.addEventListener('popstate', onPopState);
    return () => { window.removeEventListener('popstate', onPopState) };
  }, [state]);

  useEffect(() => {
    const onHashChange = () => {
      console.log("MWE: onPopState");
      setState({ ...state, hashChanges: state.hashChanges + 1, URL: document.URL });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => { window.removeEventListener('hashchange', onHashChange) };
  }, [state]);

  useEffect(() => {
    const onInterval = () => {
      if (document.URL != state.URL) {
        console.log("MWE: onInterval");
        setState({ ...state, onInterval: state.onInterval + 1, URL: document.URL });
      }
    };
    let interval = setInterval(onInterval, 250);
    return () => { clearInterval(interval) }
  }, [state]);

  return (
    <div style={{ border: "3px solid orange", margin: "16px", padding: "4px" }}>
      URL: {decodeURIComponent(state.URL)}
      <br></br>
      popStates: {state.popStates}
      <br></br>
      hashChanges: {state.hashChanges}
      <br></br>
      onInterval: {state.onInterval}
    </div>
  );
}
