# 全端 Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth 2023

![Copy of Fullstack Twitter Clone (8)](https://user-images.githubusercontent.com/23248726/229031522-64a49ad0-66f7-4ea8-94a8-f64a0bb56736.png)

這是帶有 Next.js 13 App Router 的全端 Airbnb Clone 的儲存庫：React、Tailwind、Prisma、MongoDB、NextAuth。

Features:

- Tailwind 設計
- Tailwind 動畫和效果
- 完全響應式
- 標準的 Username 和 Password 驗證
- **<span style="color: blue;">Google</span>** 驗證
- **<span style="color: blue;">GitHub</span>** 驗證
- 使用 Cloudinary CDN 上傳圖片
- 使用 react-hook-form 進行客戶端表單驗證和處理
- 使用 react-toast 處理服務器錯誤
- 使用 react-date-range 日曆
- 頁面加載狀態
- 頁面空狀態
- 預訂/預約系統
- 訪客預約取消
- 房東預約取消
- 創建和刪除房產
- 定價計算
- 按類別、日期範圍、地圖位置、客人數、房間和浴室數進行高級搜索算法
- 例如，我們將過濾出在您所選日期範圍內已預訂的房產
- 收藏夾系統
- 可分享的 URL 篩選器
- 假設您選擇了類別、地點和日期範圍，您將能夠與另一個瀏覽器中的未登錄朋友分享 URL，他們將看到相同的結果
- 如何在路由處理程序（app/api）中編寫 POST 和 DELETE 路由
- 如何在服務器端 react 組件中直接訪問數據庫（無需 API！）
- 如何處理類似 error.tsx 和 loading.tsx 的文件，這些是 Next 13 模板文件，用於統一處理加載和錯誤
- 如何處理服務器和子組件之間的關係

### 先決條件

**Node 版本 14.x**

### Cloning the repository

````shell
git clone https://github.com/evan17458/airbnb-clone

### 安裝包

```shell
npm i
````

### Setup .env file

```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```

### 設定 .env 檔

```shell
npx prisma db push

```

### 啟動應用程式

```shell
npm run dev
```

## 可用指令

使用 npm 運行命令 `npm run [command]`

| 命令  | 描述                                     |
| :---- | :--------------------------------------- |
| `dev` | Starts a development instance of the app |
