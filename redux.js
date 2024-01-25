import { configureStore, createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  authToken: null,
  sessionToken: null,
  userName: null,
  userImage: null,
  maskedEmail: null,
  maskedPhone: null,
  phone: null,
  email: null,
  dummyToken: null,
  isNewUser: null,
  userAddress: [],
};

const productInitialState = {
  searchResults: [],
  productCategories: [],
  allProducts: [],
  popularProducts: [],
  recentSearches: [],
  cartItems: [],
};

const apiflags = {
  callCart: true,
};

const apiSlice = createSlice({
  name: "apiFlags",
  initialState: apiflags,
  reducers: {
    clearAllApiFlags: () => apiflags,
    setCallCart: (state, action) => {
      state.callCart = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    clearAllUserInfo: () => userInitialState,
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    setMaskedPhone: (state, action) => {
      state.maskedPhone = action.payload;
    },
    setMaskedEmail: (state, action) => {
      state.maskedEmail = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDummyToken: (state, action) => {
      state.dummyToken = action.payload;
    },
    setIsNewUser: (state, action) => {
      state.isNewUser = action.payload;
    },
    setUserAddress: (state, action) => {
      const item = action.payload?.item;
      switch (action.payload.op) {
        case 0: //"UPDATE"
          const currentIndex = state.userAddress.findIndex(
            (address) => address?.name === action.payload.item?.name
          );
          const previousDefaultOPtion = state.userAddress.findIndex(
            (address) => address?.isDefault
          );

          if (currentIndex !== -1) {
            const newUserAddress = [...state.userAddress];
            newUserAddress[currentIndex] = action.payload?.item;
            if (
              previousDefaultOPtion !== -1 &&
              action.payload?.item?.isDefault === true &&
              action.payload?.item?.name !==
                newUserAddress[previousDefaultOPtion]?.name
            )
              newUserAddress[previousDefaultOPtion].isDefault = false;
            state.userAddress = newUserAddress.sort((a, b) =>
              a?.isDefault ? -1 : b?.isDefault ? 1 : 0
            );
          } else {
            state.userAddress;
          }
          break;
        case 1: //"DELETE"
          const newUserAddress = state.userAddress.filter(
            (address) => address?.name !== action.payload.item?.name
          );
          state.userAddress = newUserAddress;
          break;
        case 2: //"ADD"
          console.log("aasas");
          if (action.payload?.item?.isDefault) {
            const prevDefaultIndex = state.userAddress.findIndex(
              (address) => address?.isDefault
            );
            const newUserAddress = [action.payload?.item, ...state.userAddress];
            if (prevDefaultIndex !== -1) {
              newUserAddress[prevDefaultIndex + 1].isDefault = false;
            }
            state.userAddress = newUserAddress;
          } else {
            state.userAddress.push(action.payload?.item);
          }
        default:
          state.userAddress;
      }
    },
  },
});

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    clearAllProductInfo: () => productInitialState,
    setProductCategories: (state, action) => {
      state.productCategories = action.payload;
    },
    setAllProduct: (state, action) => {
      const uniqueProducts = action.payload.reduce((accumulator, product) => {
        const existingProductIndex = accumulator.findIndex(
          (existingProduct) => existingProduct.id === product.id
        );

        if (existingProductIndex !== -1) {
          accumulator[existingProductIndex] = {
            ...accumulator[existingProductIndex],
            ...product,
          };
        } else {
          accumulator.push({ ...product, isSelected: true });
        }

        return accumulator;
      }, state.allProducts);
      state.allProducts = uniqueProducts;
    },
    setPopularProduct: (state, action) => {
      state.popularProducts = action.payload;
    },
    setFeaturedProduct: (state, action) => {
      state.featuredProduct = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setPopularSearches: (state, action) => {
      state.popularSearches = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    productReducer: productSlice.reducer,
    apiReducer: apiSlice.reducer,
  },
});

const { setCallCart } = apiSlice.actions;

const {
  setAuthToken,
  setUserName,
  setMaskedPhone,
  setMaskedEmail,
  setPhone,
  setEmail,
  setDummyToken,
  setIsNewUser,
  setSessionToken,
  setUserImage,
  clearAllUserInfo,
  setUserAddress,
} = userSlice.actions;
const {
  setProductCategories,
  setPopularProduct,
  setPopularSearches,
  setSearchResults,
  setFeaturedProduct,
  setCartItems,
  setAllProduct,
  clearAllProductInfo,
} = productSlice.actions;

export {
  store,
  setAuthToken,
  setUserName,
  setMaskedPhone,
  setMaskedEmail,
  setPhone,
  setEmail,
  setDummyToken,
  setIsNewUser,
  setSessionToken,
  setUserImage,
  setProductCategories,
  setPopularProduct,
  setPopularSearches,
  setFeaturedProduct,
  setCartItems,
  setSearchResults,
  setAllProduct,
  clearAllUserInfo,
  clearAllProductInfo,
  setCallCart,
  setUserAddress,
};
