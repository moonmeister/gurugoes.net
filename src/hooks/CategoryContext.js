import React, { useContext, createContext, useState } from 'react';

const CategoryContext = createContext();

const { Provider } = CategoryContext;

export const useCategoryContext = () => useContext(CategoryContext);

export function CategoryProvider({ children }) {
  const [currentCategory, setCurrentCategory] = useState();

  return (
    <Provider value={{ currentCategory, setCurrentCategory }}>
      {' '}
      {children}
    </Provider>
  );
}
