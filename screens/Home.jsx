import { View, Animated, Text, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserName, selectUserImage, selectProductCategories, selectPopularProduct, selectSessionToken } from '../selector'
import { AntDesign, Entypo, Feather, Octicons } from '@expo/vector-icons';
import { GlobalConfig } from '../constants/globalConfig';
import commonStyles from './common.style';
import { setPopularProduct } from '../redux';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../constants/screenName';
import { FlatListRowView, LoginPopUp, Toolbar } from '../components';

const Home = () => {
  //USE_STATE
  const [showLoginPopup,setShowLoginPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //NAVIGATION
  const navigation = useNavigation();

  // REDUX
  const userName = useSelector(selectUserName)
  const userImage = useSelector(selectUserImage)
  const sessionToken = useSelector(selectSessionToken);
  const productCategories = useSelector(selectProductCategories);
  const popularProduct = useSelector(selectPopularProduct)
  
  
  // HELPER FUNTIONS
  const handleActionButtons = (nextScreenName) => {
    sessionToken
      ? navigation.navigate(nextScreenName)
      : setShowLoginPopup(true);
  }

  return (
    <SafeAreaView style={[commonStyles.commonMainContainer, {paddingHorizontal: 0}]}>

{/******************************************* TOOLBAR **************************************************/} 
    <View style={{paddingTop : GlobalConfig.paddingTop, backgroundColor : GlobalConfig.secondaryBackgroundColor}}>
        <Toolbar toolbarText="Shivatattva" showDivider={false} horizontalPadding={12}> 
          <View style={styles.toolbaractionbuttons}>
            <TouchableOpacity onPress={() => {handleActionButtons(screenNames.wishList)}} style={styles.actionButtons}>
              <Octicons name="heart" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleActionButtons(screenNames.cart)}} style={styles.actionButtons}>
              <Feather name="shopping-bag" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
            {sessionToken
              ? (
                <TouchableOpacity onPress={() => {handleActionButtons(screenNames.profile)}} style={styles.actionButtons}>
                    <Octicons name="person" size={24} color={GlobalConfig.primaryButtonColor}/>
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity onPress={() => {navigation.navigate(screenNames.login)}} style={styles.actionButtons}>
                    <AntDesign name="login" size={24} color={GlobalConfig.primaryButtonColor}/>
                </TouchableOpacity>
              )
              }
          </View>
        </Toolbar>
    </View>
{/******************************************* SCROLL VIEW **************************************************/} 
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[1]}
      stickyHeaderHiddenOnScroll={true}
      decelerationRate="fast"
      onScroll={()=>{

      }}
    >
{/******************************************* Name **************************************************/}

      <View style={{backgroundColor : GlobalConfig.secondaryBackgroundColor}}>
        <View style={styles.welcomContainer}>
          <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => {sessionToken ? navigation.navigate(screenNames.profile) : "";}} style={styles.actionButtons}>
            {userImage 
            ? <Image source={{uri : userImage}} style={styles.profileImage}/>
              : <View style={styles.profileImage}>
                  <Octicons name="person" size={28} color={GlobalConfig.secondaryButtonColor}/>
                </View>
            }
          </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            {userName
              ? <Text style={styles.nameText}>Hi, {userName}</Text>
              : <Text style={[styles.nameText, {fontSize : 22}]}>Welcome Shopper!</Text>
            }
            {sessionToken && <Text style={styles.helloText}>Discover, shop, and enjoy</Text>}
            {!sessionToken &&
              <Text style={[styles.helloText, { marginRight : 20}]}>Sign up to unlock personalized shopping.</Text>
            }
          </View>
        </View>
      </View>
{/******************************************* Sticky Part **************************************************/}
      <View>
{/******************************************* Search **************************************************/}
        <View style={styles.searchContainer}>
            <TouchableOpacity onPress={()=>{navigation.navigate(screenNames.search)}}>
                <View style={commonStyles.searchButtonContainer}>
                  <Octicons name="search" size={20} color={GlobalConfig.secondaryColor+"A0"} />
                  <Text style={commonStyles.searchPlaceHolder}>Search your lovable products ...</Text>
                </View>
            </TouchableOpacity>
        </View>
{/******************************************* Categories **************************************************/}
        <View style={styles.productCategories}>
          <FlatList 
            data={productCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => {
                  selectedCategory == item.id ? setSelectedCategory(null) :setSelectedCategory(item.id)
                  }} 
                  style={[styles.categoryCard, selectedCategory == item.id ? styles.selectedCard : {}]}>
                <Text style={[styles.productCategoriesText, {color : selectedCategory == item.id ? "#FFFFFF" : GlobalConfig.primaryColor}]}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
{/******************************************* Popular Section **************************************************/}
        
      {popularProduct.length > 0 &&
        <FlatListRowView 
          heading="Popular Products"
          productArray={popularProduct}
          showLike={true}
          setProduct={setPopularProduct}
          goToScreeen={screenNames.productView}
        />
      }
    </ScrollView>
{/******************************************* LOGIN POPUP **************************************************/} 
    {/* <View>
      <Modal
        visible={showLoginPopup}
        animationType='slide'
        transparent={true}
        onRequestClose={()=>{
          setShowLoginPopup(false);
        }}
      >
      <View style={styles.centeredModalView}>
        <View style={styles.modalContainer}>
          <View style={styles.modalToolbarContainer}>
              <Text style={styles.loginTextInModal}>Login Account</Text>
              <TouchableOpacity onPress={()=>{setShowLoginPopup(false);}}>
                <Entypo name="cross" size={24} color={GlobalConfig.secondaryButtonColor} style={styles.modalCross}/>
              </TouchableOpacity>
          </View>
          <View style={styles.modalBodyContainer}>
            <View>
              <Image source={require('../assets/Images/Wave.png')} style={styles.modalImage}/>
            </View>
            <View>
              <Text style={styles.modalBodyMainText}>Unlock the full experience by signing in first</Text>
              <Text style={styles.modalBodySecText}>Begin your journey with us, log in or register to get started</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={()=>{
                setShowLoginPopup(false);
                navigation.navigate(screenNames.login);
              }} style={styles.modalButtonContainer}>
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Modal>
    </View> */}
    <LoginPopUp 
      showLoginPopup={showLoginPopup}
      setShowLoginPopup={setShowLoginPopup}
      />
    </SafeAreaView>
  )
}




