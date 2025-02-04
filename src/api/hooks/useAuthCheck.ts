// src/api/hooks/useAuthCheck.ts
"use client";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth, clearAuth } from '@/store/authSlice'; // Import Redux actions
import { AppDispatch } from '@/store/store'; // Import Redux dispatch type
import axios from 'axios'; // For making HTTP requests
import { TokenPayload } from "@/types/auth.types"; // Import type for JWT Payload

/**
 * Custom React Hook to perform initial authentication check.
 *
 * On application load, checks for an existing JWT token in a cookie,
 * verifies it with the backend, and updates the Redux store with user data
 * or clears the auth state if no token is found or if token is invalid.
 */
export const useAuthCheck = () => {
    const [loading, setLoading] = useState(true); // Loading state for UI
    const dispatch = useDispatch<AppDispatch>();  // Access Redux dispatch function

    useEffect(() => {
        // Define an async function to perform authentication check
        const checkAuth = async () => {
            setLoading(true); // Set loading to true, show loader
            try {
               // Attempt to get auth_token from cookies
                const token =  getCookie('auth_token');
                if(token){
                    // If token exists then try and verify
                    const response = await axios.post<TokenPayload>('http://localhost:3000/api/auth/verify-token', {},{
                      headers: {
                         Authorization: `Bearer ${token}` // include the token in the authorization header
                        }
                    });
                    // If token is valid, update the redux state using dispatch
                    dispatch(setAuth({
                        token, user: {
                          id: response.data.userId,
                          email: response.data.email,
                          userType: response.data.userType,
                           roleType: response.data.roleType
                        }
                    }));
                }else {
                   // if there is no token, clear the redux state
                    dispatch(clearAuth());
                }
            } catch (error) {
              // Log if there is an error
                console.error("Error during auth check:", error);
               // Clear the state if something goes wrong
                dispatch(clearAuth());
            } finally {
               // Stop the loader by setting loading to false
                setLoading(false);
            }
        };

        checkAuth(); // Execute the checkAuth function
    }, [dispatch]); // useEffect with dispatch to prevent infinite loops
    // Return loading state to show a loader in the UI
    return { loading };
};

/**
 * Helper function to get a cookie value by name.
 * Returns the value or null if the cookie is not found.
 */
function getCookie(name: string) {
  // If we are on the server side then return null
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}