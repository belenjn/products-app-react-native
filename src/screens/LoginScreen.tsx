/* eslint-disable react/self-closing-comp */
import React from 'react';
import {Platform, Text, TextInput, View} from 'react-native';
import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {loginStyles} from '../theme/loginTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const LoginScreen = () => {
  return (
    <>
      <Background />
      <View style={loginStyles.formContainer}>
        <WhiteLogo />
        <Text style={loginStyles.title}>Login</Text>
        <Text style={loginStyles.label}>Email:</Text>
        <TextInput
          placeholder="Ingrese su email"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="email-address"
          underlineColorAndroid="white"
          style={[
            loginStyles.inputFiled,
            Platform.OS === 'ios' && loginStyles.inputFieldIOS,
          ]}
          selectionColor="grey"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={loginStyles.label}>Contraseña:</Text>
        <TextInput
          placeholder="*****"
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid="white"
          style={[
            loginStyles.inputFiled,
            Platform.OS === 'ios' && loginStyles.inputFieldIOS,
          ]}
          selectionColor="grey"
        />
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.9} style={loginStyles.button}>
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <Text style={loginStyles.buttonText}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
