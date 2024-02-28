"use client";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    //如果相等,說明當前分類已被選中,再次點擊時需要取消
    //所以 delete updatedQuery.category 從更新後的參數物件中刪除category參數
    //1.未選中 > 點擊 > 添加參數 > 選中;
    //2.已選中 > 點擊 > 刪除參數 > 取消所選;

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    //第二個參數是個配置對象,{ skipNull: true }
    //表示在生成 URL 時略過值為 null 的查詢參數。
    //如果 updatedQuery 對象為 { foo: null }:
    //1.不傳第二個參數,生成的 URL 會是 /?foo=null
    //2.傳入 { skipNull: true },生成的 URL 會是 /

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
