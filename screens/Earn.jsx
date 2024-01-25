import { View, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import commonStyles from './common.style';
import { GlobalConfig } from '../constants/globalConfig';
import { Feather, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { EmptyLayout, Toolbar } from '../components';

const Earn = () => {
  const navigation = useNavigation()
  const orders = []
  return (
    <SafeAreaView  style={[commonStyles.commonMainContainer, { paddingHorizontal: 0}]}>
{/******************************************* TOOLBAR **************************************************/}
      <View style={{ paddingTop: GlobalConfig.paddingTop, backgroundColor: GlobalConfig.secondaryBackgroundColor }}>
        <Toolbar
          leftIconName="arrow-back-ios"
          leftIconPress={() => {
            navigation.goBack();
          }}
          toolbarText="Earn & Redeem" showDivider={false} horizontalPadding={4}>
          <View style={commonStyles.toolbaractionbuttons}>
            <TouchableOpacity onPress={() => { navigation.navigate(screenNames.search) }} style={commonStyles.actionButtons}>
              <Octicons name="search" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate(screenNames.cart) }} style={commonStyles.actionButtons}>
              <Feather name="shopping-bag" size={24} color={GlobalConfig.primaryButtonColor} />
            </TouchableOpacity>
          </View>
        </Toolbar>
      </View>
{/******************************************* TOOLBAR **************************************************/}

    {orders && orders.length > 0 
        ? <View></View>
        : <EmptyLayout
            imageUrl={require("../assets/Images/Earn.png")}
            text="Comming soon"
            secondaryText="Get ready for a world of perks! Our Earn & Redeem feature is on its way. Earn points as you shop and redeem them for exclusive rewards. Stay tuned for a rewarding experience!"
            />
    }
    </SafeAreaView>
  )
}

export default Earn