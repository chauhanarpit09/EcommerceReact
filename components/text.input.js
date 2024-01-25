import { StyleSheet } from "react-native";
import { GlobalConfig } from "../constants/globalConfig";

const styles = StyleSheet.create({
  inputFeildContainer: {
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: GlobalConfig.primaryColor,
    paddingBottom: 16,
    fontFamily: GlobalConfig.fontRegular,
  },
  fieldContainer: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: GlobalConfig.borderRadius,
    alignItems: "center",
  },
  inputFeild: {
    backgroundColor: "#FAFAFA",
    flex: 1,
    padding: 12,
    fontFamily: GlobalConfig.fontMedium,
    borderRadius: GlobalConfig.borderRadius,
    fontSize: 14,
  },
  invalidInput: {
    paddingVertical: 8,
    color: GlobalConfig.errrorColor,
    fontSize: 12,
    fontFamily: GlobalConfig.fontMedium,
    paddingLeft: 8,
  },
  visibilityIcon: {
    padding: 10,
  },
});

export default styles;
