export function validateTransaction(data) {
  const { type, date, category, description, amount } = data;

  // 빈 값 검사
  if (!type || !date || !category || !description || !amount) {
    throw new Error("모든 필드를 입력해야 합니다.");
  }

  // 금액 양수 검사
  if (amount <= 0) {
    throw new Error("금액은 0보다 커야 합니다.");
  }

  // 날짜 형식 검사 (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(date)) {
    throw new Error("날짜 형식이 올바르지 않습니다.");
  }
}
