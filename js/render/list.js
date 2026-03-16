export function renderTransactions(transactions) {
  const list = document.querySelector("#transaction-list");

  if (transactions.length === 0) {
    list.innerHTML = `
      <tr>
        <td colspan="6" class="empty-message">거래 내역이 없습니다.</td>
      </tr>
    `;
    return;
  }

  list.innerHTML = transactions
    .map((t) => {
      const amountValue = Number(t.amount).toLocaleString();
      const amount =
        t.type === "income" ? `+${amountValue}` : `-${amountValue}`;

      return `
        <tr class="${t.type}" data-id="${t.id}">
          <td><input type="checkbox"></td>
          <td>${t.date}</td>
          <td>${t.category}</td>
          <td>${t.description}</td>
          <td class="amount">${amount}</td>
          <td>
            <button class="edit-btn">수정</button>
            <button class="delete-btn">삭제</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

export function renderCategoryOptions(categories) {
  const formSelect = document.querySelector("#category-input");
  const filterSelect = document.querySelector("#category-filter");

  const uniqueNames = new Set(categories.map((c) => c.name));

  const options = [...uniqueNames]
    .map((name) => `<option value="${name}">${name}</option>`)
    .join("");

  formSelect.innerHTML = `
    <option value="">선택</option>
    ${options}
  `;

  filterSelect.innerHTML = `
    <option value="all">전체</option>
    ${options}
  `;
}
