"use client";

import React, { useState, useEffect } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
//34:37
// 这个 ClientOnly 组件可以提高 React 应用的性能，
// 因为它可以防止在服务器端渲染不需要的组件，
// 从而减少服务器端的渲染负担。

// 注意:

// 只有在客户端执行 JavaScript 的情况下，
// ClientOnly 组件才能正常工作。
// 如果子组件依赖于服务器端渲染的数据，
// 则不能使用 ClientOnly 组件。
