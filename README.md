# 💰 수입/지출 관리 앱

수입과 지출을 기록하고 관리할 수 있는 웹 애플리케이션입니다.
월별 통계, 카테고리별 필터링, 실시간 검색 등 다양한 기능을 제공합니다.

![](https://velog.velcdn.com/images/yooseohyeon02/post/3dd40553-a1f8-42ee-9dc5-ca574c359cba/image.png)

## ✨ 주요 기능

- **CRUD**: 수입/지출 내역 추가, 조회, 수정, 삭제
- **일괄 삭제**: 체크박스로 여러 항목 선택 후 한 번에 삭제
- **필터링**: 타입(수입/지출), 카테고리별 필터링
- **정렬**: 날짜순, 금액순 정렬
- **실시간 검색**: 설명 기준 검색 (debounce 적용)
- **월별 통계**: 이번 달 수입/지출/잔액 요약 및 카테고리별 거래 건수
- **설정 저장**: 필터/정렬 설정을 localStorage에 저장하여 재방문 시 유지
- **폼 임시 저장**: 작성 중인 폼 데이터를 sessionStorage에 저장하여 새로고침 후 복원

## 📝 구현 시 고려한 점

### 새로고침 없는 UI 갱신

CRUD 성공 후 페이지를 새로고침하지 않고 `loadTransactions()`를 호출해 서버 데이터를 다시 불러와 즉시 화면을 갱신합니다.

### 필터/정렬/검색 통합 처리

`applyFilters()` 함수 하나에서 필터, 정렬, 검색을 순서대로 적용합니다. 그래서 여러 조건을 동시에 적용할 수 있고, 특정 조건이 바뀌더라도 항상 원본 `transactions`에서 재계산하기 때문에 필터링/정렬/검색이 올바르게 작동합니다.

### 순수 함수 설계

`utils.js`의 모든 유틸리티 함수는 순수 함수로 작성했습니다. 특히 `Array.sort()`는 원본 배열을 변경하는데, 이때 유틸리티 함수(`sortTransactions`) 내부에서 스프레드 연산자로 복사본을 만들어 정렬하도록 했습니다. 이를 통해 순수 함수를 호출하는 쪽에서는 함수 내부 구현이 어떤지 신경 쓸 필요 없도록 했습니다.

### 이벤트 위임

수정/삭제 버튼처럼 동적으로 생성되는 요소에는 각 버튼마다 이벤트 리스너를 붙이는 대신, 부모 요소인 `#transaction-list`에 하나의 이벤트 리스너를 등록하고 `e.target`으로 클릭된 요소를 판별합니다. 렌더링할 때마다 이벤트를 재등록할 필요가 없도록 했습니다.

### storage.js 모듈 분리

localStorage(필터/정렬 설정)와 sessionStorage(폼 임시 저장)를 `storage.js`로 분리해 스토리지 관련 로직을 한 곳에서 관리합니다. `main.js`는 저장/불러오기 구현을 몰라도 됩니다.

### 수정 모드 폼 draft 미저장

폼 입력 시 sessionStorage에 임시 저장하지만, 수정 모드(`form.dataset.editId`가 있을 때)에서는 저장하지 않습니다. 수정 취소 후 새로 추가하려 할 때 이전 수정 데이터가 복원되는 문제를 방지합니다.

### 카테고리별 거래 건수 표시

월별 통계 섹션에 카테고리별 거래 건수를 뱃지 형태로 표시합니다. `Object.entries`와 `reduce`를 활용해 거래 내역에서 카테고리별 건수를 집계하고, 수입/지출 타입에 따라 색상을 구분합니다.

## 📂 폴더 구조

```
├── index.html
├── db.json
├── package.json
├── css/
│   ├── reset.css
│   └── style.css
└── js/
    ├── main.js          ← 앱 초기화 및 이벤트 처리
    ├── api.js           ← 서버 통신 (GET, POST, PATCH, DELETE)
    ├── utils.js         ← 유틸리티 순수 함수 (필터, 정렬, 통계, debounce)
    ├── validation.js    ← 폼 데이터 유효성 검증
    ├── storage.js       ← localStorage / sessionStorage 관리
    └── render/
        ├── list.js      ← 거래 내역 목록 렌더링
        ├── stats.js     ← 통계 렌더링 (수입/지출/잔액, 카테고리별 건수)
        └── ui.js        ← 공통 UI (로딩, 토스트 메시지)
```

## ⚡ 사용한 주요 기술 및 문법

| 분류        | 내용                                                             |
| ----------- | ---------------------------------------------------------------- |
| 비동기 처리 | `async/await`, `try-catch`, `Promise.all`                        |
| 배열 메서드 | `map`, `filter`, `reduce`, `sort`, `forEach`                     |
| 객체 메서드 | `Object.entries`, `Object.keys`, `Object.values`                 |
| 최신 문법   | 구조분해할당, 스프레드 연산자, 옵셔널 체이닝, 템플릿 리터럴      |
| 자료구조    | `Set` (고유 카테고리 관리)                                       |
| 스토리지    | `localStorage` (필터/정렬 설정), `sessionStorage` (폼 임시 저장) |
| 클로저      | `debounce` 직접 구현 (`setTimeout`, `clearTimeout`)              |
| 모듈        | `import/export`                                                  |

## 🚀 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 서버 실행

```bash
npm start
```

json-server가 `http://localhost:4000`에서 실행됩니다.

### 3. 브라우저에서 열기

별도의 정적 파일 서버로 `index.html`을 여세요.

```bash
npx serve .
```

`http://localhost:3000`에서 앱을 확인할 수 있습니다.

> json-server와 정적 파일 서버를 **터미널 두 개**에서 각각 실행해야 합니다.
