const BASE_URL = "http://localhost:4000";

export async function getTransactions() {
  try {
    const res = await fetch(`${BASE_URL}/transactions`);

    if (!res.ok) {
      throw new Error("수입/지출 내역 조회에 실패했습니다.");
    }

    return res.json();
  } catch {
    throw new Error("서버에 연결할 수 없습니다.");
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`);

    if (!res.ok) {
      throw new Error("카테고리 목록 조회에 실패했습니다.");
    }

    return res.json();
  } catch {
    throw new Error("서버에 연결할 수 없습니다.");
  }
}

export async function getInitialData() {
  const [transactions, categories] = await Promise.all([
    getTransactions(),
    getCategories(),
  ]);

  return { transactions, categories };
}

export async function createTransaction(data) {
  try {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("수입/지출 내역 추가에 실패했습니다.");
    }

    return res.json();
  } catch {
    throw new Error("서버에 연결할 수 없습니다.");
  }
}
