 // src/api/hooks/useLogout.ts

 import { useMutation } from 'react-query';
 import axios from 'axios';
  import { AppDispatch } from '@/store/store';
  import { clearAuth } from '@/store/authSlice';
 import {useDispatch} from 'react-redux';
 
   const logout = async (token: string) => {
         await axios.post('http://localhost:3000/api/auth/logout', {}, {
             headers: {
                 Authorization: `Bearer ${token}`
             }
         });
  };
 
 export const useLogout = () => {
     const dispatch = useDispatch<AppDispatch>()
   return useMutation(logout, {
       onSuccess: () =>{
          dispatch(clearAuth())
      },
       onError:(error)=>{
          console.error("There was an error when logging out: ", error)
         }
   });
 };