"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "海灘",
    icon: TbBeach,
    description: "該住宿靠近海灘!",
  },
  {
    label: "風車",
    icon: GiWindmill,
    description: "此住宿有風車!",
  },
  {
    label: "現代",
    icon: MdOutlineVilla,
    description: "這家酒店很現代!",
  },
  {
    label: "農村",
    icon: TbMountain,
    description: "此住宿位於鄉村!",
  },
  {
    label: "泳池",
    icon: TbPool,
    description: "這家飯店有一個美麗的游泳池!",
  },
  {
    label: "島嶼",
    icon: GiIsland,
    description: "此住宿位於一座島嶼上!",
  },
  {
    label: "湖",
    icon: GiBoatFishing,
    description: "該住宿靠近湖!",
  },
  {
    label: "滑雪",
    icon: FaSkiing,
    description: "此住宿有滑雪活動!",
  },
  {
    label: "城堡",
    icon: GiCastle,
    description: "該酒店是一座古老的城堡!",
  },
  {
    label: "洞穴",
    icon: GiCaveEntrance,
    description: "這家旅館位於一個陰森的洞穴中!",
  },
  {
    label: "露營",
    icon: GiForestCamp,
    description: "此住宿提供露營活動!",
  },
  {
    label: "北極",
    icon: BsSnow,
    description: "該住宿位於北極環境中!",
  },
  {
    label: "沙漠",
    icon: GiCactus,
    description: "該住宿位於沙漠!",
  },
  {
    label: "穀倉",
    icon: GiBarn,
    description: "此住宿位於穀倉內!",
  },
  {
    label: "奢華",
    icon: IoDiamond,
    description: "該住宿全新且豪華!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
