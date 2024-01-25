import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { GlobalConfig } from '../constants/globalConfig';


const ImageCarousel = ({ productImages }) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      showsPagination={true}
      loop={true}
      autoplay={false}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      {productImages.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width : GlobalConfig.screenWidth,
    backgroundColor : "red"
  },
  image: {
    width : "100%",
    height : "100%",
    resizeMode : "cover"
  },
  dot: {
    backgroundColor: GlobalConfig.tertiaryButtonColor+"A0",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: GlobalConfig.secondaryButtonColor,
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 3,
  },
});

export default ImageCarousel;
