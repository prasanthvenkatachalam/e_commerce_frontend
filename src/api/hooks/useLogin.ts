// src/api/hooks/useLogin.ts
import { useMutation } from 'react-query';
import axios from 'axios';
import { LoginCredentials, LoginResponse } from '@/types/auth.types';
import { AppDispatch } from '@/store/store';
import { setAuth } from '@/store/authSlice';
import {useDispatch} from "react-redux";

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
  return response.data;
};

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation(login, {
     onSuccess: (data) => {
          dispatch(setAuth({
            token: data.accessToken,
           user: {
              id: data.user.id,
              email: data.user.email,
              userType: data.user.userType,
               roleType: data.user.roleType
            }
        }))
        },
        onError: (error) => {
            console.error("There was an error when logging in: ", error)
        }
  });
};