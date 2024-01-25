import { View, SafeAreaView, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native'
import React from 'react'
import { Divider, Toolbar } from '../components'
import commonStyles from './common.style'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserName, selectUserImage } from '../selector'
import { AntDesign, Feather, MaterialIcons, Octicons } from '@expo/vector-icons'
import { GlobalConfig } from '../constants/globalConfig'
import { screenNames } from '../constants/screenName'
import { clearAllProductInfo, clearAllUserInfo, setSessionToken, setUserName } from '../redux'

const Profile = () => {
  const navigation = useNavigation();
  const userImage = useSelector(selectUserImage)
  const userName = useSelector(selectUserName)
  const dispatch = useDispatch();

  const listOptions = [
    { id : "orders"
    , iconName : "box"
    , name : "Your Orders"
    , goTo : () => {navigation.navigate(screenNames.order)}
    }
  , { id : "cart"
    , iconName : "shopping-bag"
    , name : "Your Cart"
    , goTo : () => {navigation.navigate(screenNames.cart)}
    }
  , { id : "wishlist"
    , iconName : "heart"
    , name : "Your Wishlist"
    , goTo : () => {navigation.navigate(screenNames.wishList)}
    }
  , { id : "address"
    , iconName : "map-pin"
    , name : "Shipping Addresses"
    , goTo : () => {navigation.navigate(screenNames.address)}
    }
  , { id : "reviews"
    , iconName : "message-circle"
    , name : "Your Reviews"
    , goTo : () => {navigation.navigate(screenNames.reviews)}
    }
  , { id : "earn"
    , iconName : "dollar-sign"
    , name : "Earn & Reddem"
    , goTo : () => {navigation.navigate(screenNames.earn)}
    , isLast : true
    }
  // , { id : "help"
  //   , iconName : "help-circle"
  //   , name : "Help Center"
  //   , goTo : () => {}
  //   , isLast : true
  //   }
  ]

  const handleLogOut = () => {
    dispatch(clearAllUserInfo())
    dispatch(clearAllProductInfo())
    navigation.navigate(screenNames.home)
  }
  return (
    <SafeAreaView style={[commonStyles.commonMainContainer, {paddingBottom : 0, paddingHorizontal : 0, paddingTop : GlobalConfig.paddingTop, backgroundColor : GlobalConfig.secondaryBackgroundColor}]}>
{/******************************************* TOOLBAR **************************************************/} 
    <View style={{backgroundColor : GlobalConfig.secondaryBackgroundColor}}>
        <Toolbar 
            leftIconName="arrow-back-ios"
            leftIconPress={()=>{navigation.goBack()}}
            toolbarText="User Profile" showDivider={false} horizontalPadding={4}> 
          <View style={commonStyles.toolbaractionbuttons}>
            <TouchableOpacity onPress={() => {navigation.navigate(screenNames.search)}} style={commonStyles.actionButtons}>
              <Octicons name="search" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleLogOut()}} style={commonStyles.actionButtons}>
              <AntDesign name="logout" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
          </View>
        </Toolbar>
    </View>
{/**************************** Profile  *******************************/}
    <View style={{paddingVertical : 16, paddingHorizontal:16}}>
        <View style={styles.ImageContainer}>
            <View style={[styles.ring, {width : 180, height : 180, borderRadius : 90}]}>
                <View style={[styles.ring, {width : 150, height : 150, borderRadius : 75}]}>
                    <View style={styles.profileViewContainer}>
                    {userImage 
                    ? <Image source={{uri : userImage}} style={styles.profileImage}/>
                        : <View style={styles.profileImage}>
                            <Octicons name="person" size={50} color={GlobalConfig.secondaryButtonColor}/>
                        </View>
                    }
                    <TouchableOpacity onPress={()=>{navigation.navigate(screenNames.editProfile)}} style={styles.profileEditbuttonContainer}>
                        <View style={styles.profileButtonEdit}>
                            <Feather name="edit-3" size={24} color="#FFFFFF"/>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.userNameContainer}>
            <Text style={styles.userName}>Hey , {userName}</Text>
        </View>
    </View>
{/**************************** ListItem  *******************************/}
    <FlatList 
      data={listOptions}
      contentContainerStyle={{paddingTop : 8, paddingBottom : 24, paddingHorizontal : 16}}
      vertical
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity onPress={item.goTo}>
            <View style={styles.listOptions}>
                <View style={styles.leftImageTextIconContainer}>
                    <View style={styles.leftImageContainer}>
                        <Feather name={item.iconName} size={20} color={GlobalConfig.secondaryButtonColor}/>
                    </View>
                    <Text style={styles.listText}>{item.name}</Text>
                </View>
                <View style={styles.rightImageIconContainer}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={GlobalConfig.tertiaryButtonColor}/>
                </View>
            </View>
            {!item.isLast && <Divider />}
        </TouchableOpacity>
      )}
    />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    ImageContainer : {
      paddingBottom : 20
    , marginTop : 10
    , alignItems : 'center'
    , height : 200
    },
    ring : {
      position : 'absolute'
    , alignItems : 'center'
    , justifyContent : 'center'
    , borderWidth : 3
    , borderColor : GlobalConfig.tertiaryButtonColor+"20"
    },
    profileViewContainer : {
      width : 120
    , height : 120
    , position : 'relative'
    , borderRadius: 60
    , backgroundColor : GlobalConfig.secondaryButtonColor+"20"
    , borderColor : GlobalConfig.secondaryButtonColor
    },
    profileImage : {
      width : "100%"
    , height : "100%"
    , alignItems : 'center'
    , justifyContent : 'center'
    },
    profileEditbuttonContainer : {
      position : "absolute"
    , bottom : 0
    , right : 0
    , backgroundColor : GlobalConfig.backgroundColor
    , borderRadius : 20
    , padding : 4
    },
    profileButtonEdit : {
      backgroundColor :GlobalConfig.tertiaryButtonColor
    , padding : 8
    , borderRadius : 20
    },
    userNameContainer : {
      alignItems : 'center'
    }, 
    userName : {
      fontFamily : GlobalConfig.fontBold
    , fontSize : GlobalConfig.headingTextSize-4
    },
    listOptions : {
      flexDirection : 'row'
    , alignItems : 'center'
    , paddingVertical : 12
    , paddingHorizontal : 12
    , justifyContent : 'space-between'
    },
    leftImageTextIconContainer : {
      alignItems : 'center'
    , justifyContent : 'center'
    , flexDirection : 'row' 
    },
    leftImageContainer : {
      padding : 12
    , borderRadius : 28
    , backgroundColor : GlobalConfig.tertiaryButtonColor+"20"
    },
    listText : {
      fontSize : 16
    , fontFamily : GlobalConfig.fontSemiBold
    , paddingHorizontal : 24
    }
})

export default Profile