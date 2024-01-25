import {StyleSheet } from 'react-native'
import { GlobalConfig } from "../constants/globalConfig";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  , justifyContent : 'space-between'
  },
  input: {
    width: 74
  , height: 64
  , backgroundColor: '#FAFAFA'
  , borderWidth: 1
  , borderRadius:  GlobalConfig.borderRadius
  , borderColor : "#EDEDED"
  , textAlign: 'center'
  , fontSize: 20
  , marginRight: 8
  , color : GlobalConfig.primaryColor
  , fontFamily : GlobalConfig.fontMedium
  },
});

export default styles;