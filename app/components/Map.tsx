"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
//MapContainer:定義地圖的容器
//TileLayer:定義底圖的圖磚來源,這裡是使用OpenStreetMap
//Marker: 在地圖上標記點
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});
// 這行程式碼是用來覆蓋 Leaflet 中預設的圖標 (Icon) 載入機制。
// Leaflet預設行為:
// Icon內部有一個_getIconUrl方法
// 這個方法會根據某些規則自動生成圖標的url
// 我們這裡的目的:
// 直接指定圖標的url路徑,而不是讓Leaflet自動生成
// 所以:
// 使用 delete L.Icon.Default.prototype._getIconUrl; 刪除該方法
// 然後在下面直接透過 L.Icon.Default.mergeOptions 設定iconUrl等屬性
// 這樣Leaflet就不會再呼叫 _getIconUrl 方法,而是直接從我們設定的屬性讀取圖標文件路徑。
// 這樣可以自定義圖標樣式,而不是使用預設樣式。
interface MapProps {
  center?: number[];
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
//{s}: 會被替換成不同的 server 子域名
//{z}: zoom 等級
//{x},{y}: 圖磚的 x, y 座標
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//定義了地圖的版權信息,指明地圖圖磚來源於 OpenStreetMap,並給出連結。
const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />
      {center && <Marker position={center as L.LatLngExpression} />}
      {/* 去react leaflet官網複製code */}
    </MapContainer>
  );
};

export default Map;
//3:53:39
