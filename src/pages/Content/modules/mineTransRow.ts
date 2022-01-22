import { mintDate } from './mintDate';
import { TxnRecord } from './d';

function querySelectorText(el: HTMLElement, selector: string, onFail: any) {
  return (el.querySelector(selector) as HTMLElement)?.innerText || onFail;
}

export function mineTransRow(row: HTMLElement): TxnRecord {

  return {
    pending: row.classList.contains('pending'),
    date: mintDate(querySelectorText(row, 'td.date', undefined)),
    description: querySelectorText(row, 'td.description', "unknown"),
    category: querySelectorText(row, 'td.cat', "unknown"),
    amount: querySelectorText(row, 'td.money', 0.0),
  }
}
