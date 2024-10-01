import ICONS from "../constants/icon";
import "@fortawesome/fontawesome-free/css/all.css";

export default function useFilter() {
  const filterButtons = [
    {
      "aria-label": "유료",
      className:
        "bg-white text-filter_yellow px-6 rounded-full shadow-lg flex items-center text-lg",
      iconClass: ICONS.won,
      label: "유료",
      onClick: () => console.log("유료 clicked"),
    },
    {
      "aria-label": "무료",
      className:
        "bg-white text-primary px-6 rounded-full shadow-lg flex items-center text-lg",
      iconClass: ICONS.won,
      label: "무료",
      onClick: () => console.log("무료 clicked"),
    },
    {
      "aria-label": "노상",
      className:
        "bg-white text-filter_green px-6 rounded-full shadow-lg flex items-center text-lg",
      iconClass: ICONS.road_solid,
      label: "노상",
      onClick: () => console.log("노상 clicked"),
    },
    {
      "aria-label": "노외",
      className:
        "bg-white text-filter_dark_green px-6 rounded-full shadow-lg flex items-center text-lg",
      iconClass: ICONS.ruler_solid,
      label: "노외",
      onClick: () => console.log("노외 clicked"),
    },
    {
      "aria-label": "현재 주차 가능",
      className:
        "bg-white text-filter_blue px-6 rounded-full shadow-lg flex items-center text-lg",
      iconClass: ICONS.car,
      label: "현재 주차 가능",
      onClick: () => console.log("현재 주차 가능 clicked"),
    },
  ];
  return { filterButtons };
}
