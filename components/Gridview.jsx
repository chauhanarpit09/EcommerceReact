import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const Gridview = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingVertical: 16,
  },
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin :8,
    borderRadius : 8,
    height: 300, // Set the height as needed
    backgroundColor: '#e0e0e0',
    borderColor : "#E8E8E8",
    borderWidth : 1
  },
});

export default Gridview;
