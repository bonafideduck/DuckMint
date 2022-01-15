import React from 'react';
import { render } from 'react-dom';
import { ContentScript } from './modules/ContentScript';

let body = document.querySelector('body');
let app = document.createElement('div');
body.prepend(app);
window.onload = (event) => {
  setTimeout(() => {
    console.log('MWE: Started');
    render(<ContentScript />, app);
    console.log('MWE: Finished');
  }, 0);
};

if (module.hot) module.hot.accept();

console.log('MWE: Content script works!');
console.log('MWE: Must reload extension for modifications to take effect.');
