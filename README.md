# Challenge: 수입/지출 관리 앱 (도전)

## 목표

아무것도 제공되지 않습니다. **요구사항 문서만 보고** 수입/지출 관리 앱을 처음부터 끝까지 직접 만드세요.

## 제공되는 파일

없음 (이 README만 제공됩니다)

## 구현 요구사항

### 1. 프로젝트 설정

- `package.json` 직접 작성
- `json-server` 직접 설치 (`npm install json-server`)
- `db.json` 직접 설계 (수입/지출 구분 포함)
- HTML, CSS, JS 모두 직접 작성
- 완성 후 `README.md` 작성

### 2. db.json 구조

수입과 지출을 모두 관리할 수 있도록 `type` 필드를 포함하세요.
또한 카테고리를 별도 리소스로 분리하여 `Promise.all`로 병렬 요청할 수 있게 설계하세요:

```json
{
  "transactions": [
    {
      "id": 1,
      "type": "expense",
      "date": "2024-03-01",
      "category": "식비",
      "description": "점심 식사",
      "amount": 12000
    },
    {
      "id": 2,
      "type": "income",
      "date": "2024-03-01",
      "category": "급여",
      "description": "3월 급여",
      "amount": 3000000
    }
  ],
  "categories": [
    { "id": 1, "type": "expense", "name": "식비" },
    { "id": 2, "type": "expense", "name": "교통" },
    { "id": 3, "type": "expense", "name": "쇼핑" },
    { "id": 4, "type": "expense", "name": "문화" },
    { "id": 5, "type": "expense", "name": "기타" },
    { "id": 6, "type": "income", "name": "급여" },
    { "id": 7, "type": "income", "name": "용돈" },
    { "id": 8, "type": "income", "name": "기타수입" }
  ]
}
```

### 3. 수입/지출 동시 관리

- `type` 필드로 수입("income")과 지출("expense")을 구분
- 수입/지출 각각 추가 가능
- **잔액 계산**: 총 수입 - 총 지출
- 수입과 지출을 시각적으로 구분 (색상 등)

### 4. 완전한 CRUD

- **Create**: 수입/지출 추가 (POST)
- **Read**: 전체 내역 조회 (GET)
- **Update**: 내역 수정 (PATCH)
- **Delete**: 내역 삭제 (DELETE)

### 5. 일괄 삭제

- 각 항목에 체크박스를 추가하여 여러 항목을 선택할 수 있게 하세요
- "선택 삭제" 버튼으로 선택된 항목들을 한번에 삭제
- `Promise.all`을 사용하여 여러 DELETE 요청을 병렬로 처리하세요

### 6. 카테고리별 필터링

- 수입/지출 타입별 필터링
- 카테고리별 필터링
- `filter` 메서드 활용

### 7. 정렬 기능

- 금액순 정렬
- 날짜순 정렬
- `sort` 메서드 활용

### 8. 월별 통계 대시보드

- 월별 수입/지출/잔액 요약 표시
- `Date` 객체를 활용하여 월 추출
- `reduce`로 월별 데이터 그룹핑

### 9. 검색 기능 + debounce

- 설명(description) 기준 실시간 검색
- `input` 이벤트를 사용하여 타이핑할 때마다 필터링
- **debounce를 직접 구현**하여 검색 성능을 최적화하세요
  - 라이브러리 없이 `setTimeout`과 `clearTimeout`으로 직접 구현
  - 사용자가 타이핑을 멈춘 후 300ms 뒤에 검색 실행

### 10. 데이터 유효성 검증

- 금액은 양수여야 함
- 날짜 형식 확인 (정규표현식 활용)
- 빈 값 방지 (모든 필드 필수)
- 유효하지 않은 입력 시 사용자에게 메시지 표시

### 11. 로딩 상태 표시

- `fetch` 요청 중 로딩 UI 표시 (스피너, 텍스트 등)
- 요청 완료 후 로딩 UI 제거

### 12. 에러 핸들링

- 모든 API 호출에 `try-catch` 적용
- 에러 발생 시 사용자 친화적 메시지 표시
- 성공/실패에 따른 피드백 제공
- 일관된 에러 핸들링 패턴 사용

### 13. 초기 데이터 병렬 로딩 (Promise.all)

- 앱 시작 시 `transactions`와 `categories`를 `Promise.all`로 동시에 가져오세요
- 두 요청이 모두 완료된 후 화면을 렌더링하세요
- 하나라도 실패하면 에러 메시지를 표시하세요

### 14. localStorage - 사용자 설정 저장

브라우저를 닫았다 열어도 유지되어야 하는 설정을 `localStorage`에 저장하세요:

- 선택한 필터 상태 (카테고리, 타입)
- 정렬 기준 (금액순/날짜순, 오름차순/내림차순)
- 페이지 재방문 시 저장된 설정을 불러와서 자동 적용

### 15. sessionStorage - 폼 임시 저장

탭이 열려 있는 동안만 유지되는 데이터를 `sessionStorage`에 저장하세요:

- 폼에 작성 중인 데이터를 `input` 이벤트마다 `sessionStorage`에 저장
- 실수로 새로고침해도 작성 중이던 폼 데이터가 복원됨
- 폼 제출(submit) 성공 시 `sessionStorage`에서 해당 데이터 삭제
- 탭을 닫으면 자동으로 사라지므로 별도 정리 불필요

## 코드 품질 요구사항

### 모듈 구조

모든 API 호출은 별도 모듈에서 관리하세요. 다음과 같은 폴더 구조를 권장합니다:

