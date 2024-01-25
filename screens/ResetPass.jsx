import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { InputFeild, PrimaryButton } from "../components"
import commonStyles from './common.style';
import { screenNames } from '../constants/screenName';
import { useNavigation } from '@react-navigation/native';
import { upatePassword } from '../constants/apiConfigs';
import { useSelector } from 'react-redux';
import { selectSessionToken } from '../selector';

const ResetPass = () => {
  const navigation = useNavigation();
  const sessionToken = useSelector(selectSessionToken);
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [showError, setShowError] = useState(false)
  const onSubmit = async () => {
    const response = await upatePassword(password, sessionToken)
    if(response.status){
      setShowError(false);
      navigation.reset({
        index : 0
      , routes : [{name : screenNames.home}]
      })
    } else {
      setShowError(true);
    }
  }
  return (
      <View style={commonStyles.commonMainContainerBottomSheet}>
          <View>
              <Text style={commonStyles.primaryText}>Reset Password</Text>
              <Text style={commonStyles.secondaryText}>Enter Email/Phone Number to reset your account password</Text>
              <InputFeild
                  label="Enter your new password"
                  placeholder="eg.Ae12Rt@1234"
                  onChangeFunc={(text) => {setPassword(text)}}
                  onBlurFunc={()=>{}}
                  iconName="lock"
              />
              <InputFeild
                  label="Confirm Password"
                  placeholder="eg.Ae12Rt@1234"
                  onChangeFunc={(text) => {setCnfPassword(text)}}
                  onBlurFunc={()=>{}}
                  iconName="lock"
              />
          </View>
          <View style={styles.bottomContent}>
              <PrimaryButton onPress={onSubmit} buttonText="Reset Password" isClickable={true}/>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
    bottomContent : {
      paddingVertical : 40
    },
})

export default ResetPass