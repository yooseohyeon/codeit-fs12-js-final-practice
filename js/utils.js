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

export function searchTransactions(transactions, keyword) {
  return transactions.filter((t) => t.description.includes(keyword));
}

export function debounce(func, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
