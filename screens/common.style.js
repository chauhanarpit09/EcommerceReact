import { StyleSheet } from "react-native";
import { GlobalConfig } from "../constants/globalConfig";

const commonStyles = StyleSheet.create({
  commonMainContainer: {
    flex: 1,
    backgroundColor: GlobalConfig.backgroundColor,
    fontFamily: GlobalConfig.fontRegular,
  },
  haveToolBar: {
    paddingHorizontal: 8,
  },
  commonMainContainerBottomSheet: {
    paddingTop: 20,
    backgroundColor: GlobalConfig.secondaryBackgroundColor,
    fontFamily: GlobalConfig.fontRegular,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: GlobalConfig.paddingHorizontal + 4,
    paddingVertical: 24,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
  },
  imageBox: {
    backgroundColor: GlobalConfig.secondaryButtonColor + "40",
    borderRadius: GlobalConfig.buttonBorderRadius,
  },
  image: {
    width: 90,
    height: 90,
  },
  primaryText: {
    fontSize: GlobalConfig.headingTextSize,
    paddingBottom: 16,
    fontFamily: GlobalConfig.fontBold,
    textAlign: "center",
  },
  secondaryText: {
    paddingBottom: 20,
    fontSize: 16,
    color: GlobalConfig.secondaryColor,
    fontFamily: GlobalConfig.fontRegular,
    lineHeight: 20,
    textAlign: "center",
  },
  bottomModal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000040",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: GlobalConfig.borderRadius - 6,
    padding: 10,
    borderColor: GlobalConfig.secondaryColor + "40",
  },
  searchPlaceHolder: {
    color: GlobalConfig.secondaryColor,
    paddingHorizontal: 10,
    fontFamily: GlobalConfig.fontRegular,
  },
  toolbaractionbuttons: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
  },
  actionButtons: {
    paddingHorizontal: 8,
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    height: 0.5,
    opacity: 0.3,
    backgroundColor: GlobalConfig.primaryColor + "40",
    flex: 1,
    marginLeft: 16,
  },
  textForOfferSlider: {
    paddingVertical: 8,
    color: GlobalConfig.primaryColor,
    fontSize: 16,
    fontFamily: GlobalConfig.fontSemiBold,
    letterSpacing: 0.8,
  },
  emptyContainer: {
    flex: 1,
    width: GlobalConfig.screenWidth,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: GlobalConfig.secondaryBackgroundColor,
  },
  emptyImageView: {
    width: GlobalConfig.screenWidth * 0.8,
    height: 300,
    resizeMode: "center",
    // paddingVertical: 4,
  },
  textEmpty: {
    fontFamily: GlobalConfig.fontSemiBold,
    fontSize: 24,
    color: GlobalConfig.secondaryColor,
    // paddingTop: 8,
    textAlign: "center",
  },
  sectextEmpty: {
    fontFamily: GlobalConfig.fontRegular,
    paddingVertical: 8,
    fontSize: 18,
    paddingHorizontal: 24,
    textAlign: "center",
  },
  buttonEmpty: {
    paddingVertical: 16,
    paddingHorizontal: GlobalConfig.screenWidth * 0.3,
    // marginVertical: 24,
    backgroundColor: GlobalConfig.tertiaryButtonColor,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEmptyText: {
    color: "#EDEDED",
    fontFamily: GlobalConfig.fontSemiBold,
    fontSize: 18,
  },
  gridContainer: {
    // paddingHorizontal: 4,
    justifyContent: "space-between",
    flexDirection: "column",
  },
});

export default commonStyles;
