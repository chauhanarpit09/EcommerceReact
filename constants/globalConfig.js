import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const GlobalConfig = {
  primaryColor: "#040302", //"#0C1A30"
  disabledColor: "#C4C5C4",
  secondaryColor: "#433F41", //"#838589"
  errrorColor: "#DC4C64",
  warningColor: "#E4A11B",
  selectionColor: "#D16F9A", //"#3669C9"
  primaryButtonColor: "#9b3864", ////"#3669C9"
  primaryButtonTextColor: "#FFFFFF",
  secondaryButtonColor: "#711C47", //"#3669C9"
  tertiaryButtonColor: "#D16F9A",
  headingTextSize: 28,
  textSize: 16,
  screenPadding: 20,
  fontRegular: "sans-regular",
  fontMedium: "sans-medium",
  fontBold: "sans-bold",
  fontSemiBold: "sans-semiBold",
  fontLight: "sans-light",
  borderRadius: 16,
  buttonBorderRadius: 24,
  backgroundColor: "#D16F9A10", //"#FFFFFF"
  secondaryBackgroundColor: "#FFFFFF",
  paddingHorizontal: 16,
  paddingTop: SCREEN_HEIGHT * 0.05,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
};

export { GlobalConfig };
