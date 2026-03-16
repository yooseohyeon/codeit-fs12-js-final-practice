export function sortTransactions(transactions, sortOption) {
  return [...transactions].sort((a, b) => {
    if (sortOption === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortOption === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortOption === "amount-desc") return b.amount - a.amount;
    if (sortOption === "amount-asc") return a.amount - b.amount;
  });
}
