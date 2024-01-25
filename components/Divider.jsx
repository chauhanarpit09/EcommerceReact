import { View, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalConfig } from '../constants/globalConfig'

const Divider = ({dividerWidth=2, marginHorizontal=16}) => {
  return (
    <View style={[styles.divider, {height : dividerWidth, marginHorizontal }]}></View>
  )
}

export default Divider

const styles = StyleSheet.create({
    divider : {
      opacity : 0.6
    , backgroundColor : GlobalConfig.secondaryButtonColor+"20"
    }
})