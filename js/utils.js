export function filterTransactions(transactions, { type, category }) {
  return transactions
    .filter((t) => type === "all" || t.type === type)
    .filter((t) => category === "all" || t.category === category);
}

export function sortTransactions(transactions, sortOption) {
  return transactions.sort((a, b) => {
    if (sortOption === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortOption === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortOption === "amount-desc") return b.amount - a.amount;
    if (sortOption === "amount-asc") return a.amount - b.amount;
  });
}
