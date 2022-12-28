/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Usuario,
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interface/appInterfaces';
import {authReducer, AuthState} from './authReducer';
import cafeApi from '../api/cafeApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (registerData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({type: 'notAuthenticated'});
    const {data, status} = await cafeApi.get<LoginResponse>('/auth');
    if (status !== 200) {
      return dispatch({type: 'notAuthenticated'});
    }
    dispatch({
      type: 'signUp',
      payload: {
        token: data.token,
        user: data.usuario,
      },
    });
  };
  const signUp = async ({nombre, correo, password}: RegisterData) => {
    try {
      const {data} = await cafeApi.post<LoginResponse>('/usuarios', {
        correo,
        password,
        nombre,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: 'Revise la información',
      });
    }
  };
  const signIn = async ({correo, password}: LoginData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });
      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      dispatch({type: 'addError', payload: 'Información incorrecta'});
    }
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
