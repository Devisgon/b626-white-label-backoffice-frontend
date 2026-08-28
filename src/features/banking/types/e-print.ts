export interface EligibleCheck {
  id: string;
  payee: string;
  amount: number;
  transactionDate: string;
  type: string;
}
export interface PrintChecksPayload {
  transactionIds: string[];
  startingCheckNumber: string;
}
export interface PrintBatch {
  id: string;
  startingCheckNumber: string;
  checkCount: number;
  printedAt: string;
}
