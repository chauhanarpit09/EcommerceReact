import { View, Text, SafeAreaView, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { BottomSheet, InputFeild, PrimaryButton, Toolbar } from "../components"
import commonStyles from './common.style';
import SecondaryButton from '../components/SecondaryButton';
import { GlobalConfig } from '../constants/globalConfig';
import { screenNames } from '../constants/screenName';
import { useNavigation } from '@react-navigation/native';
import { sendOtp } from '../constants/apiConfigs';
import {useDispatch } from 'react-redux';
import { isEmailValid, isPhoneValid } from './utils'
import Verify from './Verify';
import ResetPass from './ResetPass';
import {setIsNewUser, setPhone, setEmail, setDummyToken, setMaskedPhone, setMaskedEmail, setUserName} from '../redux';
import { Entypo } from '@expo/vector-icons';
import { ErrorInfo } from '../constants/errorInfo';

const Register = () => {
  // USE_STATE
  const [emailPhone, setEmailPhone] = useState('');
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false)
  const [errorInfo, setErrorInfo] = useState("")
  const [bottomSheetArr, setBottomSheetArr] = useState([false, false])

  //Navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  //HELPER_FUNCTION
  const handleEmailPhoneValidation = () => {
    let validationError = "";
    const isValidInput = emailPhone != '' && ( isEmailValid(emailPhone) || isPhoneValid(emailPhone));
    if(!isValidInput){
      validationError = emailPhone.length < 1 ? "Email/Phone cannot be empty" : "Email/Phone is not valid";
    }
    return {isValidInput, validationError}
  }

   const handleNameValidation = () => {
    return name.length < 1
            ? {isValidInput:false, validationError:"Name cannnot be empty"}
            : {isValidInput:true, validationError:""}
  }

  const handleValidation = () => {
    const emailValid = handleEmailPhoneValidation();
    const nameValid = handleNameValidation();
    return emailValid.isValidInput && nameValid.isValidInput
  };

  const onSubmit = async () => {
    const email = isEmailValid(emailPhone) ? emailPhone : null;
    const phone = isPhoneValid(emailPhone) ? emailPhone : null ;
    const response = await sendOtp(name, phone, email);
    if(response.status) {
      dispatch(setUserName(name));
      dispatch(setMaskedEmail(response.payload.maskedEmail));
      dispatch(setMaskedPhone(response.payload.maskedPhone));
      dispatch(setIsNewUser(true));
      dispatch(setPhone(phone));
      dispatch(setEmail(email));
      dispatch(setDummyToken(response.payload.dummyToken));
      setShowError(false);
      setBottomSheetArr([true, false])
    } else {
      console.log(response);
      console.log(response.errorCode);
      console.log(ErrorInfo[response.errorCode])
      if(ErrorInfo[response.errorCode]){
        setShowError(true);
        setErrorInfo(ErrorInfo[response.errorCode])
      } else {
        setShowError(true);
      }
    }
  }
  return (
    <SafeAreaView style={[commonStyles.commonMainContainer, {backgroundColor : GlobalConfig.secondaryBackgroundColor}]}>
{/******************************************* TOOLBAR **************************************************/}
      <View style={{ paddingTop: GlobalConfig.paddingTop, backgroundColor: GlobalConfig.secondaryBackgroundColor }}>
        <Toolbar
          leftIconName="arrow-back-ios"
          leftIconPress={() => {
            navigation.goBack();
          }}
          toolbarText="Register" showDivider={true} horizontalPadding={4} />
      </View>
      <View style={commonStyles.mainContainer}>
        <View style={commonStyles.imageContainer}>
          <View style={commonStyles.imageBox}>
            <Image source={require('../assets/Images/Claps.png')} style={commonStyles.image}/>
          </View>
        </View>
        <View>
            <Text style={commonStyles.primaryText}>Register Account</Text>
            <Text style={commonStyles.secondaryText}>Fast delivery, best picks. Sign up now for your favorites in a flash!</Text>
            <InputFeild
                label="Your Name"
                placeholder="eg. Arpit Chauan"
                onChangeFunc={(text) => {setName(text)}}
                onBlurFunc={handleNameValidation}
                iconName="person"
            />
            <InputFeild
                label="Your Email or Phone"
                placeholder="eg. xxx@abc.com"
                onChangeFunc={(text) => {setEmailPhone(text)}}
                onBlurFunc={handleEmailPhoneValidation}
                iconName="mail"
            />
        </View>
        <View style={styles.bottomContent}>
            <PrimaryButton onPress={onSubmit} buttonText="continue" isClickable={handleValidation()}/>
            <View  style={styles.haveAccount}>
                <Text style={{fontFamily : GlobalConfig.fontMedium}}>Have an Account? </Text>
                <SecondaryButton onPress={() => {navigation.navigate(screenNames.login)}} buttonText="Sign In"/>
            </View>
        </View>
        {showError &&
          <View>
            <Modal
              visible={showError}
              animationType='slide'
              transparent={true}
              onRequestClose={()=>{
                setShowError(false);
              }}
            >
            <View style={styles.centeredModalView}>
              <View style={styles.modalContainer}>
                <View style={styles.modalToolbarContainer}>
                    <View style={{flexDirection : "row", alignItems : "center"}}>
                      <Image source={require('../assets/Images/warning.png')} style={styles.modalImage}/>
                      <Text style={styles.loginTextInModal}>{errorInfo.errorMainText}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{setShowError(false);}}>
                      <Entypo name="cross" size={24} color={GlobalConfig.secondaryButtonColor} style={styles.modalCross}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalBodyContainer}>
                    <Text style={styles.modalBodyText}>{errorInfo.errorSecondaryText}</Text>
                </View>
                <View style={styles.errorModalActionButton}>
                  <TouchableOpacity onPress={()=>{
                      setShowError(false);
                    }} style={[styles.modalButtonContainer, {backgroundColor : "#FFFFFF"}]}>
                    <Text style={[styles.modalButtonText, {color : GlobalConfig.primaryButtonColor}]}>{errorInfo.buttonOneText}</Text>
                  </TouchableOpacity>
                  {errorInfo.buttonTwoText &&
                    <TouchableOpacity onPress={()=>{
                        setShowError(false)
                        navigation.navigate(errorInfo.navigateToOnBtnTwo);
                      }} style={styles.modalButtonContainer}>
                      <Text style={styles.modalButtonText}>{errorInfo.buttonTwoText}</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>
            </Modal>
          </View>
        }
      </View>
      <BottomSheet 
          component={<Verify setBottomSheetArr={setBottomSheetArr}/>}
          setBottomSheetArr={setBottomSheetArr}
          sheetIndex={0}
          bottomSheetArr={bottomSheetArr}
      />
      <BottomSheet 
        component={<ResetPass setBottomSheetArr={setBottomSheetArr}/>}
        setBottomSheetArr={setBottomSheetArr}
        sheetIndex={1}
        bottomSheetArr={bottomSheetArr}
      />
    
      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContent : {
    paddingVertical : 40
  },
  haveAccount : {
    paddingTop : 20
  , alignItems : 'center'
  , justifyContent: 'center'
  , flexDirection : 'row'
  },
  centeredModalView : {
    flex : 1
  , justifyContent : "center"
  , alignItems : "center"
  , overflow : "hidden"
  , backgroundColor : "#000000A0"
  },
  modalContainer : {
    backgroundColor : GlobalConfig.secondaryBackgroundColor
  , borderRadius : 10
  , margin : 16
  , width : GlobalConfig.screenWidth*0.8
  , overflow : "hidden"
  },
  modalToolbarContainer : {
    borderBottomWidth : 1
  , borderBottomColor : "#EDEDED"
  , flexDirection : "row"
  , paddingHorizontal : 12
  , justifyContent : "space-between"
  , alignItems : "center"
  },
  modalImage : {
    resizeMode : "contain"
  , width : 32
  , height : 32
  },
  loginTextInModal : {
    paddingHorizontal : 8
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
  modalBodyText : {
    color : GlobalConfig.secondaryColor
  , fontFamily : GlobalConfig.fontRegular
  , textAlign : "center"
  , paddingVertical : 4
  , fontSize : 14
  },
  errorModalActionButton : {
    borderTopWidth : 1
  , borderTopColor : "#EDEDED"
  , flexDirection : "row"
  , justifyContent : "space-between"
  , alignItems : "center"
  },
  modalButtonContainer : {
    alignItems : "center"
  , justifyContent : "center"
  , backgroundColor : GlobalConfig.primaryButtonColor
  , flex : 1
  },
  modalButtonText : {
    color : GlobalConfig.primaryButtonTextColor
  , fontFamily : GlobalConfig.fontMedium
  , fontSize : 18
  , paddingVertical : 16
  , paddingHorizontal : 16
  }
})

export default Register
