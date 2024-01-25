import { View, Modal, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import commonStyles from '../screens/common.style'

const BottomSheet = ({component, setBottomSheetArr, bottomSheetArr, sheetIndex}) => {
  const closeModal = () => {
    const newBottomSheetArr = bottomSheetArr.map(() => {return false})
    setBottomSheetArr(newBottomSheetArr);
  }
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={bottomSheetArr[sheetIndex]}
        onRequestClose={() => {closeModal()}}
    >
        <View style={commonStyles.bottomModal}>
            <TouchableOpacity onPress={() =>{closeModal()}} style={{flex: 1}}></TouchableOpacity>
            <View style={commonStyles.modalContent}>{component}</View>
        </View>
    </Modal>
  )
}

export default BottomSheet