import { getInitialData } from "./api.js";
import { renderTransactions, renderCategoryOptions } from "./render/list.js";
import { showLoading, hideLoading } from "./render/ui.js";

async function init() {
  try {
    showLoading();

    const { transactions, categories } = await getInitialData();

    renderTransactions(transactions);
    renderCategoryOptions(categories);
  } catch (e) {
    console.log(e);
  } finally {
    hideLoading();
  }
}

init();
