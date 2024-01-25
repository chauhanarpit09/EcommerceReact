import { screenNames } from "./screenName";

const ErrorInfo = {
  LM_12: {
    errorMainText: "User already exists",
    errorSecondaryText:
      "The user already exists. Please try registering with a different email/phone or login to continue",
    errorImage: "../assets/Images/warning.png",
    buttonOneText: "OK",
    buttonTwoText: "Login",
    navigateToOnBtnTwo: screenNames.login,
  },
};

export { ErrorInfo };
