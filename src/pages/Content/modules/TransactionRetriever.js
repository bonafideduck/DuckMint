import { useState, useEffect, useContext } from 'react';
import { AppContext } from './ContextProvider';

async function fetchTransactions(offset = 0) {
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
  let response = await fetch(url + offset);
  if (response.ok) {
    return await response.json();
  } else {
    return response;
  }
}

export function TransactionRetriever() {
  let [state, setState] = useState({
    status: 'idle',
    offset: -1,
    oldest: new Date(),
  });
  let [appContext, setAppContext] = useContext(AppContext);

  useEffect(() => {
    let { status, reqTransDate, offset, oldest } = state;
    if (status === 'retrieving') {
      return;
    }
    if (reqTransDate && reqTransDate > oldest) {
      return;
    }

    offset += 1;
    fetchTransactions(offset).then(
      (response) => {
        let transactions = [...appContext.transactions, ...response.json()];
        oldest = transactions.reduce((sum, transaction) =>
          Math.min(sum, transaction.date, oldest)
        );

        setAppContext({ ...appContext, transactions });
        setState({ status: 'idle', offset, oldest });
      },
      (a, b, c) => {
        // Just leave the state in retrieving.
        console.log('DuckMint: failed to retrieve transaction');
      }
    );
    setState({ status: 'retrieving', offset, oldest });
  }, [appContext, setAppContext, state]);

  return '';
}
