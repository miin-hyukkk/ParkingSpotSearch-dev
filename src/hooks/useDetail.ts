import "@fortawesome/fontawesome-free/css/all.css";
import { useLocation } from "react-router-dom";

export default function useDetail() {
  const { state } = useLocation();

  // 표시할 항목 배열
  const 항목 = [
    { label: "정보업데이트", value: state.NOW_PRK_VHCL_UPDT_TM },
    {
      label: "현재 주차 가능",
      value: `${state.NOW_PRK_VHCL_CNT}대 / 전체 주차 공간 ${state.TPKCT}대`,
    },
    { label: "종류", value: state.PRK_TYPE_NM },
    { label: "주소", value: state.ADDR },
    { label: "전화번호", value: state.TELNO },
    { label: "요금 정보", value: state.PAY_YN_NM },
    { label: "정기권 금액", value: `${state.PRD_AMT}원` },
    { label: "야간개방", value: state.NGHT_PAY_YN_NM },
  ];

  const 시간표 = [
    {
      label: "평일",
      시간: `${state.WD_OPER_BGNG_TM} ~ ${state.WD_OPER_END_TM}`,
    },
    {
      label: "토요일",
      시간: `${state.SAT_OPER_BGNG_TM} ~ ${state.SAT_OPER_END_TM}`,
    },
    {
      label: "일요일/공휴일",
      시간: `${state.LHLDY_OPER_BGNG_TM} ~ ${state.LHLDY_OPER_END_TM}`,
    },
  ];

  const 금액정보 = [
    { label: "기본 금액", value: `${state.BSC_PRK_CRG}원` },
    { label: "추가 금액", value: `${state.ADD_PRK_CRG}원` },
    { label: "일 최대 금액", value: `${state.DAY_MAX_CRG}원` },
  ];

  return { 항목, 시간표, 금액정보 };
}
