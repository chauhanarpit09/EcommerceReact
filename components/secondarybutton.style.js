import { StyleSheet } from "react-native";
import { GlobalConfig  } from "../constants/globalConfig";

const styles = (textColor) => {
  const color = textColor ? textColor : GlobalConfig.secondaryButtonColor
  return StyleSheet.create({
          secondaryButtonText : {
            color,
            fontSize : 14,
            fontFamily : GlobalConfig.fontMedium
          }
  })
}

export default styles;