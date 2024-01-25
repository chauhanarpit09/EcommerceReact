import { View, StyleSheet, Text, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {InputFeild, PrimaryButton } from "../components"
import commonStyles from './common.style';
import { isEmailValid, isPhoneValid } from './utils'
import { useDispatch } from 'react-redux';
import {setIsNewUser, setPhone, setEmail, setDummyToken, setMaskedPhone, setMaskedEmail, setUserName} from '../redux';

const ForgotPass = ({setBottomSheetArr}) =>{
  const [emailPhone, setEmailPhone] = useState('');
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false)

  const handleEmailPhoneValidation = () => {
    let validationError = "";
    const isValidInput = emailPhone != '' && ( isEmailValid(emailPhone) || isPhoneValid(emailPhone));
    if(!isValidInput){
      validationError = emailPhone.length < 1 ? "Email/Phone cannot be empty" : "Email/Phone is not valid";
    }
    return {isValidInput, validationError}
  }

  const handleValidation = () => {
    const emailValid = handleEmailPhoneValidation();
    return emailValid.isValidInput
  };

  const onSubmit = async () => {
    const email = isEmailValid(emailPhone) ? setEmail(emailPhone) : null;
    const phone = isPhoneValid(emailPhone) ? setPhone(emailPhone) : null;
    // const apiresponse = await forgotPass(email, phone);
   
    if(true) {
      // dispatch(setUserName(response.payload.userName));
      // dispatch(setMaskedEmail(response.payload.maskedEmail));
      // dispatch(setMaskedPhone(response.payload.maskedPhone));
      // dispatch(setIsNewUser(false));
      // dispatch(setPhone(phone));
      // dispatch(setEmail(email));
      // dispatch(setDummyToken(response.payload.dummyToken));
      setShowError(false);
      setBottomSheetArr([false, true, false])
    }
    else setShowError(true);
  }

  return (
    <ScrollView style={commonStyles.commonMainContainerBottomSheet}>
      <View>
        <Text style={commonStyles.primaryText}>Forgot Password</Text>
        <Text style={commonStyles.secondaryText}>Enter yout registered Email/Phone Number to reset your account password</Text>
      </View>
      <View>
        <InputFeild
            label="Email/Phone"
            placeholder="eg.xyz@gmail.com"
            onChangeFunc={(text) => {setEmailPhone(text)}}
            onBlurFunc={handleEmailPhoneValidation}
            iconName="person"
        />
      </View>
      <View style={styles.bottomContent}>
          <PrimaryButton onPress={onSubmit} buttonText="Reset Password" isClickable={handleValidation()}/>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    bottomContent : {
      paddingVertical : 40
    },
})

export default ForgotPass