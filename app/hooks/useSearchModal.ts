import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
// 这段代码定义了一个 React 中的状态管理 hook 函数，用于管理搜索模态框的状态。
//它使用了 zustand 库来实现简单的状态管理。
// 首先，定义了一个 SearchModalStore 接口，描述了搜索模态框的状态及相关方法。它包含以下属性和方法：
// isOpen: 一个布尔值，表示搜索模态框是否打开。
// onOpen: 一个函数，用于打开搜索模态框。
// onClose: 一个函数，用于关闭搜索模态框。
// 接下来，使用 zustand 库中的 create 函数来创建一个新的 hook 函数 useSearchModal。
//这个函数接受一个初始化设置函数作为参数，该函数返回一个包含 SearchModalStore
//接口定义的属性和方法的对象。
// 在初始化设置函数中，定义了 isOpen 初始值为 false，表示搜索模态框初始时是关闭状态。
//同时，还定义了 onOpen 和 onClose 两个函数，用于更新 isOpen 的值。
//这些函数使用 set 函数来更新状态，set 函数会将传入的对象与当前状态进行合并。
// 最后，将创建的 useSearchModal 函数导出，以便在其他组件中使用。
// 总的来说，这段代码提供了一种简单的方式来管理搜索模态框的状态，
//通过调用 useSearchModal 函数，可以获取当前状态以及更新状态的方法。
