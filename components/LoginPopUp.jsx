import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native'
import React from 'react'
import { GlobalConfig } from '../constants/globalConfig';
import { screenNames } from '../constants/screenName';
import { AntDesign, Entypo, Feather, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginPopUp = ({showLoginPopup, setShowLoginPopup}) => {
  const navigation = useNavigation();
  return (
     <View>
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
    </View>
  )
}

const styles = StyleSheet.create({
  centeredModalView : {
    flex : 1
  , justifyContent : "flex-end"
  , alignItems : "center"
  , overflow : "hidden"
  , backgroundColor : "#00000040"
  },
  modalContainer : {
    backgroundColor : GlobalConfig.secondaryBackgroundColor
  , borderRadius : 10
  , margin : 16
  },
  modalToolbarContainer : {
    borderBottomWidth : 1
  , borderBottomColor : "#EDEDED"
  , flexDirection : "row"
  , justifyContent : "space-between"
  , alignItems : "baseline"
  },
  loginTextInModal : {
    padding : 16
  , fontFamily : GlobalConfig.fontBold
  , fontSize : 16
  , color : GlobalConfig.primaryColor
  },
  modalCross : {
    padding : 16
  },
  modalBodyContainer : {
    alignItems : "center"
  , justifyContent : "center"
  , padding : 16
  },
  modalImage : {
    resizeMode : "contain"
  , width : 90
  , height : 90
  },
  modalBodyMainText : {
    fontFamily : GlobalConfig.fontSemiBold
  , fontSize : 16
  , color : GlobalConfig.primaryColor
  , textAlign : "center"
  },
  modalBodySecText : {
    color : GlobalConfig.secondaryColor
  , fontFamily : GlobalConfig.fontRegular
  , textAlign : "center"
  , paddingVertical : 4
  , fontSize : 14
  },
  modalButtonContainer : {
    marginHorizontal : 16
  , alignItems : "center"
  , marginVertical : 16
  , justifyContent : "center"
  , backgroundColor : GlobalConfig.primaryButtonColor
  , borderRadius :  12
  },
  modalButtonText : {
    color : GlobalConfig.primaryButtonTextColor
  , fontFamily : GlobalConfig.fontMedium
  , fontSize : 18
  , paddingVertical : 16
  }
})

export default LoginPopUp