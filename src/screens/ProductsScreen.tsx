/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet, RefreshControl} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const loadProductsFromBackend = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };

  return (
    <View style={{flex: 1, marginHorizontal: 5}}>
      <FlatList
        data={products}
        keyExtractor={(p, index) => p._id + index}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
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
