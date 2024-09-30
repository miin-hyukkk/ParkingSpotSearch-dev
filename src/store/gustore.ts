import { create } from "zustand";
import { SeoulDistrict } from "../interfaces/seoulDistrict";

interface GuStore {
  currentDistrict: SeoulDistrict; // 현재 자치구 이름
  setCurrentDistrict: (district: SeoulDistrict) => void; // 자치구 이름 설정 함수
}

const useGuStore = create<GuStore>(set => ({
  currentDistrict: "",
  setCurrentDistrict: district => set({ currentDistrict: district }),
}));

export default useGuStore;
