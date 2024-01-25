import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './secondarybutton.style'

const SecondaryButton = ({onPress, buttonText, textColor}) => {
  const dynamicStyles = styles(textColor)
  return (
    <View>
        <TouchableOpacity onPress={onPress}>
            <Text style={[dynamicStyles.secondaryButtonText]}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SecondaryButton