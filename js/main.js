import { getInitialData, createTransaction, deleteTransaction } from "./api.js";
import { renderTransactions, renderCategoryOptions } from "./render/list.js";
import { showLoading, hideLoading, showToast } from "./render/ui.js";
import { validateTransaction } from "./validation.js";

const form = document.querySelector("#transaction-form");
const list = document.querySelector("#transaction-list");

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

init();
