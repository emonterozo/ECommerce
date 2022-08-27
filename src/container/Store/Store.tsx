import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  Pressable,
  Image,
  Text,
  AspectRatio,
  Heading,
  Fab,
  Stack,
  Icon,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

import {AppBar} from '../../components';
import {IProduct} from '../../types/types';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {getCart} from '../../utils/utils';
import GlobalContext from '../../config/context';

interface IItem {
  item: IProduct;
}

const Store = ({navigation}: any) => {
  const {setCart} = useContext(GlobalContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCart().then(res => setCart(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFocused) {
      firestore()
        .collection('products')
        .get()
        .then(querySnapshot => {
          let data: IProduct[] = [];
          querySnapshot.forEach(snapshot => {
            data.push({
              id: snapshot.id,
              ...snapshot.data(),
            });
          });
          setProducts(data);
        });
    }
  }, [isFocused]);

  const renderProduct = ({item}: IItem) => (
    <Pressable
      flex={1}
      maxWidth="49%"
      borderWidth="1"
      borderColor="coolGray.300"
      rounded="8"
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <AspectRatio w="100%">
        <Image
          source={{
            uri: item.images[0],
          }}
          alt={item.name}
        />
      </AspectRatio>
      <Stack p="3" space={3} flex={1}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {item.name}
          </Heading>
        </Stack>
        <Text numberOfLines={3} fontWeight="400">
          {item.description}
        </Text>
        <Box flex={1} justifyContent="flex-end" alignItems="flex-end">
          <Text color="coolGray.600" fontWeight="bold">
            {`PHP ${item.price}`}
          </Text>
        </Box>
      </Stack>
    </Pressable>
  );

  return (
    <Box flex={1}>
      <AppBar isCartVisible title="Store" navigation={navigation} />
      <Box flex={1}>
        <FlatList
          columnWrapperStyle={styles.flatList}
          data={products}
          renderItem={renderProduct}
          numColumns={2}
        />
        {isFocused && (
          <Fab
            placement="bottom-right"
            size="lg"
            icon={<Icon name="plus" as={MaterialCommunityIcons} />}
            onPress={() =>
              navigation.navigate('ProductForm', {title: 'Add Product'})
            }
          />
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  flatList: {
    margin: 5,
    justifyContent: 'space-between',
  },
});

export default Store;
