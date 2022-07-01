import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoryContext = createContext({
  categoryMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoryMap, setCategoryMap] = useState({});

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoryMap(categoryMap);
    };

    getCategoryMap();
  }, []);

  const value = { categoryMap };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
