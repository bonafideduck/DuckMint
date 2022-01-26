export type txnIcon = '🦆' | '🌿' | '🍁' | '�';

export interface TxnRecord {
  pending: Boolean,
  date: string,
  description: string,
  category: string,
  amount: string, // "-$5.02"
  icon: txnIcon,
  index?: number,
  note?: string,
};