import { getInitialData, createTransaction, deleteTransaction } from "./api.js";
import { renderTransactions, renderCategoryOptions } from "./render/list.js";
import { showLoading, hideLoading, showToast } from "./render/ui.js";
import { validateTransaction } from "./validation.js";

const form = document.querySelector("#transaction-form");
const list = document.querySelector("#transaction-list");
const deleteSelectedBtn = document.getElementById("delete-selected");

async function init() {
  try {
    showLoading();

    const { transactions, categories } = await getInitialData();

    renderTransactions(transactions);
    renderCategoryOptions(categories);
  } catch (e) {
    showToast(e.message);
  } finally {
    hideLoading();
  }
}

function getFormData() {
  const formData = new FormData(form);

  return {
    type: formData.get("type"),
    date: formData.get("date"),
    category: formData.get("category"),
    description: formData.get("description"),
    amount: Number(formData.get("amount")),
  };
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const data = getFormData();

    validateTransaction(data);

    await createTransaction(data);

    showToast("수입/지출 내역이 추가되었습니다.", "success");
  } catch (e) {
    showToast(e.message);
  }
});

list.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  try {
    const tr = e.target.closest("tr");
    const id = tr.dataset.id;

    await deleteTransaction(id);

    showToast("수입/지출 내역이 삭제되었습니다.", "success");
  } catch (e) {
    showToast(e.message);
  }
});

deleteSelectedBtn.addEventListener("click", async () => {
  const checkedRows = document.querySelectorAll(
    "#transaction-list input[type='checkbox']:checked",
  );

  const ids = [...checkedRows].map(
    (checkbox) => checkbox.closest("tr").dataset.id,
  );

  if (ids.length === 0) return;

  try {
    const deletePromises = ids.map((id) => deleteTransaction(id));
    await Promise.all(deletePromises);
    showToast("선택한 수입/지출 내역이 삭제되었습니다.", "success");
  } catch (e) {
    showToast(e.message);
  }
});

init();
