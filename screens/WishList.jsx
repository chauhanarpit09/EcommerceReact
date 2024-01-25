import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { screenNames } from '../constants/screenName';
import { GlobalConfig } from '../constants/globalConfig';
import { EmptyLayout, Toolbar } from '../components';
import commonStyles from './common.style';
import { Entypo, Feather, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const WishList = () => {
  const navigation = useNavigation();
  const data = ["as"]
  
  const renderSwiperItem = ({item}) => (
    <TouchableOpacity key={item} style={{marginHorizontal : 8}}>
      <View style={styles.slide}>
        <Image source={require('../assets/Images/abcd.png')} style={styles.image} />
        <LinearGradient
          colors={[GlobalConfig.tertiaryButtonColor + '00', GlobalConfig.tertiaryButtonColor + "40"]}
          style={styles.gradient}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.brandName, styles.brandNameinSLider]}>Maybelline Newyork</Text>
          <Text style={[styles.discountedPrice, styles.discountedPriceInSLider]}>Rs. 999</Text>
          <Text style={styles.actualPrice}>Rs 10000</Text> 
          <Text style={[styles.discountInfo, styles.discountInfoinSlider]}>60% off</Text>
          {/* <Text style={styles.buyNowButtonInSlider}>Grab the offer now!</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  )
  

  const renderWishLitItem = ({ item }) => (
    <TouchableOpacity style={styles.gridItem}>
      <View style={styles.gridItemtopContainer}>
        <View style={styles.gridItemImageContainer}>
          <Image source={require('../assets/Images/abcd.png')} style={styles.productImage}/>
        </View>
        <View style={styles.offerContainer}>
          <Text style={styles.discountInfo}>60% off</Text>
        </View>
        <View style={styles.removeWishlistButtonContainer}>
          <TouchableOpacity>
            <Entypo name="cross" size={28} color={GlobalConfig.primaryColor} style={styles.removeWishlistButton}/>
          </TouchableOpacity>
        </View>
        <View style={styles.ratingContainer}>
          <View style={{flex: 1, flexDirection:"row"}}>
            <View style={styles.actualRatingContainer}>
              <Text style={styles.ratingText}>4.6</Text>
              <MaterialIcons name="star-half" size={16} color={GlobalConfig.tertiaryButtonColor} style={styles.ratingStar}/>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.ratingUserContainer}>
              <Text style={styles.ratingUserContainerText}>1k</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.brandName}>Maybelline Newyork</Text>
          <View style={styles.priceInformationContainer}>
            <Text style={styles.discountedPrice}>Rs. 999</Text>
            <Text style={styles.actualPrice}>Rs 10000</Text> 
          </View>
          <Text style={styles.extraHeading}>Only few left</Text>
        </View>
        <TouchableOpacity onPress={()=>{}} style={styles.moveToBagContainer}>
            <Text style={styles.moveToBagContainerText}>Move To Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>{}} style={styles.buyNowContainer}>
            <Text style={styles.buyNowContainerText}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView  style={[commonStyles.commonMainContainer, { paddingHorizontal: 0}]}>
      {/******************************************* TOOLBAR **************************************************/}
      <View style={{ paddingTop: GlobalConfig.paddingTop, backgroundColor: GlobalConfig.secondaryBackgroundColor }}>
        <Toolbar
          leftIconName="arrow-back-ios"
          leftIconPress={() => {
            navigation.goBack();
          }}
          toolbarText="Wishlist" showDivider={false} horizontalPadding={4}>
          <View style={commonStyles.toolbaractionbuttons}>
            <TouchableOpacity onPress={() => { navigation.navigate(screenNames.search) }} style={commonStyles.actionButtons}>
              <Octicons name="search" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate(screenNames.cart) }} style={commonStyles.actionButtons}>
              <Feather name="shopping-bag" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
          </View>
        </Toolbar>
      </View>
      {/******************************************* All Other Items Items **************************************************/}
      
      {(data && data.length > 0)
          ? 
            <FlatList
              data={[{ type: 'swiper', data: data }, { type: 'wishlist', data }, {type:"other", data : []}]}
              keyExtractor={(item, index) => item.type}
              nestedScrollEnabled={true} 
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                if (item.type === 'swiper') {
                  return (
                      <View style={styles.swiperContainer}>
                        <View style={commonStyles.headingContainer}>
                          <Text style={commonStyles.textForOfferSlider}>Wishful Discounts Await</Text>
                          <View style={commonStyles.line}></View>
                        </View>
                        <FlatList
                          data={item.data}
                          nestedScrollEnabled={true}
                          horizontal={true}
                          contentContainerStyle = {styles.wrapperHorizontal}
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={renderSwiperItem}
                        />
                      </View>
                  );
                } else if (item.type === 'wishlist') {
                  return (
                    <View style={styles.wishlistContainer}>
                      <View style={commonStyles.headingContainer}>
                        <Text style={commonStyles.textForOfferSlider}>Shop Your Dreams</Text>
                        <View style={commonStyles.line}></View>
                      </View>
                      <FlatList
                        data={item.data}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        contentContainerStyle={commonStyles.gridContainer}
                        renderItem={renderWishLitItem}
                      />
                    </View>
                  );
                } else if(item.type === "other"){
                  return (
                    <View style={styles.endOfWishlist}>
                      <Text style={styles.exploreText}>Explore</Text>
                      <Text style={styles.treasureText}>more treasures!</Text>
                      <View style={{flexDirection : "row", alignItems : 'center'}}>
                        <Text style={styles.wishingText}>Keep Wishing </Text>
                        <Octicons name="heart-fill" size={20} color="#FF0000A0" style={styles.lastIconStyle}/>
                        <Text style={styles.wishingText}> and shopping </Text>
                        <Feather name="shopping-bag" size={20} color={GlobalConfig.secondaryColor} style={styles.lastIconStyle}/>
                      </View>
                    </View>
                  )
                }
              }}
            />
          : (
            <EmptyLayout
              imageUrl={require("../assets/Images/emptyWishlist.png")}
              text="Empty Wishlist"
              secondaryText="Oops! Your wishlist is empty. Time to fill it with favorites. Happy shopping"
              buttonText="Add Products"
              onButtonPress={() => {}}
            />
          )}

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  swiperContainer : {
    paddingVertical : 8,
    marginHorizontal : 8
  },
  wrapperHorizontal : {
    height : 200
  },
  slide: {
    borderRadius : 16,
    flex: 1,
    width : GlobalConfig.screenWidth - "32"
  },
  image: {
    borderRadius : 16,
    flex : 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity : 0.6
  },
  gradient: {
    borderRadius : 16,
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer : {
    flex : 1,
    borderRadius : 16,
  },
  textContainer : {
    position : 'absolute',
    top : 16,
    left : 16,
    width : '100%',
    height : '100%',
  },
  gridItem: {
    marginVertical: 12,
    marginHorizontal: 2,
    borderRadius: 6,
    height: 380,
    borderColor: "#E8E8E8",
    backgroundColor : GlobalConfig.secondaryBackgroundColor,
    borderWidth: 1,
    flexBasis: '48%',
  },
  gridItemtopContainer : {
    height : 240,
    width : "100%",
    position : "relative",
  },
  gridItemImageContainer : {
    height : "100%",
    width : "100%",
  },
  offerContainer : {
    position : "absolute",
    top : 0,
    left : 0,
    paddingVertical : 8,
    borderBottomRightRadius : 16,
    paddingHorizontal : 8,
    backgroundColor : GlobalConfig.secondaryButtonColor

  },
  removeWishlistButtonContainer : {
    position : "absolute",
    backgroundColor : "#FFFFFF",
    top : -12,
    right : 0,
    opacity : 0.9,
    borderRadius : 16
  },
  removeWishlistButton : {
    opacity : 0.6,
  },
  ratingContainer : {
    backgroundColor : "#FFFFFF",
    position : "absolute",
    padding : 4,
    borderRadius : 8,
    bottom : 12,
    left : 12,
  },
  actualRatingContainer : {
    flexDirection : "row",
    alignItems : "center",
  },
  ratingText : {
    fontFamily : GlobalConfig.fontSemiBold,
    fontSize : 12,
    paddingLeft : 2
  },
  ratingStar : {
    paddingLeft : 2
  },
  verticalLine : {
    width : 0.8,
    marginHorizontal : 4,
    opacity : 0.6,
    backgroundColor : GlobalConfig.secondaryColor,
    heght : "100%"
  },
  ratingUserContainer : {
    paddingHorizontal : 4,
    alignItems : "center",
    justifyContent : "center",
  },
  ratingUserContainerText : {
    fontFamily : GlobalConfig.fontSemiBold,
    fontSize : 12,
  },
  productImage : {
    width : "100%",
    height : "100%",
    resizeMode : "cover"
  },
  moveToBagContainer : {
    padding : 8,
    width : "100%",
    alignItems : 'center',
    borderWidth : 1,
    borderColor : "#E8E8E8"
  },
  moveToBagContainerText : {
    fontFamily : GlobalConfig.fontSemiBold
  , color : GlobalConfig.secondaryButtonColor
  },
  buyNowContainer : {
    padding : 8,
    width : "100%",
    alignItems : 'center',
    borderWidth : 1,
    borderColor : "#E8E8E8",
    backgroundColor : GlobalConfig.secondaryButtonColor
  },
  buyNowContainerText : {
    fontFamily : GlobalConfig.fontSemiBold
  , color : "#FFFFFF"
  },
  productInfoContainer : {
    padding : 8
  },
  brandNameinSLider : {
    fontSize : 28,
    color : GlobalConfig.primaryColor
  },
  brandName : {
    fontFamily : GlobalConfig.fontLight,
    letterSpacing : 1.0,
    paddingVertical : 2.0,
    color : GlobalConfig.primaryColor
  },
  extraHeading : {
    paddingVertical : 2.0,
    color : GlobalConfig.tertiaryButtonColor,
    fontFamily : GlobalConfig.fontSemiBold
  },
  priceInformationContainer : {
    flexDirection : "row",
  },
  discountInfoinSlider : {
    bottom : 24,
    right : 24,
    position : "absolute",
    fontSize : 36,
    fontFamily : GlobalConfig.fontBold,
    color : GlobalConfig.secondaryButtonColor
  },
  discountedPriceInSLider : {
    fontSize : 24,
    color : GlobalConfig.primaryColor
  },
  discountedPrice : {
    fontFamily : GlobalConfig.fontSemiBold,
    paddingRight : 4
  },
  actualPrice : {
    fontFamily : GlobalConfig.fontRegular,
    paddingRight : 4,
    color : GlobalConfig.primaryColor+"A1",
    textDecorationLine : 'line-through'
  },
  discountInfo : {
    fontFamily : GlobalConfig.fontRegular,
    paddingRight : 4,
    color : "#FFFFFF"
  },
  
  wishlistContainer : {
    paddingTop : 16,
    paddingHorizontal : 8
  },
  endOfWishlist : {
    paddingHorizontal : 8,
    paddingVertical : 36
  },
  exploreText : {
    fontFamily : GlobalConfig.fontMedium,
    color : GlobalConfig.secondaryColor+"40",
    fontSize : 56,
  }, 
  treasureText : {
    fontFamily : GlobalConfig.fontMedium,
    color : GlobalConfig.secondaryColor+"40",
    fontSize : 48,
    lineHeight : 50
  },
  wishingText : {
    fontFamily : GlobalConfig.fontLight,
    color : GlobalConfig.secondaryColor,
    opacity : 0.7,
    fontSize : 20,
    lineHeight : 38
  },
  lastIconStyle : {
    opacity : 0.7,
  },
});

export default WishList;