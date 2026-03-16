export function renderTransactions(transactions) {
  const list = document.getElementById("transaction-list");

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
  const formSelect = document.getElementById("category-input");
  const filterSelect = document.getElementById("category-filter");

  const options = categories
    .map((c) => `<option value="${c.name}">${c.name}</option>`)
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
