import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AddSub, Divider, EmptyLayout, LoginPopUp, Toolbar } from '../components'
import commonStyles from './common.style'
import {Feather, MaterialIcons, Octicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { GlobalConfig } from '../constants/globalConfig'
import {selectAllProduct, selectCallCart, selectSessionToken } from '../selector'
import { useSelector, useDispatch } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import { setAllProduct, setCallCart, setCartItems } from '../redux'
import { screenNames } from '../constants/screenName'
import { deleteAllItemFromCart, deleteItemFromCart, getCartDetail } from '../constants/apiConfigs'
const Cart = () => {
  //USE_NAVOGATION
  const navigation = useNavigation();

  //USESELECTOR
  const sessionToken = useSelector(selectSessionToken)
  const allProducts = useSelector(selectAllProduct);
  const callCart = useSelector(selectCallCart);

  //USEDISPATCH
  const dispatch = useDispatch();

  //STATE
  const [cartItems, setCartItems] = useState([]);
  const [showLoginPopup,setShowLoginPopup] = useState(sessionToken ? false : true);

  const selecteDeselectProduct = (item) => {
    setCartItems(cartItems.map((pItem) => pItem.id === item.id ? {...pItem, isSelected: !item.isSelected} : {...pItem})); 
  }

  const deelteItem = async (item) => {
    console.log("ITEM=====>", item);
    const response = await deleteItemFromCart(sessionToken, item);
    if(response.status) {
      console.log("DELETED One")
      setCartItems(cartItems.filter((pItem) => pItem.id !== item.id)) 
    } else {
      //handeError Here
    }
  }

  const moveToWishlist = (item) => {
    setCartItems(cartItems.map((pItem) => pItem.id === item.id ? {...pItem, isInWishlist : true} : {...pItem})); 
  }

  const clearCart = async () => { 
    const response = await deleteAllItemFromCart(sessionToken); //showPopUp
    if(response.status) {
      setCartItems([]);
      console.log("DELETED")
    } else {
      //handeError Here
    }
  }

  const handleNavigation = (navigateTo) => {
    console.log("navigateTo: ");
    dispatch(setAllProduct(cartItems));
    navigateTo;
  }

  useEffect(() => {
    setCartItems(allProducts.filter((pItem) => pItem.cartQuantity && pItem.cartQuantity > 0));
  }, [allProducts]);



  useEffect(()=>{
    const fetchData = async () => {
      const response = await getCartDetail(sessionToken);
      if(response.status) {
        dispatch(setCallCart(false))
        dispatch(setAllProduct(response.payload.productsInCart));
      } else {
        console.log("repsonsoneneor", response);
        console.log(response);
      }
    }
  if(callCart && sessionToken)
    fetchData();
  else if(!sessionToken)
    setShowLoginPopup(true)

  }, [sessionToken, callCart])


  return (
    <SafeAreaView style={[commonStyles.commonMainContainer, { paddingHorizontal: 0, backgroundColor : GlobalConfig.backgroundColor}]}>

{/******************************************* TOOLBAR **************************************************/} 
    <View style={{paddingTop : GlobalConfig.paddingTop, backgroundColor : GlobalConfig.secondaryBackgroundColor}}>
        <Toolbar 
            leftIconName="arrow-back-ios"
            leftIconPress={()=>{handleNavigation(navigation.goBack())}}
            toolbarText="Cart" showDivider={false} horizontalPadding={4}> 
          <View style={commonStyles.toolbaractionbuttons}>
            <TouchableOpacity onPress={() => {handleNavigation(navigation.navigate(screenNames.search))}} style={commonStyles.actionButtons}>
              <Octicons name="search" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleNavigation(navigation.navigate(screenNames.wishList))}} style={commonStyles.actionButtons}>
              <Feather name="heart" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
          </View>
        </Toolbar>
    </View>


{/**************************** CartList  *******************************/}

  { cartItems && cartItems.length > 0
    ? (
      <View style={{position: "relative", flex : 1}}>
        <FlatList
          data={[{ type: 'cartItems', data: cartItems }, { type: "cartText" }]}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => {
            if (item.type === "cartText") {
              return (
                <View style={styles.startOfCartContainer}>
                  <Text style={styles.sealTheDealCartText}>Seal the Deal!</Text>
                  <Text style={styles.bigText}>Your Cart Awaits Your Finishing Touch. Checkout Now!</Text>
                </View>
              )
            }
            else if (item.type === 'cartItems') {
              return (
                <FlatList 
                    data={item.data}
                    style={{paddingTop : 16, paddingBottom : 16}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                    <TouchableOpacity onPress={()=>{handleNavigation(navigation.navigate(screenNames.productView, {item}))}} style={{backgroundColor : GlobalConfig.secondaryBackgroundColor, marginVertical : 4, paddingHorizontal : 12, paddingVertical : 4}}>
                      <View style={styles.brandNameContainer}>
                        {item.isSelected &&
                          <Animatable.View animation="tada" easing="ease-out" iterationCount={1}>
                            <TouchableOpacity onPress={()=>{selecteDeselectProduct(item)}}>
                              <MaterialIcons name="check-box" size={28} style={styles.checkBox} color={GlobalConfig.secondaryButtonColor}/>
                            </TouchableOpacity>
                          </Animatable.View>
                        }
                        {!item.isSelected &&
                          <TouchableOpacity onPress={()=>{selecteDeselectProduct(item)}}>
                            <MaterialIcons name="check-box-outline-blank" size={28} style={styles.checkBox} color={GlobalConfig.secondaryButtonColor}/>
                          </TouchableOpacity>
                        }
                        <Text style={styles.brandNameText}>{item.vendorName}</Text>
                      </View>
                      <Divider marginHorizontal={4} dividerWidth={2}/>
                      <View style={styles.cartItemContainer}>
                        <View style={styles.leftContainer}>
                          <Image source={{uri: item.images[0]}} style={styles.image}/>
                          <AddSub item={item}/>
                        </View>
                        <View style={styles.rightContainer}>
                          <View style={{height : 104}}>
                            <Text style={[styles.name, styles.infoText]}>{item.name}</Text>
                            <Text style={[styles.desc, styles.infoText]}>{item.shortDescription}</Text>
                            <Text style={[styles.infoText, styles.price]}>Rs. {item.discountPercent ? item.price-item.price*item.discountPercent/100: item.price}</Text>
                            <Text style={{fontFamily : GlobalConfig.fontRegular, color : item.quantity > 0 ? "green" : GlobalConfig.errrorColor}}>{item.quantity > 0 ? "In Stock" : "Out of stock"}</Text>
                          </View>
                          <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={()=>{moveToWishlist(item)}} style={styles.button}>
                              <Text style={styles.buttonText}>Move to wishlist</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{deelteItem(item)}}style={styles.button}>
                              <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    
                  )}
                />
              );
            }
          }}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
  {/**************************** Pay Button  *******************************/}
        <View style={{position : 'absolute', bottom : 0}}>
          <Divider marginHorizontal={0}/>
          <View style={styles.subTotalContainer}>
            <View style={styles.subTotalTextContainer}>
                <Text tyle={{fontFamily : GlobalConfig.fontMedium, color : GlobalConfig.primaryButtonColor, fontSize : 16}}>Subtotal Price</Text>
                <Text style={styles.priceText}>Rs. {
                      cartItems.reduce((acc, item) =>
                        acc + item.cartQuantity * (item.discountPercent ? (item.price - (item.discountPercent/100 * item.price)) : item.price), 0)
                      }</Text>
            </View>
            <View style={styles.proceedToBuyButtonContainer}>
              <TouchableOpacity onPress={() => {handleNavigation(navigation.navigate(screenNames.checkout))}} style={styles.proccedToBuyButton}>
                <Text style={styles.proccedToPayButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.removeAllItemContrainer}>
              <TouchableOpacity onPress={()=>{clearCart()}}>
                  <MaterialIcons name="delete" size={28} color={GlobalConfig.primaryButtonColor}/>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
    : (
      <EmptyLayout
          imageUrl={require("../assets/Images/EmptyCart.png")}
          text="Empty Cart"
          secondaryText="Oops! Your cart's on a diet. Feed it with fabulous finds – start shopping now!"
          buttonText="Add Products"
          onButtonPress={() => {navigation.navigate(screenNames.home)}}
        />
    )
  }
  {/******************************************* LOGIN POPUP **************************************************/} 
      <LoginPopUp 
        showLoginPopup={showLoginPopup}
        setShowLoginPopup={setShowLoginPopup}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  leftContainer: {
    paddingRight: 12,
    minWidth: 120,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 88,
    marginBottom: 20,
  },
  checkBox: {
    paddingVertical: 12,
  },
  rightContainer: {
    flex: 1,
  },
  infoText: {
    paddingVertical: 2,
  },
  name: {
    fontFamily: GlobalConfig.fontSemiBold,
    fontSize: 16,
  },
  desc: {
    fontFamily: GlobalConfig.fontRegular,
    fontSize: 16,
  },
  price: {
    fontFamily: GlobalConfig.fontBold,
    fontSize: 18,
  },
  brandNameContainer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  brandNameText: {
    fontFamily: GlobalConfig.fontMedium,
    fontSize: 18,
    paddingHorizontal: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  button: {
    borderRadius: 12,
    backgroundColor: GlobalConfig.tertiaryButtonColor+"40",
    paddingHorizontal: 12,
    marginRight: 8,
    paddingVertical: 8,
  },
  buttonText: {
    fontFamily: GlobalConfig.fontMedium,
  },
  subTotalContainer: {
    paddingVertical: 12,
    backgroundColor: GlobalConfig.secondaryBackgroundColor,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  subTotalTextContainer: {
    padddingHorizontal: GlobalConfig.paddingHorizontal,
    alignItems: "center",
    justifyContent: "center",
  },
  subTotalText: {
    fontFamily: GlobalConfig.fontRegular,
    fontSize: 24,
  },
  priceText: {
    fontFamily: GlobalConfig.fontBold,
    fontSize: 24,
  },
  removeAllItemContrainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalConfig.primaryButtonColor + "20",
    padding: 8,
    borderRadius: 8,
  },
  proceedToBuyButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  proccedToBuyButton: {
    backgroundColor: GlobalConfig.primaryButtonColor,
    paddingVertical: 16,
    paddingHorizontal: 56,
    borderRadius: 8,
  },
  proccedToPayButtonText: {
    color: "#FFFFFF",
    fontFamily: GlobalConfig.fontSemiBold,
    fontSize: 18,
  },
  startOfCartContainer : {
    paddingHorizontal : 8,
    paddingVertical : 38,
    paddingBottom: 80
  },
  sealTheDealCartText : {
    fontFamily : GlobalConfig.fontMedium,
    color : GlobalConfig.secondaryColor,
    opacity : 0.4,
    fontSize : 48,
    paddingBottom : 8
  }, 
  bigText : {
    fontFamily : GlobalConfig.fontMedium,
    color : GlobalConfig.secondaryColor,
    opacity : 0.3,
    fontSize : 20
  },
});

export default Cart
