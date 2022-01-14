import { mintDate } from './mintDate';
export function mineTransRow(row) {
  let result = {};

  result.pending = row.classList.contains('pending');
  result.date = mintDate((row.querySelector('td.date') || {}).innerText);
  result.description = (row.querySelector('td.description') || {}).innerText;
  result.category = (row.querySelector('td.cat') || {}).innerText;
  result.amount = (row.querySelector('td.money') || {}).innerText;
  return result;
}
