/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ProductsScreen = () => {
  const {products, loadProducts} = useContext(ProductsContext);
  return (
    <View style={{flex: 1, marginHorizontal: 5}}>
      <FlatList
        data={products}
        keyExtractor={(p, index) => p._id + index}
        renderItem={({item}) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginVertical: 5,
  },
});
