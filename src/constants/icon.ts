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
};

export default ICONS;
