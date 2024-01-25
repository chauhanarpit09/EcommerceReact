import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {OtpTextInput, PrimaryButton } from "../components"
import commonStyles from './common.style';
import SecondaryButton from '../components/SecondaryButton';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../constants/screenName';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setSessionToken} from '../redux';
import { selectUserName, selectDummyToken, selectPhone, selectEmail, selectMaskedEmail, selectMaskedPhone, selectIsNewUser } from '../selector';
import { GlobalConfig } from '../constants/globalConfig';
import { verifyOtp } from '../constants/apiConfigs';

const Verify = ({setBottomSheetArr}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dummyToken = useSelector(selectDummyToken)
  const phone = useSelector(selectPhone)
  const email = useSelector(selectEmail)
  const userName = useSelector(selectUserName)
  const maskedEmail = useSelector(selectMaskedEmail)
  const maskedPhone = useSelector(selectMaskedPhone)
  const isNewUser = useSelector(selectIsNewUser)
  const [showError, setShowError] = useState(false)

  const onSubmit = async () => {
    const response = await verifyOtp(userName, email, phone, otp.join(''), dummyToken, isNewUser)
    if(response.status){
      setShowError(false);
      dispatch(setSessionToken(response.payload.sessionToken));
      dispatch(setAuthToken(response.payload.authToken));
      isNewUser ? setBottomSheetArr([false, true]) : setBottomSheetArr([false, false, true])
    } else {
      setShowError(true);
    }
  }

  return (
    <View style={commonStyles.commonMainContainerBottomSheet}>
      <View>
        <Text style={commonStyles.primaryText}>Enter Verification Code</Text>
        <View  style={styles.secondaryTextContainer}>
            <Text style={commonStyles.secondaryRegisterText}>Enter the 4-digit code which we just sent you on {maskedEmail ? maskedEmail : maskedPhone} </Text>
            {isNewUser && <SecondaryButton onPress={() => {navigation.navigate(screenNames.register);}} buttonText="Change?"/>}
        </View>
        <View style={styles.labelContainer}>
            <Text style={styles.codeText}>Verification Code</Text>
            <SecondaryButton onPress={()=>{}} buttonText="Resend Code"/>
        </View>
        <View style={styles.otpContainer}>
          <OtpTextInput 
            otp={otp}
            setOtp={setOtp}
          />
        </View>
      </View>
      <View style={styles.bottomContent}>
          <PrimaryButton onPress={onSubmit} buttonText="continue" isClickable={true}/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    topContent : {flex:1},
    secondaryTextContainer : {
      paddingBottom : 40
    , flexDirection : 'row'
    , flexWrap : 'wrap'
    , alignItems : 'center'
    , justifyContent : 'center'
    },
    secondaryRegisterText : {
      fontSize : 16
    , color : GlobalConfig.secondaryColor
    , fontFamily :  GlobalConfig.fontRegular
    , lineHeight : 20
    , textAlign: 'center'
    },
    otpContainer : {
      paddingVertical : 20
    , paddingBottom : 40
    },
    bottomContent : {
      paddingBottom : 40
    },
    labelContainer : {
      flexDirection : "row"
    , justifyContent : 'space-between'
    , paddingVertical : 10
    },
    codeText : {
      fontFamily : GlobalConfig.fontMedium
    , fontSize : 16
    },
    haveAccount : {
      paddingTop : 20
    , alignItems : 'center'
    , justifyContent: 'center'
    , flexDirection : 'row'
    }
})

export default Verify