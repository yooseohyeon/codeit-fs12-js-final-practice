import {
  getInitialData,
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "./api.js";
import {
  filterTransactions,
  sortTransactions,
  debounce,
  searchTransactions,
  calcStats,
} from "./utils.js";
import { validateTransaction } from "./validation.js";
import {
  saveSettings,
  loadSettings,
  saveFormDraft,
  loadFormDraft,
  clearFormDraft,
} from "./storage.js";
import { renderTransactions, renderCategoryOptions } from "./render/list.js";
import { renderStats } from "./render/stats.js";
import { showLoading, hideLoading, showToast } from "./render/ui.js";

/* DOM */
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

const typeFilter = document.querySelector("#type-filter");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-select");
const searchInput = document.querySelector("#search-input");

/* 상태 */
let transactions = [];
let categories = [];

/* 초기화 */
async function init() {
  try {
    showLoading();

    const data = await getInitialData();
    transactions = data.transactions;
    categories = data.categories;

    renderTransactions(transactions);
    renderCategoryOptions(categories);

    applySettings();
    applyFormDraft();
    loadStats();
    applyFilters();
  } catch (e) {
    showToast(e.message);
  } finally {
    hideLoading();
  }
}

init();

/* 데이터 로드 */
// 거래내역을 서버에서 다시 불러와 화면 갱신
async function loadTransactions() {
  transactions = await getTransactions();
  renderTransactions(transactions);
  loadStats();
}

/* 폼 */
// 폼 입력값을 객체로 반환
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

// 수정 모드가 아닐 때 폼 입력값을 sessionStorage에 임시 저장
form.addEventListener("input", () => {
  if (form.dataset.editId) return;
  saveFormDraft(getFormData());
});

// 폼 제출 이벤트: 추가/수정
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const data = getFormData();
    validateTransaction(data);

    if (form.dataset.editId) {
      // 수정
      const id = form.dataset.editId;
      await updateTransaction(id, data);
      showToast("수입/지출 내역이 수정되었습니다.", "success");
      await loadTransactions();

      formTitle.textContent = "수입/지출 추가";
      delete form.dataset.editId;
      submitBtn.textContent = "추가";
    } else {
      // 추가
      await createTransaction(data);
      clearFormDraft();
      showToast("수입/지출 내역이 추가되었습니다.", "success");
      await loadTransactions();
    }
  } catch (e) {
    showToast(e.message);
  }
});

/* 목록 이벤트 */

// 수정/삭제 버튼 클릭 이벤트 (이벤트 위임)
list.addEventListener("click", async (e) => {
  const tr = e.target.closest("tr");
  const id = tr.dataset.id;

  try {
    if (e.target.classList.contains("delete-btn")) {
      await deleteTransaction(id);
      showToast("수입/지출 내역이 삭제되었습니다.", "success");
      await loadTransactions();
    } else if (e.target.classList.contains("edit-btn")) {
      const [, date, category, description, amount] = tr.children;

      formTitle.textContent = "수입/지출 내역 수정";
      typeInput.value = tr.classList.contains("income") ? "income" : "expense";
      dateInput.value = date.textContent;
      categoryInput.value = category.textContent;
      descriptionInput.value = description.textContent;
      amountInput.value = amount.textContent.replace(/[^\d]/g, "");

      form.dataset.editId = id;
      submitBtn.textContent = "수정";
    }
  } catch (e) {
    showToast(e.message);
  }
});

// 선택된 항목 일괄 삭제
deleteSelectedBtn.addEventListener("click", async () => {
  const checkedRows = document.querySelectorAll(
    "#transaction-list input[type='checkbox']:checked",
  );

  const ids = [...checkedRows].map(
    (checkbox) => checkbox.closest("tr").dataset.id,
  );

  if (ids.length === 0) return;

  try {
    await Promise.all(ids.map((id) => deleteTransaction(id)));
    showToast("선택한 수입/지출 내역이 삭제되었습니다.", "success");
    await loadTransactions();
  } catch (e) {
    showToast(e.message);
  }
});

/* 필터/정렬/검색 */

// 검색에 debounce 적용
const debouncedFilter = debounce(() => applyFilters());

typeFilter.addEventListener("change", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
searchInput.addEventListener("input", debouncedFilter);

// 현재 필터/정렬/검색 조건을 모두 적용해 목록 렌더링
function applyFilters() {
  // 필터
  let result = filterTransactions(transactions, {
    type: typeFilter.value,
    category: categoryFilter.value,
  });

  // 정렬
  result = sortTransactions(result, sortSelect.value);

  // 검색
  result = searchTransactions(result, searchInput.value);

  // 렌더링
  renderTransactions(result);

  // 필터/정렬 설정 저장
  saveSettings(typeFilter.value, categoryFilter.value, sortSelect.value);
}

/* 통계 */
// 월별 통계 계산 후 렌더링
function loadStats() {
  const { income, expense, balance } = calcStats(transactions);
  renderStats(income, expense, balance);
}

/* localStorage, sessionStorage 복원 */

// localStorage에서 필터/정렬 설정 불러와 적용
function applySettings() {
  const settings = loadSettings();
  typeFilter.value = settings.type;
  categoryFilter.value = settings.category;
  sortSelect.value = settings.sort;
}

// sessionStorage에서 폼 임시저장 데이터 복원
function applyFormDraft() {
  const draft = loadFormDraft();
  if (draft) {
    typeInput.value = draft.type;
    dateInput.value = draft.date;
    categoryInput.value = draft.category;
    amountInput.value = draft.amount;
    descriptionInput.value = draft.description;
  }
}
