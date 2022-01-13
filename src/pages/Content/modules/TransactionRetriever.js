import { useState, useEffect, useContext } from 'react';
import { AppContext } from './ContextProvider';
import { mintDate } from './mintDate';

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
    status: 'init',
    offset: -1,
    oldest: new Date(),
  });
  let [appContext, setAppContext] = useContext(AppContext);

  useEffect(() => {
    let { status, offset, oldest } = state;
    let { reqTransDate } = appContext;

    switch (status) {
      case 'init':
        break;
      case 'idle':
        if (!reqTransDate || (reqTransDate > oldest)) {
          return;
        }
        return; //force 
        // break;
      case 'retrieving':
      default:
        return;
    }

    offset += 1;
    fetchTransactions(offset).then(
      (response) => {
        let transactions = appContext.transactions || [];
        let newTrans = response.set[0].data;
        newTrans.forEach(t => t.date = mintDate(t.date));
        transactions = [...transactions, ...newTrans];
        oldest = transactions.reduce(
          (sum, transaction) => Math.min(sum, new Date(transaction.date)),
          oldest
        );
        // Math.min converts this to an int.
        oldest = new Date(oldest);

        setAppContext({ ...appContext, transactions });
        setState({ status: 'idle', offset, oldest });
      },
      () => {
        // Just leave the state in retrieving.
        console.log('DuckMint: failed to retrieve transaction');
      }
    );
    setState({ status: 'retrieving', offset, oldest });
  }, [appContext, setAppContext, state, setState]);

  return '';
}
