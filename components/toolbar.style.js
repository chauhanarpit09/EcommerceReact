import { StyleSheet } from "react-native";
import { GlobalConfig } from "../constants/globalConfig";

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    paddingBottom: 16,
  },
  toolbarTextContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  toolbarText: {
    fontSize: 20,
    fontFamily: GlobalConfig.fontSemiBold,
    color: GlobalConfig.primaryColor,
  },
  backButton: {
    maxWidth: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
