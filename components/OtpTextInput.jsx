import { View, TextInput } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import styles from './otptextinput.style';

const OtpTextInput = ({otp, setOtp}) => {
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const handleInputChange = (index, value) => {
    if (value.length === 1 && index < 3) {
      otpInputRefs[index + 1].current.focus();
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleBackspace = (index, value) => {
    if (value === '' && index > 0) {
      otpInputRefs[index - 1].current.focus();
    }
    
    newOtp[index] = value;
    setOtp(newOtp);
  };


  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={digit}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(value) => handleInputChange(index, value)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(index, '');
            }
          }}
          ref={otpInputRefs[index]}
        />
      ))}
    </View>
  )
}


export default OtpTextInput