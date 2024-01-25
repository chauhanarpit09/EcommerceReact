import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './text.input';
import { GlobalConfig } from '../constants/globalConfig';
import { MaterialIcons } from '@expo/vector-icons';

const InputFeild = ({label, placeholder, onChangeFunc, showEye, onBlurFunc, iconName, extraStyles={}, extraLabelStyles={}, extraInputFiledStyles={}, inputFieldValue=""}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState(true);
  const getColor = (defaultColor) => {
    if(!isValid){
      return GlobalConfig.errrorColor
    } else if(isFocused)
      return GlobalConfig.selectionColor
    else {
      return defaultColor
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const validateInput = () => {
    setIsFocused(false);
    const isVal = onBlurFunc();
    if(isVal) {
      setValidationError(isVal.validationError);
      setIsValid(isVal.isValidInput);
    } else {
      setIsValid(true);
    }
  }
  return (
    <View style={[styles.inputFeildContainer, {...extraStyles}]}>
      <Text style={[styles.label, !isValid && {color:GlobalConfig.errrorColor}, {...extraLabelStyles}]}>{label}</Text>
      <View style={[styles.fieldContainer, {borderColor:getColor("#EDEDED")}, extraInputFiledStyles.borderRadius ? {borderRadius : extraInputFiledStyles.borderRadius} : {}]}>
        {iconName && <MaterialIcons name={iconName} size={24} color={getColor(GlobalConfig.secondaryColor)} style={{paddingHorizontal:8, alignItems:'center'}}/>}
        <TextInput
          style={[styles.inputFeild, {...extraInputFiledStyles}]}
          placeholder={placeholder}
          placeholderTextColor={GlobalConfig.secondaryColor+"A1"}
          value={inputFieldValue}
          onChangeText={onChangeFunc}
          secureTextEntry={showEye && !showPassword}
          onBlur={validateInput}
          onFocus={() =>{setIsFocused(true);setIsValid(true)}}
        />
        {showEye &&
          <TouchableOpacity style={styles.visibilityIcon} onPress={togglePasswordVisibility}>
            <MaterialIcons name={showPassword ? "visibility-off" : "visibility" } size={24} color={isFocused ? GlobalConfig.selectionColor : GlobalConfig.secondaryColor}/>
          </TouchableOpacity>
        }
      </View>
      {!isValid && <Text style={styles.invalidInput}>{validationError}</Text>}
    </View>
  )
}

export default InputFeild