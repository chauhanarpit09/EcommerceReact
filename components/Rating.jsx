import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { GlobalConfig } from '../constants/globalConfig';

const Rating = ({ rating, numStars = 5, starSize = 16, color = 'gold' }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      let starIcon = 'star';

      if (i < filledStars) {
        starIcon = 'star';
      } else if (halfStar && i === filledStars) {
        starIcon = 'star-half-full';
      } else {
        starIcon = 'star-o';
      }

      stars.push(
        <FontAwesome
          name={starIcon}
          size={starSize}
          color={color}
          key={i}
          style={{ marginRight: 5 }}
        />
      );
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      {renderStars()}
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical : 4
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily : GlobalConfig.fontSemiBold
  },
});

export default Rating;
