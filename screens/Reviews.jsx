import { View, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import commonStyles from './common.style';
import { GlobalConfig } from '../constants/globalConfig';
import { Feather, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { EmptyLayout, Toolbar } from '../components';

const Reviews = () => {
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
          toolbarText="Your Reviews" showDivider={false} horizontalPadding={4}>
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
            imageUrl={require("../assets/Images/NoReviews.png")}
            text="No Reviews"
            secondaryText="Contribute a review to help others and enhance the shopping experience for everyone!"
            buttonText="Rate your buys"
            onButtonPress={() => {}}
            />
    }
    </SafeAreaView>
  )
}

export default Reviews