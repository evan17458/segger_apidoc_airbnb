export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
// ["/trips", "/reservations", "/properties", "/favorites"] 頁面需要身份驗證。
//如果用戶未登錄,預設的行為是將他們重定向到登錄頁面。
//8:36:30
