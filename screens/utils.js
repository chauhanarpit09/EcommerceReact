// import { AsyncStorage } from '@react-native-async-storage/async-storage';

// const storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(value));
//   } catch(error) {
//     console.error("Error Storing data in local",error);
//   }
// }

// const retrieveData = async (key) => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if(value != null) {
//       return JSON.parse(value);
//     } else {
//       return null;
//     }
//   } catch(error) {
//       console.error('Error retrieving data from local',error);
//       return null;
//   }
// }

const isEmailValid = (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(val);
}

const isPhoneValid = (val) => {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(val);
}

export {
  isEmailValid
, isPhoneValid
// , storeData
// , retrieveData
}