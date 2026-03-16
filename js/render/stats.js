// 월별 통계 렌더링 (총 수입, 총 지출, 잔액)
export function renderStats(income, expense, balance) {
  const totalIncome = document.querySelector("#total-income");
  const totalExpense = document.querySelector("#total-expense");
  const balanceElement = document.querySelector("#balance");

  totalIncome.textContent = `${income.toLocaleString()}원`;
  totalExpense.textContent = `${expense.toLocaleString()}원`;
  balanceElement.textContent = `${balance.toLocaleString()}원`;
}

// 카테고리별 거래 건수 렌더링
export function renderCategoryStats(countByCategory) {
  const el = document.querySelector("#category-stats");

  el.innerHTML = Object.entries(countByCategory)
    .map(
      ([category, { count, type }]) => `
      <li class="category-badge ${type}">
        <span class="category-name">${category}</span>
        <span class="category-count">${count}건</span>
      </li>
    `,
    )
    .join("");
}
