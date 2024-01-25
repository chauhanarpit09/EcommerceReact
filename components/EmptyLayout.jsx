import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import commonStyles from '../screens/common.style'

const EmptyLayout = ({imageUrl, text, secondaryText, buttonText, onButtonPress}) => {
  return (
    <View style={commonStyles.emptyContainer}>
        <View style={{paddingHorizontal : 8, alignItems : "center", justifyContent : "center"}}>
            <Image source={imageUrl} style={commonStyles.emptyImageView}/>
            <Text style={commonStyles.textEmpty}>{text}</Text>
            <Text style={commonStyles.sectextEmpty}>{secondaryText}</Text>
        </View>
        <View style={{paddingHorizontal : 8}}>
            {buttonText &&
                <TouchableOpacity onPress={onButtonPress}style={commonStyles.buttonEmpty}>
                    <Text  style={commonStyles.buttonEmptyText}>{buttonText}</Text>
                </TouchableOpacity>
            }
        </View>
    </View>
  )
}

export default EmptyLayout