```
js/
├── main.js              ← 앱 초기화 및 이벤트 처리
├── api.js               ← 서버 통신 (GET, POST, PATCH, DELETE, Promise.all)
├── utils.js             ← 유틸리티 함수 (순수 함수: 정렬, 통계, debounce 등)
├── validation.js        ← 데이터 유효성 검증
├── storage.js           ← localStorage/sessionStorage 관리
└── render/
    ├── list.js          ← 거래 내역 목록 렌더링
    ├── stats.js         ← 통계/대시보드 렌더링 (총합, 카테고리별, 월별)
    └── ui.js            ← 공통 UI (로딩 스피너, 에러/성공 메시지 토스트)
```

### Map 또는 Set 활용

`Map` 또는 `Set`을 최소 1곳 이상 활용하세요. 예시:

- 카테고리 목록 관리에 `Set` 사용
- 월별 데이터 캐싱에 `Map` 사용

### 순수 함수

유틸리티 함수는 순수 함수로 작성하세요:

- 외부 상태를 변경하지 않음
- 같은 입력에 항상 같은 출력
- 예: 통계 계산, 필터링, 정렬, debounce 함수

### 필수 문법

- `async/await`, `try-catch`
- `Promise.all`
- `forEach`, `filter`, `reduce`, `sort`, `map`
- `Object.entries`, `Object.keys`, `Object.values`
- 스프레드 연산자, 옵셔널 체이닝, 구조분해할당
- 템플릿 리터럴
- `import/export`
- `Map` 또는 `Set`
- `localStorage`, `sessionStorage`
- 클로저 (debounce 구현)
- `setTimeout`, `clearTimeout`

## npm 및 json-server 활용

### 프로젝트 초기화 및 json-server 설치

```bash
# package.json 생성
npm init -y

# json-server 설치
npm install json-server
```

### package.json scripts 설정

`package.json`의 `scripts`에 json-server 실행 명령을 등록하세요:

```json
{
  "scripts": {
    "start": "npx json-server --watch db.json --port 4000"
  }
}
```

### 서버 실행

```bash
# npm scripts로 실행
npm start

# 또는 직접 실행
npx json-server --watch db.json --port 4000
```

서버가 실행되면 아래 주소에서 API를 확인할 수 있습니다:
- `http://localhost:4000/transactions`
- `http://localhost:4000/categories`

> **주의**: json-server가 실행 중인 상태에서 앱을 사용해야 합니다. 터미널을 하나 더 열거나, 서버를 백그라운드로 실행하세요.

## README.md 작성

프로젝트 완성 후 `README.md`를 작성하세요:

- 프로젝트 설명 (어떤 앱인지)
- 실행 방법 (설치, 서버 실행, 브라우저 열기)
- 주요 기능 목록
- 폴더 구조 설명
- 사용한 주요 기술/문법

## 핵심 학습 포인트

- 프로젝트를 기획부터 구현까지 전체 과정 경험
- `Promise.all`을 활용한 병렬 비동기 처리
- 클로저를 활용한 debounce 패턴 구현
- `localStorage`와 `sessionStorage`의 차이점 이해 및 적절한 활용
- 고급 데이터 처리 (월별 통계, 실시간 검색)
- 코드 품질과 구조 설계
- 문서화 능력

## API 엔드포인트

| 메서드 | URL                                      | 설명               |
| ------ | ---------------------------------------- | ------------------ |
| GET    | `http://localhost:4000/transactions`     | 전체 내역 조회     |
| GET    | `http://localhost:4000/categories`       | 카테고리 목록 조회 |
| POST   | `http://localhost:4000/transactions`     | 내역 추가          |
| PATCH  | `http://localhost:4000/transactions/:id` | 내역 수정          |
| DELETE | `http://localhost:4000/transactions/:id` | 내역 삭제          |

## 힌트

- **Promise.all 초기 로딩**:
  ```js
  const [transactions, categories] = await Promise.all([
    fetch("http://localhost:4000/transactions").then((res) => res.json()),
    fetch("http://localhost:4000/categories").then((res) => res.json()),
  ]);
  ```
- **Promise.all 일괄 삭제**:
  ```js
  const deletePromises = selectedIds.map((id) =>
    fetch(`http://localhost:4000/transactions/${id}`, { method: "DELETE" }),
  );
  await Promise.all(deletePromises);
  ```
- **debounce 구현** (클로저 활용):
  ```js
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }
  ```
- **localStorage 사용**:
  ```js
  // 저장
  localStorage.setItem(
    "filterSettings",
    JSON.stringify({ category: "식비", sort: "date" }),
  );
  // 불러오기
  const settings = JSON.parse(localStorage.getItem("filterSettings"));
  ```
- **sessionStorage 폼 임시 저장**:
  ```js
  // input 이벤트마다 저장
  formInput.addEventListener("input", () => {
    sessionStorage.setItem(
      "formDraft",
      JSON.stringify({ date, category, amount, description }),
    );
  });
  // 페이지 로드 시 복원
  const draft = JSON.parse(sessionStorage.getItem("formDraft"));
  if (draft) {
    /* 폼에 값 채우기 */
  }
  // submit 성공 후 삭제
  sessionStorage.removeItem("formDraft");
  ```
- 월 추출: `new Date(date).getMonth()` (0~11 반환)
- `Set`으로 고유 카테고리 목록 관리: `new Set(transactions.map(t => t.category))`
- 순수 함수 예시: `const calcTotal = (items) => items.reduce((sum, item) => sum + item.amount, 0)`
