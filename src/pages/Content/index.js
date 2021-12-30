import React from 'react';
import { render } from 'react-dom';
import { printLine } from './modules/print';
import { ContentScript } from './modules/ContentScript';

let body = document.querySelector('body');
let app = document.createElement('div');
body.prepend(app);
window.onload = (event) => {
  render(<ContentScript />, app);
};

if (module.hot) module.hot.accept();

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");

// /*
//   https://mint.intuit.com/pfm/v1/user - User info

//   Get transactions:
//   [{"args":{"startIndex":0,"filterType":"cash"},"service":"MintTransactionService","task":"getMerchantUiDetails","id":"882588"},{"args":{"propertyName":"hide_duplicates"},"service":"MintUserService","task":"getUserProperty","id":"398141"},{"args":{"startIndex":0,"filterType":"cash"},"service":"MintTransactionService","task":"getMerchantUiDetails","id":"810475"}]
// */

// https://www.reactjstutorials.com/react-context/6/react-use-context
// https://reactjs.org/docs/portals.html

// https://www.digitalocean.com/community/tutorials/react-using-new-portal-feature-in-react
// function Example(props) {
//         return ReactDOM.createPortal(
//           // Any valid React child type
//           [
//             'A string',
//             <p>Some JSX</p>,
//             'etc'
//           ],
//           props.someDomNode
//         );
//       }

// import React, { useState, createContext } from "react";

// // Create Context Object
// export const TokenContext = createContext();

// // Create a provider for components to consume and subscribe to changes
// export const TokenContextProvider = props => {
//   const [token, setToken] = useState(0);

//   return (
// 	<TokenContext.Provider value={[token, setToken]}>
//   	{props.children}
// 	</TokenContext.Provider>
//   );
// };