const styles = StyleSheet.create({
  toolbaractionbuttons: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
  },
  actionButtons: {
    paddingHorizontal: 8,
  },
  welcomContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    backgroundColor: GlobalConfig.secondaryBackgroundColor,
    paddingHorizontal: GlobalConfig.paddingHorizontal,
    width : GlobalConfig.screenWidth*0.9
  },
  imageContainer: {
    backgroundColor: GlobalConfig.tertiaryButtonColor + "40",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  nameContainer: {
    justifyContent: "space-between",
    backgroundColor: GlobalConfig.secondaryBackgroundColor,
    paddingLeft: GlobalConfig.paddingHorizontal,
    paddingTop: 4,
    paddingBottom: 24,
  },
  helloText: {
    fontFamily: GlobalConfig.fontSemiBold,
    fontSize: 16,
    color: GlobalConfig.secondaryColor,
  },
  nameText: {
    fontFamily: GlobalConfig.fontBold,
    fontSize: 28,
    letterSpacing: 1.2,
    color: GlobalConfig.primaryColor,
    lineHeight: 44,
  },
  profileViewContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GlobalConfig.secondaryButtonColor + "20",
    borderColor: GlobalConfig.secondaryButtonColor,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
  },
  productCategories: {
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: GlobalConfig.paddingHorizontal,
    backgroundColor: GlobalConfig.secondaryBackgroundColor,
  },
  categoryCard: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 48,
    marginRight: 12,
    borderRadius: GlobalConfig.borderRadius,
    borderWidth: 1,
    borderColor: "#CFCFCFA0",
  },
  searchContainer: {
    paddingHorizontal: GlobalConfig.paddingHorizontal,
    backgroundColor: GlobalConfig.secondaryBackgroundColor,
    paddingBottom: GlobalConfig.paddingHorizontal,
  },
  selectedCard: {
    backgroundColor: GlobalConfig.tertiaryButtonColor,
  },
  productCategoriesText: {
    fontFamily: GlobalConfig.fontSemiBold,
    letterSpacing: 1,
    fontSize: 16,
  },
  productCategoriesImage: {
    width: "50%",
    height: "100%",
    resizeMode: "contain",
  },
  popularProducts: {
    paddingVertical: 20,
  },
  popularText: {
    fontFamily: GlobalConfig.fontBold,
    fontSize: GlobalConfig.headingTextSize,
    color: GlobalConfig.primaryColor,
  },
  popularCardContainer: {
    position: "relative",
  },
  popularCard: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-evenly",
    width: 180,
    height: 250,
    marginHorizontal: 8,
    borderRadius: GlobalConfig.borderRadius,
    borderWidth: 1,
    borderColor: "#CFCFCF",
  },
  heart: {
    position: "absolute",
    top: 15,
    right: 25,
    zIndex: 1,
  },
  popularCardText: {
    fontFamily: GlobalConfig.fontSemiBold,
    fontSize: 16,
    color: GlobalConfig.primaryColor,
  },
  priceContainer: {
    flexDirection: "row",
    fontSize: 14,
  },
  popularPrice: {
    paddingRight: 4,
  },
  discountedPrice: {
    color: GlobalConfig.disabledColor,
    textDecorationLine: "line-through",
  },
  popularCardImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popularCardImage: {
    width: 140,
    height: 140,
  },
});

export default Home

{/* <View style={styles.modalButtonContaainer modalImage}>
            <TouchableOpacity onPress={()=>{}} style={styles.modalButtonContaainer}>
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
          </View> */}