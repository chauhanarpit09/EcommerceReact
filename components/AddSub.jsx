import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { GlobalConfig } from '../constants/globalConfig'
import { setAllProduct } from '../redux'
import { useDispatch, useSelector } from 'react-redux'
import {selectAllProduct, selectSessionToken } from '../selector'
import { updateCart } from '../constants/apiConfigs'

const AddSub = ({item}) => {
  const dispatch = useDispatch()
  const [currItem, setCurrItem] = useState(item);
  const sessionToken = useSelector(selectSessionToken);
  const allProducts = useSelector(selectAllProduct);

  useEffect(() => {
    setCurrItem(allProducts.find((pItem) => pItem.id === item.id));
  }, [allProducts])

  const handleButton = useCallback((number) => {
    const updatedQuant =
      item.cartQuantity == currItem.quantity
        ? currItem.cartQuantity
        : currItem.cartQuantity + number
    if(updatedQuant > 0) {
      setCurrItem({ ...currItem, cartQuantity : updatedQuant });
      const updatedProduct = [{...item, cartQuantity : updatedQuant}];
      dispatch(setAllProduct(updatedProduct));
      updateCart(sessionToken, updatedProduct[0], updatedProduct[0].cartQuantity) //API
    }
    
  }, [dispatch, item]);

  return (
    <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={()=>{handleButton(-1)}}>
            <Ionicons size={24} name="ios-remove-outline" style={styles.button}/>
        </TouchableOpacity>
        <Text style={styles.countItem}>{currItem.cartQuantity ? currItem.cartQuantity: 1}</Text>
        <TouchableOpacity onPress={()=>{handleButton(1)}}>
            <Ionicons size={24} name="ios-add-outline" style={styles.button}/>
        </TouchableOpacity>
    </View>
  )
}

export default AddSub

const styles = StyleSheet.create({
  buttonsContainer : {
    flexDirection : 'row'
  , alignItems : 'center'
  , justifyContent : 'space-between'
  , paddingVertical : 12
  },
  countItem : {
    fontFamily : GlobalConfig.fontBold
  , color : GlobalConfig.secondaryButtonColor
  , fontSize : GlobalConfig.headingTextSize-8
  , paddingHorizontal : 8
  },
  button : {
    color : GlobalConfig.secondaryButtonColor
  , paddingHorizontal : 8
  , backgroundColor : GlobalConfig.secondaryButtonColor+"40"
  , borderRadius : 12
  }
})