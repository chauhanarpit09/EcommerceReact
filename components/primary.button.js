import { StyleSheet } from "react-native";
import { GlobalConfig  } from "../constants/globalConfig";

const styles = StyleSheet.create({
  primaryButton : {
    width : "100%",
    backgroundColor : GlobalConfig.primaryButtonColor,
    margin: "20px",
    padding : 15,
    borderRadius : GlobalConfig.buttonBorderRadius,
    justifyContent: "center",
    alignItems: "center"
  },
  disabledPrimaryButton : {
    opacity : 0.8,
  },
  primaryButtonText : {
    color : GlobalConfig.primaryButtonTextColor,
    fontSize : 16,
    fontFamily : GlobalConfig.fontMedium
  }
})

export default styles;