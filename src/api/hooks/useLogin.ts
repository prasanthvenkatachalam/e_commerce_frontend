// src/api/hooks/useLogin.ts
import { useMutation } from "react-query";
import axios from "axios";
import { LoginCredentials, LoginResponse } from "@/types/auth.types";
import { AppDispatch } from "@/store/store";
import { setAuth } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/login",
    credentials
  );
  return response.data.data; // Access the nested data property
};

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation(login, {
    onSuccess: (data) => {
      dispatch(
        setAuth({
          token: data.token, // Changed from data.accessToken to data.token
          user: {
            id: data.user.id,
            email: data.user.email,
            userType: data.user.userType,
            roleType: data.user.roleType,
          },
        })
      );
      // Show success toast
      toast({
        description: "Login successful",
      });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        // Check that there is a response and that there is a message
        if (
          error?.response?.data?.message
        ) {
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