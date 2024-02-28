import { PrismaClient } from "@prisma/client";
// 定義一個全局變數 prisma，類型為 PrismaClient 或 undefined
declare global {
  var prisma: PrismaClient | undefined;
}
// 檢查是否存在全局變數 prisma，如果存在則使用，否則創建新的 PrismaClient 實例
//globalThis.prisma 用於獲取全局變量 prisma。如果 prisma 已經存在於全局對象中，
// 則直接使用它。否則，創建一個新的 PrismaClient 實例。
// 這樣做的目的是確保整個應用程序中只使用一個 PrismaClient 實例。
// 總的來說，globalThis 是一個新的全局對象，它可以兼容不同的執行環境，方便地訪問全局對象。
const client = globalThis.prisma || new PrismaClient();
// 如果不是生產環境，則將新創建的 PrismaClient 實例賦值給全局變數 prisma
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
// 導出 client 實例
export default client;
// 其它檔案import prisma from "@/app/libs/prismadb"
// 这里的prisma就会得到默认导出的client实例。
//而默认导出可以用任意名字导入,不一定要和源文件中的变量名相同。
// 之所以不使用client而是使用prisma,可能有以下几个考虑:

// 将客户端实例命名为prisma是一种通用的约定,便于识别这是一个Prisma客户端。
// Prisma自己的文档和示例代码也常用prisma作为客户端实例的名字。
// 使用prisma而不是client可以避免与其他可能的client变量产生混淆。
// prisma这个名字更能表达这是一个Prisma数据库客户端的单例。
//1:53:11
//防正開發模式下,熱重載會一直產生新的PrismaClient的實例
