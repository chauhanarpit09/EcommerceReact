import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState} from 'react'
import {MaterialIcons, Octicons } from '@expo/vector-icons'
import { GlobalConfig } from '../constants/globalConfig'
import commonStyles from './common.style'
import { useDispatch, useSelector } from 'react-redux'
import { selectPopularSearches, selectRecentSearches, selectFeaturedProdcut} from '../selector'
import { Divider, FlatListRowView } from '../components'
import { useNavigation } from '@react-navigation/native'
import { setAllProduct, setFeaturedProduct, setSearchResults } from '../redux'
import { search } from '../constants/apiConfigs'
import { screenNames } from '../constants/screenName'

const Search = () => {

  // USE_STATE
  const [searchText, setSearchText] = useState("");


  //NAVIGATOION
  const navigation = useNavigation();
  const textInputRef = useRef(null);

  //REDUX
  const dispatch = useDispatch();
  const popularSearches = useSelector(selectPopularSearches)
  const recentSearches = useSelector(selectRecentSearches)
  const featuredProdcut = useSelector(selectFeaturedProdcut)
  let groupedRecentSearch = []
  let groupedPopularSearch = []

  if(recentSearches && recentSearches.length > 0){
    groupedRecentSearch = recentSearches.reduce((acc, item) => {
      const existingGroup = acc.find(group => group[0].searchField === item.searchField);

      if (existingGroup) {
        existingGroup.push(item);
      } else {
        acc.push([item]);
      }

      return acc;
    }, []);
  }

  if(popularSearches && popularSearches.length > 0){
    groupedPopularSearch = popularSearches.reduce((acc, item) => {
      const existingGroup = acc.find(group => group[0].searchField === item.searchField);

      if (existingGroup) {
        existingGroup.push(item);
      } else {
        acc.push([item]);
      }

      return acc;
    }, []);
  }

  const displaySearchOptions = [
    { searchName : "Your Past Searches"
    , data : groupedRecentSearch
    , iconName : "access-time"
    },
    { searchName : "Current Trending"
    , data : groupedPopularSearch
    , iconName : "trending-up"
    }
  ]

  useEffect(() => {
    textInputRef.current?.focus?.();
    return () => {
        textInputRef.current = null;
    }
  }, [textInputRef])

  //HELPER_FUNCTION
  const handleOnSubmit = async () => {
    const response = await search(searchText);
    if(response.status) {
      console.log("SearchResults==========>", response.payload.searchResults)
      dispatch(setSearchResults(response.payload.searchResults));
      dispatch(setAllProduct(response.payload.searchResults));
      navigation.navigate(screenNames.searchResult);
    } else {
      console.log("response==>", response);
    }
  }

  return (
    <SafeAreaView style={[commonStyles.commonMainContainer]}>
{/**************************** Search Bar  *******************************/}
    <View style={styles.searchContainer}>
          <TouchableOpacity onPress={()=>{}}>
              <View style={[commonStyles.searchButtonContainer, styles.searchInputField]}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                  <MaterialIcons name="arrow-back-ios" size={20} color={GlobalConfig.tertiaryButtonColor+"A0"} style={{paddingRight : 4}}/>
                </TouchableOpacity>
                <TextInput
                    ref={textInputRef}
                    onChangeText={(text) => {setSearchText(text)}}
                    style={[commonStyles.searchPlaceHolder, {flex: 1}]}
                    placeholder='Search your lovable Products.....'
                />
                <TouchableOpacity onPress={handleOnSubmit}>
                  <Octicons name="search" size={20} color={GlobalConfig.secondaryButtonColor+"A0"} style={{paddingHorizontal : 8}}/>
                </TouchableOpacity>
              </View>
          </TouchableOpacity>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
{/**************************** SearchOptions Searches  *******************************/}
    {displaySearchOptions.map((searchOption) => (
      searchOption.data && searchOption.data.length > 0 &&
        <View style={styles.searchOptionContainer}>
          <View style={styles.searchTextContainer}>
            <MaterialIcons name={searchOption.iconName} size={24} color={GlobalConfig.primaryColor+"A0"}/>
            <Text style={styles.searchTextHeading}>{searchOption.searchName}</Text>
          </View>  
          <FlatList 
              data={searchOption.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item[0].id+item[1]?.id}
              renderItem={({item}) => (
                <View>
                    {item[0] &&
                      <TouchableOpacity onPress={()=>{}} style={styles.searches}>
                        <Text style={styles.searchesText}>{item[0].searchField}</Text>
                      </TouchableOpacity>
                    }
                    {item[1] && 
                      <TouchableOpacity onPress={()=>{}} style={styles.searches}>
                        <Text style={styles.searchesText}>{item[1].searchField}</Text>
                      </TouchableOpacity>
                    } 
                </View>
              )}
            />
        </View>
    ))}

{/**************************** Featured Product  *******************************/}
      {/* <View style={{paddingVertical : 12}}>
         <Divider marginHorizontal={80}/>
      </View> */}
        {/* <FlatListRowView 
          heading="Recently Visited"
          productArray={featuredProdcut}
          height={180}
          width={150}
          imageSize={100}
          showLike={true}
          heartSize={20}
          setProduct={setFeaturedProduct}
        />
        <FlatListRowView 
          heading="Featured Products"
          productArray={featuredProdcut}
          height={180}
          width={150}
          imageSize={100}
          showLike={true}
          heartSize={20}
          setProduct={setFeaturedProduct}
        /> */}
      {/* <View style={{paddingTop : 12, paddingHorizontal : 8}}>
        <FlatListRowView 
          heading="Your Wishlist"
          productArray={featuredProdcut}
        />
      </View> */}
    </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    searchContainer : {
      paddingHorizontal : GlobalConfig.paddingHorizontal
    , backgroundColor : GlobalConfig.secondaryBackgroundColor
    , paddingTop : 60
    , paddingBottom : 16
    },
    searchInputField : {
      borderColor : GlobalConfig.tertiaryButtonColor+"A0"
    , justifyContent : 'space-between'
    },
    searchOptionContainer : {
      paddingHorizontal : GlobalConfig.paddingHorizontal
    , backgroundColor : GlobalConfig.secondaryBackgroundColor
    , marginVertical : 8
    , paddingVertical : 16
    },
    searches : {
      paddingVertical : 12
    , paddingHorizontal : GlobalConfig.paddingHorizontal
    , margin : 4
    , borderWidth : 1
    , borderRadius : 16
    , justifyContent : 'center'
    , alignItems : 'center'
    , width : 100
    , borderColor : GlobalConfig.secondaryColor+"20"
    , backgroundColor : GlobalConfig.secondaryBackgroundColor+"A0"
    },
    searchesText : {
      fontFamily : GlobalConfig.fontRegular
    , color : GlobalConfig.primaryColor
    },
    searchTextHeading : {
      fontSize : 18
    , paddingHorizontal : 8
    , fontFamily : GlobalConfig.fontSemiBold
    , color : GlobalConfig.primaryColor
    , paddingVertical : 8
    },
    searchTextContainer : {
      flexDirection : 'row'
    , alignItems : 'center'
    , paddingVertical : 8
    , paddingHorizontal : 4
    },

});

export default Search