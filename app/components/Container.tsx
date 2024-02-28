"use client";
//這個組件適合於client端的React組件。主要原因有:
// 使用了React的語法,如React.FC、Props、children等。這些都是React中的概念。
// 沒有涉及到任何服務端的數據逻辑,純粹就是根據props渲染UI的組件。
// 使用了Tailwind CSS樣式,這是一種為構建UI設計的CSS框架。
// 依賴了React應用的執行環境。使用了組件、JSX等前端概念。
// 可以被其他組件重用。這是React組件的基本用途。
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
      "
    >
      {children}
    </div>
  );
};

export default Container;
//布局作用,使子組件不需要關心具體的寬度、間距等樣式細節
// max-w-[2520px] 表示:
// 當屏幕寬度大於等於 2520px 時,此元素的最大寬度為 2520px
// 當屏幕寬度小於 2520px 時,元素寬度隨屏幕變化而自適應
// 這樣可以實現一個自適應但有最大限制的布局容器。
