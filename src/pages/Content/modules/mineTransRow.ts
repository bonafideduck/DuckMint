import { mintDate } from './mintDate';
// @ts-ignore
export function mineTransRow(row) {
  let result = {};

  // @ts-ignore
  result.pending = row.classList.contains('pending');
  // @ts-ignore
  result.date = mintDate((row.querySelector('td.date') || {}).innerText);
  // @ts-ignore
  result.description = (row.querySelector('td.description') || {}).innerText;
  // @ts-ignore
  result.category = (row.querySelector('td.cat') || {}).innerText;
  // @ts-ignore
  result.amount = (row.querySelector('td.money') || {}).innerText;
  return result;
}
