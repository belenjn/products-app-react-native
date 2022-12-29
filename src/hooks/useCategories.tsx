/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import cafeApi from '../api/cafeApi';
import {CategoriesResponse, Categoria} from '../interface/appInterfaces';

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState<Categoria[]>([]);
  
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const resp = await cafeApi.get<CategoriesResponse>('/categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  };

  return {categories, isLoading};
};
