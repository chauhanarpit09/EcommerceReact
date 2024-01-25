import { StyleSheet } from "react-native";
import { GlobalConfig } from "../constants/globalConfig";

const styles = StyleSheet.create({
    rowContainer : {
      backgroundColor : GlobalConfig.secondaryBackgroundColor
    , marginVertical : 4
    , padding : 16
    },
    products : {
      paddingVertical : 20
    },
    text : {
      fontFamily : GlobalConfig.fontBold
    , fontSize : GlobalConfig.headingTextSize-4
    , color : GlobalConfig.primaryColor
    },
    cardContainer : {
      position : 'relative'
    },
    card : {
      paddingHorizontal : 20
    , paddingVertical : 20
    , justifyContent : "space-evenly"
    , marginHorizontal : 8
    , borderRadius : GlobalConfig.borderRadius
    , borderWidth : 1
    , borderColor : "#CFCFCF"
    , overflow : "hidden"
    },
    heart : {
      position : 'absolute'
    , top : 15
    , right : 25
    , zIndex : 1
    },
    cardText : {
      fontFamily : GlobalConfig.fontSemiBold
    , fontSize : 16
    , color : GlobalConfig.primaryColor
    },
    priceContainer : {
      flexDirection : 'row'
    , paddingVertical : 2
    },
    popularPrice : {
      paddingRight : 4
    , fontFamily : GlobalConfig.fontMedium
    },
    discountedPrice : {
      color : GlobalConfig.disabledColor
    , textDecorationLine : 'line-through'
    , fontFamily : GlobalConfig.fontMedium
    },
    cardImageContainer : {
      flex : 1
    , justifyContent : 'center'
    , alignItems : 'center'
    },
})

export default styles;