/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {useContext} from 'react';
import {ProductsContext} from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {id = '', name = ''} = route.params;
  const {categories} = useCategories();
  const {_id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm(
    {
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    },
  );

  const {loadProductById, updateProduct, addProduct} =
    useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre de producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoryId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoryId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto: </Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Categoría: </Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(cat => (
            <Picker.Item label={cat.nombre} value={cat._id} key={cat._id} />
          ))}
        </Picker>
        <Button title="Guardar" onPress={saveOrUpdate} color="#5856d6" />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Cámara" onPress={() => {}} color="#5856d6" />
            <View style={{width: 10}} />
            <Button title="Galería" onPress={() => {}} color="#5856d6" />
          </View>
        )}

        {img.length > 0 ? (
          <Image
            source={{uri: img}}
            style={{
              width: '100%',
              height: 300,
              marginTop: 20,
            }}
          />
        ) : (
          ''
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 15,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    height: 40,
  },
});
