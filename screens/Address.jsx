import { View, SafeAreaView, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import React, {useState} from "react";
import commonStyles from "./common.style";
import { GlobalConfig } from "../constants/globalConfig";
import { Feather, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AddNewAddress, EmptyLayout, Toolbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { selectUserAddress } from "../selector";
import { screenNames } from "../constants/screenName";
import { setUserAddress } from "../redux";
import * as Animatable from 'react-native-animatable';

const Address = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userAddress = useSelector(selectUserAddress);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState("");

  const deleteAddress = (item) => {
    dispatch(setUserAddress({item, op : 1}));
  } 

  const setDefaultAddress = (item) => {
    dispatch(setUserAddress({item : {...item, isDefault: true}, op : 0}));
  }
  return (
    <SafeAreaView
      style={[commonStyles.commonMainContainer, { paddingHorizontal: 0 }]}
    >
      {/******************************************* TOOLBAR **************************************************/}
      <View
        style={{
          paddingTop: GlobalConfig.paddingTop,
          backgroundColor: GlobalConfig.secondaryBackgroundColor,
        }}
      >
        <Toolbar
          leftIconName="arrow-back-ios"
          leftIconPress={() => {
            navigation.goBack();
          }}
          toolbarText="Your Addresses"
          showDivider={false}
          horizontalPadding={4}
        >
          <View style={commonStyles.toolbaractionbuttons}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screenNames.search);
              }}
              style={commonStyles.actionButtons}
            >
              <Octicons
                name="search"
                size={24}
                color={GlobalConfig.primaryButtonColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screenNames.cart);
              }}
              style={commonStyles.actionButtons}
            >
              <Feather
                name="shopping-bag"
                size={24}
                color={GlobalConfig.primaryButtonColor}
              />
            </TouchableOpacity>
          </View>
        </Toolbar>
      </View>
      {/******************************************* TOOLBAR **************************************************/}
      {showAddressInput &&
        <AddNewAddress
          cancelButtonFunc={()=>{setShowAddressInput(false)}}
          hideInputFiled={()=>{setShowAddressInput(false)}}
        />
      }

      {(!showAddressInput && userAddress && userAddress.length > 0) &&
        <View style={{flex : 1}}>
          {showEditAddress=== "" &&
            <View style={styles.addNewAddressbtnContainer}>
              <TouchableOpacity onPress={()=>{setShowAddressInput(true)}} style={styles.addnewAddressButton}>
                <Text style={styles.addNewAddressButtonText}>Add New Address</Text>
              </TouchableOpacity>
            </View>
          }
          <FlatList 
            data={userAddress}
            keyExtractor={(item, index) => index.toString()}
            vertical
            contentContainerStyle={{paddingBottom : 60}}
            renderItem={({item}) => (
              <View style={styles.addressContainer}>
                {item?.isDefault &&
                  <View style={styles.defaultAddressContainer}>
                    <Text style={styles.defaultAddressText}>Default Address</Text>
                    <Feather name="check-circle" size={16} color={GlobalConfig.secondaryButtonColor}/>
                  </View>
                }
                <View style={styles.addressTextContainer}>
                  <Text style={[styles.addressText, styles.nameText]}>{item?.name}</Text>
                  <Text style={styles.addressText}>{item?.addressLine1}</Text>
                  <Text style={styles.addressText}>{item?.addressLine2}</Text>
                  <Text style={styles.addressText}>{item?.city}, {item?.state}, {item?.postalCode}</Text>
                  <Text style={styles.addressText}>Phone number : {item?.phoneNumber}</Text>
                </View>
                <View style={styles.addressActionButtonContainer}>
                  <TouchableOpacity onPress={()=>{setShowEditAddress(showEditAddress == "" || showEditAddress != item?.name ? item?.name : "")}} style={styles.addressTextButton}>
                    <Text style={styles.addressTextButtontext}>{showEditAddress == item?.name ? "Cancel" : "Edit" }</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{deleteAddress(item)}} style={styles.addressTextButton}>
                    <Text style={styles.addressTextButtontext}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{setDefaultAddress(item)}} style={styles.addressTextButton}>
                    <Text style={styles.addressTextButtontext}>Set as Default</Text>
                  </TouchableOpacity>
                </View>

                {showEditAddress == item?.name &&
                  <View style={{alignItems : "center", justifyContent : "center"}}>
                    <AddNewAddress
                      hideInputFiled={()=>{setShowEditAddress("")}}
                      item={item}
                    />
                  </View>
                }
              </View>
            )}
          />
        </View>
      }

      {!showAddressInput && !(userAddress && userAddress.length > 0) &&
        <EmptyLayout
            imageUrl={require("../assets/Images/noaddress.png")}
            text="No Address Found"
            secondaryText="Please add your address for your better experience"
            buttonText="Add Address"
            onButtonPress={() => {setShowAddressInput(true)}}
          />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addressContainer : {
    backgroundColor : GlobalConfig.secondaryBackgroundColor
  , marginVertical : 8
  , paddingHorizontal : GlobalConfig.paddingHorizontal
  , paddingVertical : 16
  },
  addressTextContainer : {
    paddingVertical : 4
  },
  nameText : {
    paddingVertical : 4
  , fontFamily : GlobalConfig.fontSemiBold
  },
  addressText : {
    color : GlobalConfig.primaryColor
  , fontFamily : GlobalConfig.fontRegular
  , fontSize : 16
  },
  addressActionButtonContainer : {
    flexDirection : "row"
  , paddingVertical : 8
  },
  addressTextButton : {
    borderRadius : 8
  , marginRight : 8
  , paddingVertical : 8
  , paddingHorizontal : 12
  , color : GlobalConfig.secondaryColor
  , backgroundColor : GlobalConfig.tertiaryButtonColor+"40"
  },
  addressTextButtontext : {
    fontFamily : GlobalConfig.fontMedium
  },
  addNewAddressbtnContainer : {
    width : GlobalConfig.screenWidth
  , backgroundColor : GlobalConfig.secondaryBackgroundColor
  , borderTopWidth : 1
  , borderColor : GlobalConfig.tertiaryButtonColor+"40"
  , position : "absolute"
  , bottom : 0
  , zIndex : 1
  },
  addnewAddressButton : {
    paddingVertical : 16
  , alignItems : "center"
  , backgroundColor : GlobalConfig.primaryButtonColor
  , flexDirection : "row"
  , justifyContent : "center"
  },
  addNewAddressButtonText : {
    color : GlobalConfig.primaryButtonTextColor
  , fontFamily : GlobalConfig.fontSemiBold
  , fontSize : 18
  , paddingHorizontal : 4
  },
  defaultAddressContainer : {
    borderBottomColor : GlobalConfig.tertiaryButtonColor+"40"
  , paddingBottom : 12
  , alignItems : "center"
  , flexDirection : "row"
  , justifyContent : "flex-end"
  , borderBottomWidth : 2
  },
  defaultAddressText : {
    fontFamily : GlobalConfig.fontSemiBold
  , color : GlobalConfig.secondaryButtonColor
  , paddingHorizontal : 4
  }
})

export default Address;
