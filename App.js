import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Cart,
  Home,
  Login,
  ProductView,
  Profile,
  Register,
  Search,
  WishList,
  Orders,
  Address,
  Reviews,
  Earn,
  EditProfile,
  SearchResult,
  Checkout,
} from "./screens";
import { screenNames } from "./constants/screenName";
import { useFonts } from "expo-font";
import React, { useCallback } from "react";
import { store } from "./redux";
import { Provider } from "react-redux";
import BottomNavigator from "./navigation/BottomNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import razorpay from "./razorpay/Razorpay";

const Stack = createNativeStackNavigator();
const customFonts = {
  "sans-regular": require("./assets/fonts/DMSans-Regular.ttf"),
  "sans-light": require("./assets/fonts/DMSans-Light.ttf"),
  "sans-bold": require("./assets/fonts/DMSans-Bold.ttf"),
  "sans-medium": require("./assets/fonts/DMSans-Medium.ttf"),
  "sans-extraBold": require("./assets/fonts/DMSans-ExtraBold.ttf"),
  "sans-semiBold": require("./assets/fonts/DMSans-SemiBold.ttf"),
};

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="adsd" //{screenNames.home}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="adsd" component={razorpay} />
          <Stack.Screen name={screenNames.home} component={Home} />
          <Stack.Screen name={screenNames.login} component={Login} />
          <Stack.Screen name={screenNames.register} component={Register} />
          <Stack.Screen name={screenNames.profile} component={Profile} />
          <Stack.Screen name={screenNames.wishList} component={WishList} />
          <Stack.Screen name={screenNames.search} component={Search} />
          <Stack.Screen
            name={screenNames.productView}
            component={ProductView}
          />
          <Stack.Screen name={screenNames.order} component={Orders} />
          <Stack.Screen name={screenNames.address} component={Address} />
          <Stack.Screen name={screenNames.reviews} component={Reviews} />
          <Stack.Screen name={screenNames.cart} component={Cart} />
          <Stack.Screen name={screenNames.earn} component={Earn} />
          <Stack.Screen name={screenNames.checkout} component={Checkout} />
          <Stack.Screen
            name={screenNames.searchResult}
            component={SearchResult}
          />
          <Stack.Screen
            name={screenNames.editProfile}
            component={EditProfile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
