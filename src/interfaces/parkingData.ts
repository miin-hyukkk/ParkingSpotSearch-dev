export interface ParkingData {
  ADDR: string; // 주차장 주소
  ADD_PRK_CRG: number; // 추가 주차 요금
  ADD_PRK_HR: number; // 추가 주차 시간
  BSC_PRK_CRG: number; // 기본 주차 요금
  BSC_PRK_HR: number; // 기본 주차 시간
  BUS_ADD_PRK_CRG: number; // 버스 추가 주차 요금
  BUS_ADD_PRK_HR: number; // 버스 추가 주차 시간
  BUS_BSC_PRK_CRG: number; // 버스 기본 주차 요금
  BUS_BSC_PRK_HR: number; // 버스 기본 주차 시간
  DAY_MAX_CRG: number; // 일 최대 요금
  LAT: number; // 위도
  LHLDY_CHGD_FREE_SE: string; // 휴일 요금 변경 여부
  LHLDY_CHGD_FREE_SE_NAME: string; // 휴일 요금 변경 이름
  LHLDY_OPER_BGNG_TM: string; // 휴일 운영 시작 시간
  LHLDY_OPER_END_TM: string; // 휴일 운영 종료 시간
  LOT: number; // 주차장 면적
  NGHT_PAY_YN: string; // 야간 유료 여부
  NGHT_PAY_YN_NM: string; // 야간 유료 이름
  NOW_PRK_VHCL_CNT: number; // 현재 주차된 차량 수
  NOW_PRK_VHCL_UPDT_TM: string; // 현재 차량 수 업데이트 시간
  OPER_SE: string; // 운영 구분
  OPER_SE_NM: string; // 운영 구분 이름
  PAY_YN: string; // 유료 여부
  PAY_YN_NM: string; // 유료 이름
  PKLT_CD: string; // 주차장 코드
  PKLT_NM: string; // 주차장 이름
  PKLT_TYPE: string; // 주차장 타입
  PRD_AMT: string; // 상품 금액
  PRK_STTS_NM: string; // 주차 상태 이름
  PRK_STTS_YN: string; // 주차 상태 여부
  PRK_TYPE_NM: string; // 주차 타입 이름
  SAT_CHGD_FREE_NM: string; // 주말 요금 무료 이름
  SAT_CHGD_FREE_SE: string; // 주말 요금 무료 여부
  SHRN_PKLT_ETC: string; // 기타 주차장 정보
  SHRN_PKLT_MNG_NM: string; // 주차장 관리 이름
  SHRN_PKLT_MNG_URL: string; // 주차장 관리 URL
  SHRN_PKLT_YN: string; // 축소 주차장 여부
  STRT_PKLT_MNG_NO: string; // 시작 주차장 관리 번호
  TELNO: string; // 전화번호
  TPKCT: number; // 총 주차 공간 수
  WD_OPER_BGNG_TM: string; // 평일 운영 시작 시간
  WD_OPER_END_TM: string; // 평일 운영 종료 시간
  WE_OPER_BGNG_TM: string; // 주말 운영 시작 시간
  WE_OPER_END_TM: string; // 주말 운영 종료 시간
}
