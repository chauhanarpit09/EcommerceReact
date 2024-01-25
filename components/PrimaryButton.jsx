import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './primary.button'

const PrimaryButton = ({onPress, buttonText, isClickable}) => {
  return (
    <View>
        <TouchableOpacity onPress={onPress} style={[styles.primaryButton, !isClickable && styles.disabledPrimaryButton]} disabled={!isClickable}>
            <Text style={styles.primaryButtonText}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default PrimaryButton