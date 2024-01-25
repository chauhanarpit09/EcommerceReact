import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import styles from './flat.listrow.style'
import { GlobalConfig } from '../constants/globalConfig'
import * as Animatable from 'react-native-animatable';
import { Octicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import commonStyles from '../screens/common.style';
import { useNavigation } from '@react-navigation/native';

const FlatListRowView = ({heading, productArray, showLike, heartSize=24, setProduct, height=250, width=180, imageSize=140, goToScreeen}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onLikeProduct = (item) => {
    const upDatedProduct =
      productArray.map((product) => product.id === item.id ? {...product, likedProduct : !item.likedProduct} : {...product});
    dispatch(setProduct(upDatedProduct))
  }
  return (
   <View style={styles.rowContainer}>
        <View style={commonStyles.headingContainer}>
            <Text style={commonStyles.textForOfferSlider}>{heading}</Text>
            <View style={commonStyles.line}></View>
        </View>
        <FlatList 
            data={productArray}
            style={styles.products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => heading+item.id}
            renderItem={({item}) => (
            <View style={styles.cardContainer}>
                {showLike &&
                    <TouchableOpacity onPress={() => {onLikeProduct(item)}} style={styles.heart}>
                        {item.likedProduct &&
                        <Animatable.View animation="tada" easing="ease-out" iterationCount={1}>
                            <Octicons name="heart-fill" size={heartSize} color={"#F84e4f"} />
                        </Animatable.View>
                        }
                        {!item.likedProduct &&
                        <View>
                            <Octicons name="heart" size={heartSize} color={GlobalConfig.primaryColor} />
                        </View>
                        }
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={()=>{navigation.navigate(goToScreeen, {item})}} style={[styles.card, {width, height}]}>
                    <View style={styles.cardImageContainer}>
                    <Image source={{uri : item.url}} style={{width:imageSize, height:imageSize}}/>
                </View>
                    <View>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.popularPrice, {color : GlobalConfig.secondaryButtonColor, fontSize : 16}]}>{item.discountedPrice}</Text>
                        <Text style={[styles.popularPrice, styles.discountedPrice]}>{item.price}</Text>
                    </View>
                    </View>
                </TouchableOpacity>
            </View>
        )}
        />
    </View>
  )
}

export default FlatListRowView