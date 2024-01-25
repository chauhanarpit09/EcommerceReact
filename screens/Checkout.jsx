import { View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { Octicons, Feather } from '@expo/vector-icons'
import { Toolbar } from '../components'
import commonStyles from './common.style'
import { GlobalConfig } from '../constants/globalConfig'

const Checkout = () => {
  return (
    <SafeAreaView style={[commonStyles.commonMainContainer, { paddingHorizontal: 0, backgroundColor : GlobalConfig.backgroundColor}]}>

{/******************************************* TOOLBAR **************************************************/} 
    <View style={{paddingTop : GlobalConfig.paddingTop, backgroundColor : GlobalConfig.secondaryBackgroundColor}}>
        <Toolbar 
            leftIconName="arrow-back-ios"
            leftIconPress={()=>{handleNavigation(navigation.goBack())}}
            toolbarText="Checkout" showDivider={false} horizontalPadding={4}> 
        </Toolbar>
    </View>

  {/******************************************* LOGIN POPUP **************************************************/} 
      {/* <LoginPopUp 
        showLoginPopup={showLoginPopup}
        setShowLoginPopup={setShowLoginPopup}
        /> */}
    </SafeAreaView>
  )
}

export default Checkout