import { Dimensions, View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React , {useCallback, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../constants/screenName';
import commonStyles from './common.style';
import { AddSub, ImageCarousel, LoginPopUp, Rating, Toolbar } from '../components';
import { GlobalConfig } from '../constants/globalConfig';
import * as Animatable from 'react-native-animatable';
import { Feather, Octicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProduct, selectSessionToken} from '../selector';
import { setAllProduct } from '../redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ProductView = ({ route }) => {

  //USENAVIGATION
  const navigation = useNavigation();

  // USEDISPATCH
  const dispatch = useDispatch();

  //USESELECTOR
  let allProducts = useSelector(selectAllProduct);
  const sessionToken = useSelector(selectSessionToken)

  //USESTATE
  const [showLoginPopup,setShowLoginPopup] = useState(false);
  const [item, setItem] = useState(allProducts.find((pitem)=> pitem.id === route.params?.item.id));

  useEffect(() => {
    let currItem = allProducts.find((pitem)=> pitem.id === route.params?.item.id);
    setItem(currItem)
    console.log("allProducts", allProducts);
    console.log("here==>", currItem);
    console.log("route", route.params?.item)
  }, [allProducts, route.params?.item]);

  // HELPER_FUNCTIONS
  const onLikeProduct = useCallback(() => {
    setItem({ ...item, isInWishlist: !item.isInWishlist });
  }, [dispatch, item]);

  const onAddtoCart = useCallback(() => {
    if(sessionToken) {
      setItem({ ...item, cartQuantity: 1 });
    } else {
      setShowLoginPopup(true)
    }
  }, [dispatch, item]);

  const handleNavigation = (navigateTo) => {
    dispatch(setAllProduct([item]));
    navigateTo;
  }

  return (
    <SafeAreaView style={commonStyles.commonMainContainer}>
      {/* TOOLBAR */}
      <View style={{ paddingTop: GlobalConfig.paddingTop, backgroundColor: GlobalConfig.secondaryBackgroundColor }}>
        <Toolbar
          leftIconName="arrow-back-ios"
          leftIconPress={() => {
            handleNavigation(navigation.goBack());
          }}
          toolbarText="" showDivider={false} horizontalPadding={4}>
          <View style={commonStyles.toolbaractionbuttons}>
            <TouchableOpacity onPress={() => { handleNavigation(navigation.navigate(screenNames.search)) }} style={commonStyles.actionButtons}>
              <Octicons name="search" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { handleNavigation(navigation.navigate(screenNames.cart)) }} style={commonStyles.actionButtons}>
              <Feather name="shopping-bag" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
          </View>
        </Toolbar>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Image Container */}
        
          <View style={styles.imageContainer}>
            {item?.images && <ImageCarousel productImages={item.images} /> }
          </View>

        {/* Other Scrollable Content */}
        <View style={styles.otherContentContainer}>
            <View style={styles.productInfoView}>
                <View>
                    <Text style={styles.ItemName}>{item.name}</Text>
                    <Rating rating={4.9}/>
                </View>
                <View style={{alignItems : 'flex-end'}}>
                <Text style={styles.actualPriceText}>{item.discountedPrice ? item.discountedPrice : item.price}</Text>
                {item.discountedPrice  && <Text style={styles.cuttedPriceText}>{item.price}</Text>}
                </View>
            </View>
        </View>
      </ScrollView>

      {/* Buttons and Wishlist */}
      <View style={styles.buttons}>
        {(!item.cartQuantity || item.cartQuantity == 0) && (
          <TouchableOpacity onPress={() => onAddtoCart()} style={styles.addToBagContainer}>
            <Animatable.View animation="tada" easing="ease-out" iterationCount={1} style={styles.addToBag}>
              <Feather name="shopping-bag" size={24} color={GlobalConfig.primaryButtonColor} />
              <Text style={{ paddingHorizontal: 4, fontFamily: GlobalConfig.fontMedium, color: GlobalConfig.primaryButtonColor }}>
                Add to Bag
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        )}
        {item.cartQuantity && item.cartQuantity != 0 && (
          <AddSub item={item}/>
        )}
        <TouchableOpacity onPress={() => onAddtoCart()} style={styles.buyNowButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* OtherAbsoluteButtons Button */}
      <View style={styles.OtherAbsoluteButtons}>
        <View>
            <TouchableOpacity onPress={() => onLikeProduct()} style={styles.wishlistButton}>
            {item.likedProduct && (
                <Animatable.View animation="tada" easing="ease-out" iterationCount={1}>
                    <Octicons name="heart-fill" size={24} color="#F84e4f" />
                </Animatable.View>
            )}
            {!item.likedProduct && (
                <View style={{ flexDirection: 'row' }}>
                    <Octicons name="heart" size={24} color={GlobalConfig.tertiaryButtonColor} />
                </View>
            )}
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => {}} style={styles.shareButton}>
                <Octicons name="share-android" size={24} color={GlobalConfig.primaryColor+"A0"} />
            </TouchableOpacity>
        </View>
      </View>
{/******************************************* LOGIN POPUP **************************************************/} 
      <LoginPopUp 
        showLoginPopup={showLoginPopup}
        setShowLoginPopup={setShowLoginPopup}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    height: SCREEN_HEIGHT / 2.5,
    width: SCREEN_WIDTH,
  },
  otherContentContainer: {
    backgroundColor: GlobalConfig.secondaryBackgroundColor,
    minHeight: SCREEN_HEIGHT / 1.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -16,
    paddingVertical: 16,
    paddingHorizontal: GlobalConfig.paddingHorizontal,
  },
  productInfoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wishlistButton: {
    paddingVertical : 8
  },
  shareButton : {
    paddingVertical : 8
  },
  OtherAbsoluteButtons: {
    position: 'absolute',
    top: 130,
    right: 20,
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: GlobalConfig.paddingHorizontal,
    color: 'black',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor : GlobalConfig.secondaryBackgroundColor
  },
  addToBagContainer: {
    borderRadius: 8,
    borderColor: GlobalConfig.primaryButtonColor,
    borderWidth: 2,
    padding: 8,
    marginHorizontal: 8,
  },
  addToBag: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buyNowButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: GlobalConfig.primaryButtonColor,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buyButtonText : {
    color: GlobalConfig.primaryButtonTextColor,
    fontFamily: GlobalConfig.fontSemiBold,
    fontSize: 18,
  },
  ItemName : {
    fontFamily: GlobalConfig.fontBold
  , fontSize: GlobalConfig.headingTextSize
  , color : GlobalConfig.primaryColor
  },
  actualPriceText : {
    color : GlobalConfig.tertiaryButtonColor
  , fontFamily : GlobalConfig.fontBold
  , fontSize : 20
  }, 
  cuttedPriceText : {
    color : GlobalConfig.disabledColor
  , textDecorationLine : 'line-through'
  , fontFamily : GlobalConfig.fontMedium
  , fontSize : 16
  }
});

export default ProductView;
