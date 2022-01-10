import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './ContextProvider';

export function Watcher() {
  let [state, setState] = useState({
    popStates: 0,
    hashChanges: 0,
    onInterval: 0,
  });
  let [appContext, setAppContext] = useContext(AppContext);

  useEffect(() => {
    const onPopState = () => {
      console.log("MWE: onPopState");
      setState({ ...state, popStates: state.popStates + 1 });
      setAppContext({ ...appContext, URL: document.URL });
    };
    window.addEventListener('popstate', onPopState);
    return () => { window.removeEventListener('popstate', onPopState) };
  }, [state, appContext, setAppContext]);

  useEffect(() => {
    const onHashChange = () => {
      console.log("MWE: onPopState");
      setState({ ...state, hashChanges: state.hashChanges + 1 });
      setAppContext({ ...appContext, URL: document.URL });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => { window.removeEventListener('hashchange', onHashChange) };
  }, [state, appContext, setAppContext]);

  useEffect(() => {
    const onInterval = () => {
      if (document.URL !== appContext.URL) {
        console.log("MWE: onInterval");
        setState({ ...state, onInterval: state.onInterval + 1 });
        setAppContext({ ...appContext, URL: document.URL });
      }
    };
    let interval = setInterval(onInterval, 250);
    return () => { clearInterval(interval) }
  }, [state, appContext, setAppContext]);

  if (!appContext.debug) {
    return "";
  }

  return (
    <div style={{ border: "3px solid orange", margin: "16px", padding: "4px" }}>
      URL: {decodeURIComponent(appContext.URL)}
      <br></br>
      popStates: {state.popStates}
      <br></br>
      hashChanges: {state.hashChanges}
      <br></br>
      onInterval: {state.onInterval}
    </div>
  );
}
