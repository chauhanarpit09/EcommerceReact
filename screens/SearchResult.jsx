import { View, SafeAreaView, TouchableOpacity, FlatList, Text, StyleSheet} from "react-native";
import React from "react";
import commonStyles from "./common.style";
import { GlobalConfig } from "../constants/globalConfig";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { EmptyLayout, ProductBox, Toolbar } from "../components";
import { useSelector } from "react-redux";
import { selectSearchResults } from "../selector";
import { screenNames } from "../constants/screenName";

const SearchResult = () => {
  const navigation = useNavigation();
  const searchResults = useSelector(selectSearchResults);
  return (
    <SafeAreaView
      style={[commonStyles.commonMainContainer, { paddingHorizontal: 0 }]}
    >
      {/******************************************* TOOLBAR **************************************************/}
      <View
        style={{
          paddingTop: GlobalConfig.paddingTop,
          backgroundColor: GlobalConfig.secondaryBackgroundColor,
        }}
      >
        <Toolbar
          leftIconName="arrow-back-ios"
          leftIconPress={() => {
            navigation.goBack();
          }}
          toolbarText="Search Result"
          showDivider={false}
          horizontalPadding={4}
        >
          <View style={commonStyles.toolbaractionbuttons}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screenNames.search);
              }}
              style={commonStyles.actionButtons}
            >
              <Octicons
                name="search"
                size={24}
                color={GlobalConfig.primaryButtonColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screenNames.cart);
              }}
              style={commonStyles.actionButtons}
            >
              <Feather
                name="shopping-bag"
                size={24}
                color={GlobalConfig.primaryButtonColor}
              />
            </TouchableOpacity>
          </View>
        </Toolbar>
      </View>
      {/******************************************* Product View **************************************************/}

      {searchResults && searchResults.length > 0 ? (
        <View style={{position : "relative", flex : 1, paddingBottom : 60}}>
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={[commonStyles.gridContainer, {backgroundColor : GlobalConfig.secondaryBackgroundColor, marginTop : 8}]}
                renderItem={({item}) => (
                    <ProductBox
                        item={item}
                        onPressed={() => {navigation.navigate(screenNames.productView, {item})}}
                        likeFunction={()=>{}}
                    />
                )}
            />
            <View style={styles.sortFilterRelativeContainer}>
              <View style={styles.sortFilterContainer}>
                <TouchableOpacity style={styles.sortFilterActionCont}>
                  <MaterialIcons name="sort" size={24} color={GlobalConfig.primaryColor}/>
                  <Text style={styles.sortFilterText}>Sort</Text>
                </TouchableOpacity>
                <View style={{backgroundColor : "#00000020", height:"100%", width : 1.5}}></View>
                <TouchableOpacity style={styles.sortFilterActionCont}>
                  <MaterialIcons name="filter-alt" size={24}  color={GlobalConfig.primaryColor}/>
                  <Text style={styles.sortFilterText}>Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
        ) : (
        <EmptyLayout
          imageUrl={require("../assets/Images/NoSearchResults.png")}
          text="No Search Results"
          secondaryText="Oops! Our inventory is playing hide and seek with your item. Explore more fantastic finds while we uncover its secret spot. Happy shopping!"
          buttonText="Explore more"
          onButtonPress={() => {}}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sortFilterRelativeContainer : {
    position: 'absolute'
  , bottom : 0
  , width : GlobalConfig.screenWidth
  , justifyContent : 'center'
  , alignItems : 'center'
 },
  sortFilterContainer : {
    backgroundColor : GlobalConfig.secondaryBackgroundColor
  , width : "100%"
  , padding : 16
  , borderTopWidth : 2
  , borderTopColor : "#EDEDED"
  , flexDirection : "row"
  },
  sortFilterActionCont : {
    flex : 1,
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center"
  },
  sortFilterText : {
    fontFamily : GlobalConfig.fontMedium,
    fontSize : 16,
    paddingHorizontal : 4,
    color:GlobalConfig.primaryColor
  }
})

export default SearchResult;
