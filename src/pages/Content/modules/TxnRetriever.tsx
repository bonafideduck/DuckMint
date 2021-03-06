import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './ContextProvider';
import { mintDate } from './mintDate';


function later(delay: number) {
  return new Promise(function(resolve) {
      setTimeout(resolve, delay);
  });
}


async function fetchTransactions(location: Location) {
  let offset = 0;
  const url =
    'https://mint.intuit.com/app/getJsonData.xevent' +
    '?accountId=0' +
    '&filterType=cash' +
    '&queryNew=' +
    '&comparableType=8' +
    '&acctChanged=T' +
    '&task=transactions,txnfilters' +
    '&rnd=113' +
    '&offset=';
  await later(500);
  let response = await fetch(url + offset);
  if (response.ok) {
    return await response.json();
  } else {
    await later(1000);
    return response;
  }
}

export function TxnRetriever() {
  let [waiting, setWaiting] = useState(false);
  let { appContext, setAppContext } = useContext(AppContext);

  useEffect(() => {
    let { location, transactions } = appContext;

    if (
      waiting ||
      transactions.length !== 0 ||
      location.pathname !== '/transaction.event'
    ) {
      return;
    }
    setWaiting(true);

    fetchTransactions(location).then(
      (response) => {
        let transactions = response.set[0].data;
        transactions.forEach((t: any) => (t.date = mintDate(t.date)));
        setAppContext({ ...appContext, transactions });
        setWaiting(false);
      },
      () => {
        // Just leave the state in retrieving.
        console.log('DuckMint: failed to retrieve transaction');
        setWaiting(false);
      }
    );
  }, [appContext, setAppContext, waiting, setWaiting]);

  return <>''</>;
}
