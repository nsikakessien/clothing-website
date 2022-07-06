import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

const selectCategoriesFromRedux = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.categories
);

export const selectCategories = createSelector(
  [selectCategoriesFromRedux],
  (categoryFromRedux) =>
    categoryFromRedux.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isLoading
);
