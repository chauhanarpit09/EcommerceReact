import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons  } from '@expo/vector-icons'
import { GlobalConfig } from '../constants/globalConfig'
import styles from './toolbar.style'
import Divider from './Divider'

const Toolbar = ({toolbarText, leftIconName, leftIconPress, children, showDivider=true, horizontalPadding=GlobalConfig.paddingHorizontal}) => {
  return (
    <View style={{paddingHorizontal : horizontalPadding}}>
      <View style={styles.toolbarContainer}>
        {leftIconName &&
          <TouchableOpacity onPress={leftIconPress} style={[styles.backButton, {paddingLeft : 16}]}>
            <MaterialIcons name={leftIconName} size={24} color={GlobalConfig.tertiaryButtonColor+"E6"}/>
          </TouchableOpacity>
        }
        <View style={styles.toolbarTextContainer}>
          <Text style={styles.toolbarText}>{toolbarText}</Text>
        </View>
          {children}
      </View>
      {showDivider && 
          <View style={{paddingTop : 8}}>
            <Divider marginHorizontal={0}/>
          </View>
      }
    </View>
  )
}

export default Toolbar