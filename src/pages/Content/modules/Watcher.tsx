import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './ContextProvider';

function locationChangeAppUpdates() {
  return {
    location: document.location,
    transactions: [],
    transRowWait: true,
  };
}

export function Watcher() {
  let [state, setState] = useState({
    popStates: 0,
    hashChanges: 0,
    onInterval: 0,
  });
  let { appContext, setAppContext } = useContext(AppContext);

  useEffect(() => {
    const onPopState = () => {
      console.log("MWE: onPopState");
      setState({ ...state, popStates: state.popStates + 1 });
      setAppContext({ ...appContext, ...locationChangeAppUpdates()});
    };
    window.addEventListener('popstate', onPopState);
    return () => { window.removeEventListener('popstate', onPopState) };
  }, [state, appContext, setAppContext]);

  useEffect(() => {
    const onHashChange = () => {
      console.log("MWE: onPopState");
      setState({ ...state, hashChanges: state.hashChanges + 1 });
      setAppContext({ ...appContext, ...locationChangeAppUpdates() });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => { window.removeEventListener('hashchange', onHashChange) };
  }, [state, appContext, setAppContext]);

  useEffect(() => {
    const onInterval = () => {
      if (document.location.href !== appContext.location.href) {
        console.log("MWE: onInterval");
        setState({ ...state, onInterval: state.onInterval + 1 });
        setAppContext({ ...appContext, ...locationChangeAppUpdates() });
      } else if (
        appContext.transRowWait &&
        appContext.transactions.length !== 0 &&
        document.location.pathname === '/transaction.event' &&
        appContext.transactions.length <= document.querySelectorAll("#transaction-list tbody tr").length
      ) {
        setTimeout(() => {
          setAppContext({ ...appContext, transRowWait: false });
        }, 1000);
      }
    };
    let interval = setInterval(onInterval, 250);
    return () => { clearInterval(interval) }
  }, [state, appContext, setAppContext]);

  if (!appContext.debug) {
    return <></>;
  }

  return (
    <div style={{ border: "3px solid orange", margin: "16px", padding: "4px" }}>
      URL: {decodeURIComponent(appContext.location.href)}
      <br></br>
      popStates: {state.popStates}
      <br></br>
      hashChanges: {state.hashChanges}
      <br></br>
      onInterval: {state.onInterval}
    </div>
  );
}
