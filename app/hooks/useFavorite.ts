import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        //更新狀態: 當使用者點擊「收藏」按鈕時,會發送 HTTP 請求來更新該房源項目的收藏狀態。
        //但是,這個更新只會影響伺服器端的狀態,而不會自動更新客戶端的狀態。
        //因此,需要手動刷新頁面來獲取最新的狀態,以確保客戶端顯示的收藏狀態和伺服器端保持一致。

        // 重新獲取數據: 當一個房源項目被收藏或取消收藏時,
        // 可能會影響其他頁面或組件中顯示的數據。
        // 例如,如果在"我的收藏"頁面中顯示了收藏的房源列表,那麼當用戶更新收藏狀態時,
        // 需要重新獲取最新的收藏列表數據。因此,需要刷新頁面以重新獲取這些受影響的數據。
        toast.success("Success");
      } catch (error) {
        toast.error("出了點問題");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );
  // 它是一個被 useCallback 包裹的回呼函數。這個函數用來處理使用者點擊「收藏」按鈕的行為。
  // 首先，它會停止事件的傳播。接著，如果目前沒有登入的使用者，它會開啟登入模態框。否則，
  // 它會根據 hasFavorited 的值來發送不同的 HTTP 請求。如果已經收藏了該房源項目，
  // 則發送刪除請求；否則，發送新增請求。
  // 在請求成功後，它會刷新頁面並顯示成功的提示訊息。如果請求失敗，則會顯示錯誤訊息。
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
