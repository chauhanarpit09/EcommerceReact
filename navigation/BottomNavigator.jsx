import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react'
import { screenNames } from '../constants/screenName';
import { Cart, Home, Search, WishList } from '../screens';
import { Octicons, Feather } from '@expo/vector-icons'; 
import { GlobalConfig } from '../constants/globalConfig';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel : false,
  tabBarHideOnKeyboard : true,
  headerShown : false,
  tabBarStyle : {
      position : 'absolute',
      height: 60,
      elevation : 0,
      backgroundColor : GlobalConfig.secondaryBackgroundColor
  }
}

const BottomNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
            name={screenNames.home}
            component={Home}
            options={{
                tabBarIcon : ({focused}) => {
                  return (
                    <View>
                        <Octicons
                                name={"home"}
                                size={focused ? 28 : 24}
                                color={focused ? GlobalConfig.primaryButtonColor : GlobalConfig.secondaryColor}
                                />
                    </View>
                  )
                }
            }}
       />
       <Tab.Screen
            name={screenNames.search}
            component={Search}
            options={{
                tabBarStyle: { display: "none" },
                tabBarIcon : ({focused}) => {
                  return (
                    <View>
                        <Octicons
                                name={"search"}
                                size={focused ? 28 : 24}
                                color={focused ? GlobalConfig.primaryButtonColor : GlobalConfig.secondaryColor}
                                />
                    </View>
                  )
                }
            }}
       />
       <Tab.Screen
            name={screenNames.wishList}
            component={WishList}
            options={{
                tabBarStyle: { display: "none" },
                tabBarIcon : ({focused}) => {
                  return (
                    <View>
                        <Octicons
                                name={"heart"}
                                size={focused ? 28 : 24}
                                color={focused ? GlobalConfig.primaryButtonColor : GlobalConfig.secondaryColor}
                                />
                    </View>
                  )
                }
            }}
       />
       <Tab.Screen
            name={screenNames.cart}
            component={Cart}
            options={{
                tabBarStyle: { display: "none" },
                tabBarIcon : ({focused}) => {
                  return (
                    <View>
                      <Feather
                              name={"shopping-bag"}
                              size={focused ? 28 : 24}
                              color={focused ? GlobalConfig.primaryButtonColor : GlobalConfig.secondaryColor}
                              />
                    </View>
                    )
                  }
            }}
       />
    </Tab.Navigator>
  )
}

export default BottomNavigator