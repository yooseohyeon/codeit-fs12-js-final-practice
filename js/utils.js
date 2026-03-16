export function filterTransactions(transactions, { type, category }) {
  return transactions
    .filter((t) => type === "all" || t.type === type)
    .filter((t) => category === "all" || t.category === category);
}
