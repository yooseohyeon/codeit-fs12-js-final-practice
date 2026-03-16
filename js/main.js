import { getInitialData } from "./api.js";
import { renderTransactions, renderCategoryOptions } from "./render/list.js";

async function init() {
  try {
    const { transactions, categories } = await getInitialData();

    renderTransactions(transactions);
    renderCategoryOptions(categories);
  } catch (e) {
    console.log(e);
  }
}

init();
