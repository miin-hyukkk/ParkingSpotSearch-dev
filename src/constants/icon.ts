type IconProps = {
  [index: string]: string;
}; // key에 string으로 접근할 수 있도록 인덱스 선언

const ICONS: IconProps = {
  map: "bi bi-map",
  geo_fill: "bi bi-geo-alt-fill",
  logo: "bi bi-p-square-fill",
  search: "bi bi-search",
  bookmark: "bi bi-bookmark",
  bookmark_fill: "bi bi-bookmark-fill",
  current_location: "bi bi-crosshair",
  plus: "bi bi-plus",
  minus: "bi bi-dash",

  // Font Awesome icons
  road_solid: "fa-solid fa-road", // 노상
  ruler_solid: "fa-solid fa-ruler", // 노외
  won: "fa-solid fa-won-sign", // 유,무료
  car: "fa-solid fa-car", // 현재주차가능
};

export default ICONS;
