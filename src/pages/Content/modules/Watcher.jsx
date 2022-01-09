import React, { useState, useEffect }from 'react';
import { AppContext } from './ContextProvider';

export function Watcher() {
  let [state, setState] = useState({
    URL: document.URL,
    popstates: 0,
    changehashes: 0,
  });

  useEffect(() => {
    const onPopstate = () => {
      console.log("MWE: onPopstate");
      setState({ ...state, popstates: state.popstates + 1, URL: document.URL });
    };
    window.addEventListener('popstate', onPopstate);
    return () => { window.removeEventListener('popstate', onPopstate) };
  }, [state]);

  useEffect(() => {
    const onChangehash = () => {
      console.log("MWE: onPopstate");
      setState({ ...state, changehashes: state.changehashes + 1, URL: document.URL });
    };
    window.addEventListener('changehash', onChangehash);
    return () => { window.removeEventListener('changehash', onChangehash) };
  }, [state]);

  return (
    <div style={{ border: "3px solid orange", margin: "16px", padding: "4px" }}>
      URL: {decodeURIComponent(state.URL)}
      <br></br>
      popstates: {state.popstates}
      <br></br>
      changehashes: {state.changehashes}
    </div>
  );
}
