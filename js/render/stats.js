export function renderStats(income, expense, balance) {
  const totalIncome = document.querySelector("#total-income");
  const totalExpense = document.querySelector("#total-expense");
  const balanceElement = document.querySelector("#balance");

  totalIncome.textContent = `${income.toLocaleString()}원`;
  totalExpense.textContent = `${expense.toLocaleString()}원`;
  balanceElement.textContent = `${balance.toLocaleString()}원`;
}
