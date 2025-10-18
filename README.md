tailwind prettier 사용함

- 가격 가져오기 및 TVL 계산: src/component/home/VaultListWithPopup.tsx
  - Coingecko Simple Price API를 클라이언트에서 호출해 ETH, USDT, USDC 가격을 가져옵니다.
  - 토큰별 기준 수량(multipliers)과 곱해 TVL을 계산하여 totalAmount로 전달합니다.
  - 상태: prices, loading, error 관리. 에러 시 5초부터 최대 60초까지 지수 백오프로 자동 재시도. 60초 주기로 정상 갱신.
  - 리스트/팝업에 로딩/에러 상태를 내려 UI에서 표현.
- Vault 리스트 아이템 Skeleton/에러: src/component/home/VaultInfo.tsx
  - loading, error props 추가.
  - 로딩 시 금액 대신 Skeleton, 에러 시 빨간 메시지 노출.
- 팝업 TVL Skeleton/에러: src/component/home/VaultDetailPopup.tsx
  - loading, error props 추가.
  - TVL 영역에 Skeleton/에러 메시지 노출.
