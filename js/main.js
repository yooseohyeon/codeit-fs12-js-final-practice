import {
  getInitialData,
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "./api.js";
import { renderTransactions, renderCategoryOptions } from "./render/list.js";
import { showLoading, hideLoading, showToast } from "./render/ui.js";
import { validateTransaction } from "./validation.js";

const form = document.querySelector("#transaction-form");
const formTitle = document.querySelector("#form-title");
const typeInput = document.querySelector("#type-input");
const dateInput = document.querySelector("#date-input");
const categoryInput = document.querySelector("#category-input");
const amountInput = document.querySelector("#amount-input");
const descriptionInput = document.querySelector("#description-input");
const submitBtn = form.querySelector("button[type='submit']");
const list = document.querySelector("#transaction-list");
const deleteSelectedBtn = document.querySelector("#delete-selected");

let transactions = [];
let categories = [];

async function init() {
  try {
    showLoading();

    const data = await getInitialData();
    transactions = data.transactions;
    categories = data.categories;

    renderTransactions(transactions);
    renderCategoryOptions(categories);
  } catch (e) {
    showToast(e.message);
  } finally {
    hideLoading();
    console.log("초기:", transactions);
  }
}

init();

async function loadTransactions() {
  transactions = await getTransactions();
  renderTransactions(transactions);
  console.log("변경:", transactions);
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

    if (form.dataset.editId) {
      const id = form.dataset.editId;
      await updateTransaction(id, data);
      showToast("수입/지출 내역이 수정되었습니다.", "success");
      await loadTransactions();
      formTitle.textContent = "수입/지출 추가";
      delete form.dataset.editId;
      form.querySelector("button[type='submit']").textContent = "추가";
    } else {
      await createTransaction(data);
      showToast("수입/지출 내역이 추가되었습니다.", "success");
      await loadTransactions();
    }
  } catch (e) {
    showToast(e.message);
  }
});

list.addEventListener("click", async (e) => {
  const tr = e.target.closest("tr");
  const id = tr.dataset.id;

  try {
    if (e.target.classList.contains("delete-btn")) {
      await deleteTransaction(id);
      showToast("수입/지출 내역이 삭제되었습니다.", "success");

      await loadTransactions();
    } else if (e.target.classList.contains("edit-btn")) {
      formTitle.textContent = "수입/지출 내역 수정";

      typeInput.value = tr.classList.contains("income") ? "income" : "expense";
      dateInput.value = tr.children[1].textContent;
      categoryInput.value = tr.children[2].textContent;
      descriptionInput.value = tr.children[3].textContent;
      amountInput.value = tr.children[4].textContent.replace(/[^\d]/g, "");

      form.dataset.editId = id;
      submitBtn.textContent = "수정";
    }
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
    await loadTransactions();
  } catch (e) {
    showToast(e.message);
  }
});
