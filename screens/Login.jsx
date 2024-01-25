import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView} from 'react-native'
import React, {useState} from 'react'
import { BottomSheet, InputFeild, PrimaryButton, Toolbar } from "../components"
import commonStyles from './common.style';
import SecondaryButton from '../components/SecondaryButton';
import { screenNames } from '../constants/screenName';
import { useNavigation } from '@react-navigation/native';
import { isEmailValid, isPhoneValid } from './utils'
import { login } from '../constants/apiConfigs';
import {useDispatch } from 'react-redux';
import { setSessionToken, setUserName, setMaskedEmail, setMaskedPhone, setAuthToken} from '../redux';
import ForgotPass from './ForgotPass';
import Verify from './Verify';
import ResetPass from './ResetPass';
import { GlobalConfig } from '../constants/globalConfig';

const Login = () => {
  const [bottomSheetArr, setBottomSheetArr] = useState([false, false, false])
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false)

  const handleEmailPhoneValidation = () => {
    let validationError = "";
    const isValidInput = emailPhone != '' && ( isEmailValid(emailPhone) || isPhoneValid(emailPhone));
    if(!isValidInput){
      validationError = emailPhone.length < 1 ? "Email/Phone cannot be empty" : "Email/Phone is not valid";
    }
    return {isValidInput, validationError}
  }

  const handlePassValidation = () => {
    return password.length < 1 ? 
      {isValidInput:false, validationError:"Password cannnot be empty"} :
      {isValidInput:true, validationError:""}
  }

  const handleValidation = () => {
    const emailValid = handleEmailPhoneValidation();
    const passValid = handlePassValidation();
    return emailValid.isValidInput && passValid.isValidInput;
  };

   const onSubmit = async () => {
    const email = isEmailValid(emailPhone) ? emailPhone : null;
    const phone = isPhoneValid(emailPhone) ? emailPhone : null ;
    const response = await login(email, phone, password)
    if(response.status){
      setShowError(false);
      dispatch(setSessionToken(response.payload.sessionToken));
      dispatch(setAuthToken(response.payload.authToken));
      dispatch(setUserName(response.payload.userName));
      dispatch(setMaskedEmail(response.payload.maskedEmail))
      dispatch(setMaskedPhone(response.payload.maskedPhone));
      // storeData(AUTH_TOKEN, response.payload.authToken);
      navigation.reset({
        index: 0,
        routes: [{ name: screenNames.home }],
      });
    } else {
      setShowError(true);
    }
  }

  return (
      <SafeAreaView style={[commonStyles.commonMainContainer, {backgroundColor : GlobalConfig.secondaryBackgroundColor}]}>
        <View style={{paddingTop : 40}}>
            <Toolbar leftIconName="arrow-back-ios" leftIconPress={() => {navigation.goBack();}}/>
        </View>
        <ScrollView
          style={commonStyles.mainContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={commonStyles.imageContainer}>
            <View style={commonStyles.imageBox}>
              <Image source={require('../assets/Images/Wave.png')} style={commonStyles.image}/>
            </View>
          </View>
          <View>
              <Text style={commonStyles.primaryText}>Log in, Shop, Enjoy!</Text>
              <Text style={commonStyles.secondaryText}>Please log in with registered account</Text>
          </View>
          <View>
            <InputFeild
              label="Email/Phone"
              placeholder="eg.xyz@gmail.com"
              onChangeFunc={(text) => {setEmailPhone(text)}}
              onBlurFunc={handleEmailPhoneValidation}
              inputFieldValue={emailPhone}
              iconName="mail"
            />
            <InputFeild
                label="Password"
                placeholder="eg.Ae12Rt@1234"
                onChangeFunc={(text)=>{setPassword(text)}}
                showEye={true}
                inputFieldValue={password}
                onBlurFunc={handlePassValidation}
                iconName="lock"
            />
          </View>
          <View style={{paddingVertical : 24}}>
            <PrimaryButton onPress={onSubmit} buttonText="Log In" isClickable={handleValidation()}/>
          </View>
          <View style={styles.extraActions}>
              <SecondaryButton textColor={"#000000"} onPress={() => {setBottomSheetArr([true, false, false])}} buttonText="Forgot Password"/>
              <SecondaryButton onPress={() => {navigation.navigate(screenNames.register)}} buttonText="Not yet register?"/>
          </View>
        </ScrollView>
        <BottomSheet 
          component={<ForgotPass setBottomSheetArr={setBottomSheetArr}/>}
          sheetIndex={0}
          setBottomSheetArr={setBottomSheetArr}
          bottomSheetArr={bottomSheetArr}
        />
        <BottomSheet 
          component={<Verify setBottomSheetArr={setBottomSheetArr}/>}
          setBottomSheetArr={setBottomSheetArr}
          sheetIndex={1}
          bottomSheetArr={bottomSheetArr}
        />
        <BottomSheet 
          component={<ResetPass setBottomSheetArr={setBottomSheetArr}/>}
          setBottomSheetArr={setBottomSheetArr}
          sheetIndex={2}
          bottomSheetArr={bottomSheetArr}
        />
      </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    extraActions : {
       justifyContent : "space-between"
    , flexDirection : "row"
    , alignItems : "flex-end"
    , paddingBottom : 20
    },
})

export default Login
