import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView} from 'react-native';
import { GlobalConfig } from '../constants/globalConfig';
import { Entypo, MaterialIcons, Octicons } from '@expo/vector-icons';

const ProductBox = ({item, crossFunction, showMoveToBagButton, showBuyNowButton, likeFunction, onPressed}) => {
  return (
    <TouchableOpacity  onPress={()=>{onPressed()}} style={styles.gridItem}>
        <View style={styles.gridItemtopContainer}>
            <View style={styles.gridItemImageContainer}>
                <Image source={{ uri : item.images[0]}} style={styles.productImage}/>
            </View>
            {item.discountPercent &&
                <View style={styles.offerContainer}>
                    <Text style={styles.discountInfo}>{item.discountPercent} off</Text>
                </View>
            }
            {crossFunction &&
                <TouchableOpacity onPress={()=>{crossFunction}} style={styles.removeWishlistButtonContainer}>
                    <Entypo name="cross" size={28} color={GlobalConfig.primaryColor} style={styles.removeWishlistButton}/>
                </TouchableOpacity>
            }
            {likeFunction && 
                <TouchableOpacity onPress={()=>{likeFunction}} style={styles.likeButtonCOntainer}>
                    <Octicons name="heart-fill" size={20} color="#FF0000" style={styles.likeButton}/>
                </TouchableOpacity>
            }
            {item.rating &&
                <View style={styles.ratingContainer}>
                    <View style={{flex: 1, flexDirection:"row"}}>
                        <View style={styles.actualRatingContainer}>
                            <Text style={styles.ratingText}>{item.rating}</Text>
                            <MaterialIcons name="star-half" size={16} color={GlobalConfig.tertiaryButtonColor} style={styles.ratingStar}/>
                        </View>
                            <View style={styles.verticalLine}></View>
                            <View style={styles.ratingUserContainer}>
                            <Text style={styles.ratingUserContainerText}>{item.ratingUser}</Text>
                        </View>
                    </View>
                </View>
            }
        </View>
        <View>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productName}>{item.name + (item.vendorName ? (" | " + item.vendorName) : "")}</Text>
              <Text style={styles.productDesc}>{item.shortDescription}</Text>
            <View style={styles.priceInformationContainer}>
                <Text style={styles.discountedPrice}>Rs {item.discountPercent ? (item.price-item.price*(item.discountPercent/100)) : item.price}</Text>
                {item.discountPercent && <Text style={styles.actualPrice}>Rs {item.price}</Text> }
            </View>
            {item.extraHeading && <Text style={styles.extraHeading}>{item.extraHeading}</Text>}
            </View>
            {showMoveToBagButton &&
                <TouchableOpacity onPress={()=>{}} style={styles.moveToBagContainer}>
                    <Text style={styles.moveToBagContainerText}>Move To Bag</Text>
                </TouchableOpacity>
            }
            {showBuyNowButton &&
                <TouchableOpacity  onPress={()=>{}} style={styles.buyNowContainer}>
                    <Text style={styles.buyNowContainerText}>Buy now</Text>
                </TouchableOpacity>
            }
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flexWrap : "wrap",
    borderColor: "#E8E8E8A0",
    backgroundColor : GlobalConfig.secondaryBackgroundColor,
    flexBasis: '50%',
    borderWidth : 1
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
  likeButtonCOntainer : {
    position : "absolute",
    backgroundColor : "#FFFFFF",
    top : 2,
    right : 8,
    opacity : 0.9,
    borderRadius : 16,
    borderWidth : 1,
    borderColor : "#EDEDED",
    padding : 4
  },
  likeButton : {
    opacity : 0.8
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
    resizeMode : "cover",
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
  productName : {
    fontFamily : GlobalConfig.fontSemiBold,
    letterSpacing : 1.0,
    paddingVertical : 2.0,
    color : GlobalConfig.primaryColor
  },
  productDesc : {
    fontFamily : GlobalConfig.fontRegular,
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
})

export default ProductBox