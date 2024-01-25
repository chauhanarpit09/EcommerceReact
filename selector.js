import { createSelector } from "reselect";

const selectUser = (state) => state.userReducer;
const selectProduct = (state) => state.productReducer;
const selectApiFlags = (state) => state.apiReducer;

export const selectMaskedEmail = createSelector(
  [selectUser],
  (user) => user.maskedEmail
);

export const selectMaskedPhone = createSelector(
  [selectUser],
  (user) => user.maskedPhone
);

export const selectIsNewUser = createSelector(
  [selectUser],
  (user) => user.isNewUser
);

export const selectDummyToken = createSelector(
  [selectUser],
  (user) => user.dummyToken
);

export const selectPhone = createSelector([selectUser], (user) => user.phone);

export const selectEmail = createSelector([selectUser], (user) => user.email);

export const selectAuthToken = createSelector(
  [selectUser],
  (user) => user.authToken
);

export const selectUserAddress = createSelector(
  [selectUser],
  (user) => user.userAddress
);

export const selectUserName = createSelector(
  [selectUser],
  (user) => user.userName
);

export const selectUserImage = createSelector(
  [selectUser],
  (user) => user.userImage
);

export const selectSessionToken = createSelector(
  [selectUser],
  (user) => user.sessionToken
);

export const selectProductCategories = createSelector(
  [selectProduct],
  (product) => product.productCategories
);

export const selectPopularProduct = createSelector(
  [selectProduct],
  (product) => product.popularProducts
);

export const selectAllProduct = createSelector(
  [selectProduct],
  (product) => product.allProducts
);

export const selectPopularSearches = createSelector(
  [selectProduct],
  (product) => product.popularSearches
);

export const selectRecentSearches = createSelector(
  [selectProduct],
  (product) => product.recentSearches
);

export const selectFeaturedProdcut = createSelector(
  [selectProduct],
  (product) => product.featuredProduct
);

export const selectCartItems = createSelector(
  [selectProduct],
  (product) => product.cartItems
);

export const selectSearchResults = createSelector(
  [selectProduct],
  (product) => product.searchResults
);

export const selectCallCart = createSelector(
  [selectApiFlags],
  (api) => api.callCart
);
