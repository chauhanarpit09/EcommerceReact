import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import InputFeild from './InputFeild'
import { GlobalConfig } from '../constants/globalConfig'
import { setUserAddress } from '../redux'
import { useDispatch } from 'react-redux'
import * as Animatable from 'react-native-animatable';


const AddNewAddress = ({cancelButtonFunc, hideInputFiled, item=null}) => {
  const [aOne, setAone] = useState("");
  const [aTwo, setAtwo] = useState("");
  const [landmark, setLandMark] = useState("");
  const [pincode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDefault, setIsDefault] = useState(true);

  useEffect(()=>{
    if(item){
      setAone(item?.addressLine1);
      setAtwo(item?.addressLine2);
      setPinCode(item?.postalCode);
      setCity(item?.city);
      setState(item?.state);
      setName(item?.name);
      setPhoneNumber(item?.phoneNumber);
      setIsDefault(item?.isDefault);
    }
  }, [item])

  const dispatch = useDispatch();

  const handlaAddAddress = () => {
    const inputAddress =
        { addressLine1 : aOne
        , addressLine2 : aTwo + ", " + landmark
        , city
        , state
        , postalCode : pincode
        , name
        , phoneNumber
        , isDefault
        }
    if(item)
      dispatch(setUserAddress({item : inputAddress, op : 0}));
    else 
      dispatch(setUserAddress({item : inputAddress, op : 2}));
    hideInputFiled();
  }

  return (
    <ScrollView style={styles.addressContainer}>
        <View style={styles.rowContainer}>
            <InputFeild
                label="Name"
                placeholder="eg. Arpit Chauhan"
                onChangeFunc={(text)=>{setName(text)}}
                onBlurFunc={()=>{}}
                inputFieldValue={name}
                extraLabelStyles={styles.label}
                extraInputFiledStyles={styles.inputField}
            />
        </View>
        <View style={styles.rowContainer}>
            <InputFeild
                label="Phone Number"
                placeholder="eg. 8279444444"
                onChangeFunc={(text)=>{setPhoneNumber(text)}}
                onBlurFunc={()=>{}}
                inputFieldValue={phoneNumber}
                extraLabelStyles={styles.label}
                extraInputFiledStyles={styles.inputField}
            />
        </View>
        <View style={styles.rowContainer}>
            <InputFeild
                label="Flat, House No, Building, company, Apartment"
                placeholder="eg. H.No : 123"
                onChangeFunc={(text)=>{setAone(text)}}
                onBlurFunc={()=>{}}
                inputFieldValue={aOne}
                extraLabelStyles={styles.label}
                extraInputFiledStyles={styles.inputField}
            />
        </View>
        <View style={styles.rowContainer}>
            <InputFeild
                label="Area, Street, Setor, Village"
                placeholder="eg. Abc Colony"
                onChangeFunc={(text)=>{setAtwo(text)}}
                onBlurFunc={()=>{}}
                inputFieldValue={aTwo}
                extraLabelStyles={styles.label}
                extraInputFiledStyles={styles.inputField}
            />
        </View>
        <View style={styles.rowContainer}>
             <InputFeild
                label="Landmark"
                placeholder="eg. near shivatattva office"
                onChangeFunc={(text)=>{setLandMark(text)}}
                onBlurFunc={()=>{}}
                extraLabelStyles={styles.label}
                extraInputFiledStyles={styles.inputField}
            />
        </View>
        <View style={styles.rowContainer}>
             <InputFeild
                label="Pincode"
                placeholder="eg. 12345"
                onChangeFunc={(text)=>{setPinCode(text)}}
                onBlurFunc={()=>{}}
                inputFieldValue={pincode}
                extraStyles={styles.inputFieldExtraStyles}
                extraLabelStyles={styles.label}
                extraInputFiledStyles={styles.inputField}
            />
            <InputFeild
                label="Town/City"
                placeholder="eg. Bengaluru"
                onChangeFunc={(text)=>{setCity(text)}}
                onBlurFunc={()=>{}}
                inputFieldValue={city}
                extraLabelStyles={styles.label}
                extraInputFiledStyles={styles.inputField}
            />
        </View>
        <View style={styles.rowContainer}>
            <InputFeild
                label="State"
                placeholder="eg. Karnataka"
                onChangeFunc={(text)=>{setState(text)}}
                extraLabelStyles={styles.label}
                inputFieldValue={state}
                extraInputFiledStyles={styles.inputField}
                onBlurFunc={()=>{}}
            />
        </View>
        <View style={styles.defaultContainer}>
          <TouchableOpacity onPress={()=>{setIsDefault(!isDefault)}} style={styles.defaultContainertouch}>
            {isDefault
              ? <Animatable.View animation="tada" easing="ease-out" iterationCount={1}>
                  <Feather name="check-circle" size={16} color={GlobalConfig.secondaryButtonColor}/>
                </Animatable.View> 
              : <Feather name="circle" size={16} color={GlobalConfig.secondaryButtonColor}/>
            }
            <Text style={styles.defaultContainerText}>Set as default</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.rowContainer, {paddingVertical : 16}]}>
            {!item && <TouchableOpacity onPress={()=>{cancelButtonFunc()}} style={[styles.actionButtons, styles.cancelButton]}>
                <Text style={[styles.actionButtonsText, {color : GlobalConfig.primaryButtonColor}]}>Cancel</Text>
            </TouchableOpacity>
            }
            <TouchableOpacity onPress={()=>{handlaAddAddress()}} style={[styles.actionButtons, item && styles.cancelButton]}>
                <Text style={[styles.actionButtonsText, item ? {color : GlobalConfig.primaryButtonColor} :{color : GlobalConfig.primaryButtonTextColor}]}>{item ? "Update Address" :"Add Address"}</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default AddNewAddress

const styles = StyleSheet.create({
  addressContainer : {
    width : GlobalConfig.screenWidth
  , backgroundColor : GlobalConfig.secondaryBackgroundColor
  , marginVertical : 8
  , paddingVertical : 16
  , paddingHorizontal : GlobalConfig.paddingHorizontal
  },
  rowContainer : {
    flexDirection : "row"
  , justifyContent : "space-evenly"
  },
  inputFieldExtraStyles : {
    marginRight : 8
  },
  label : {
    fontFamily : GlobalConfig.fontSemiBold
  },
  inputField : {
    backgroundColor : GlobalConfig.secondaryBackgroundColor
  , borderRadius : 8
  },
  actionButtons : {
    paddingVertical : 16
  , paddingHorizontal : 16
  , borderRadius : 8
  , flex : 1
  , alignItems : "center"
  , backgroundColor : GlobalConfig.primaryButtonColor
  , borderWidth : 2
  , borderColor : GlobalConfig.primaryButtonColor
  },
  cancelButton : {
    backgroundColor : GlobalConfig.primaryButtonTextColor
  , marginRight : 8
  },
  actionButtonsText : {
    fontFamily : GlobalConfig.fontSemiBold
  , fontSize : 16
  },
  defaultContainer : {
    paddingVertical : 8
  },
  defaultContainertouch : {
    flexDirection : "row"
  , alignItems : "center"
  , justifyContent : "flex-start"
  },
  defaultContainerText : {
    paddingHorizontal : 8
  , fontFamily : GlobalConfig.fontMedium
  , color : GlobalConfig.secondaryButtonColor
  , fontSize : 16
  }
})
