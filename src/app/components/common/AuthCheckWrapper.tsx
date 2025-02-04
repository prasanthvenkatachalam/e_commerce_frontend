// src/app/authCheckWrapper.tsx
'use client' // Mark this as a client component

import { useAuthCheck } from "@/api/hooks/useAuthCheck";
import Loading from "./Loading";


interface Props {
  children: React.ReactNode
}
/**
 * AuthCheckWrapper component, a client side wrapper component.
 *
 * This will call the useAuthCheck hook, and display the children
 * only after the authentication check is complete.
 */
const AuthCheckWrapper = ({children}:Props) => {
     const { loading } = useAuthCheck();

    return loading ? <Loading /> : <>{children}</>;
};

export default AuthCheckWrapper;