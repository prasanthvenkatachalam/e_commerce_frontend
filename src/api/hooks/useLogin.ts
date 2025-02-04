import { useMutation } from "react-query";
import axios from "axios";
import { LoginCredentials, LoginResponse } from "@/types/auth.types";
import { AppDispatch } from "@/store/store";
import { setAuth } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import Cookies from 'js-cookie';

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // Cookie expires in 7 days
  secure: process.env.NODE_ENV === 'production', // Secure in production
  sameSite: 'strict' as const
};

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/login",
    credentials
  );
  return response.data.data;
};

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  return useMutation(login, {
    onSuccess: (data) => {
      // Set authentication data in Redux store
      dispatch(
        setAuth({
          token: data.token,
          user: {
            id: data.user.id,
            email: data.user.email,
            userType: data.user.userType,
            roleType: data.user.roleType,
          },
        })
      );

      // Store authentication data in cookies
      Cookies.set('auth_token', data.token, COOKIE_OPTIONS);

      // Show success toast
      toast({
        description: "Login successful",
      });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message) {
          toast({
            variant: "destructive",
            description: error.response.data.message,
          });
        } else {
          toast({
            variant: "destructive",
            description: "Login failed: An unexpected error occurred",
          });
        }
      } else {
        toast({
          variant: "destructive",
          description: "Login failed: An unexpected error occurred",
        });
        console.error("An unexpected error occurred", error);
      }
    },
  });
};