import React, { createContext, useState, useEffect } from 'react';

export const ResultContext = createContext();

export function ResultProvider({ children }) {
  const [result, setResult] = useState(() => {
    // 从 LocalStorage 加载初始值
    return localStorage.getItem('result') || '';
  });

  useEffect(() => {
    // 监听 result 的变化，并更新到 LocalStorage
    if (result) {
      localStorage.setItem('result', result);
    }
  }, [result]);

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
}
